import { Route, Router, Routes } from '@angular/router';
import { ViewModelComponent } from './../view-model/view-model.component';
import { ResultDetailsComponent } from './../result-details/result-details.component';
import { Result } from '../../../../models/result.model';
import { Activity } from '../../../../models/activity.model';
import { Rnf } from '../../../../models/rnf.model';
import { Element } from '../../../../models/element.model';
import { Data } from '../../../../models/data.model';
import { ResultsService } from '../../services/results.service';
import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process.model';
import { Characteristic } from 'src/app/models/characteristic.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SubCharacteristic } from 'src/app/models/subcharacteristic.model';
import { Responsable } from 'src/app/models/responsable.model';


@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss'],
})
export class ListResultsComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'modelo', 'numProcesos', 'opciones'];
  dataSource: MatTableDataSource<Result>;
  resultados: Result[];
  constructor(private resultService: ResultsService, public dialog: MatDialog, private router: Router) {
    this.resultados = [];
  }

  ngOnInit(): void {

    this.resultados = [];
    this.resultService.getResults().subscribe((result) => {
      result.forEach((res: Result) => {
        console.log("Result:  ", res);
        this.resultados.push(res);
        console.log("Array hasta el momento: ", this.resultados);
      });
      this.dataSource = new MatTableDataSource(this.resultados);
    });
    /*
         this.resultService.addResult(this.crearResult()); */
  }
  verModelo(row: Result) {
    const dialogRef = this.dialog.open(ViewModelComponent, {
      width: '1600px',
      height: '600px',
      data: {}
    });

    /*  dialogRef.componentInstance.imagen=row.nombre; */
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  verResult(row: Result) {
    console.log("NAVEGANDO A VIEW");
    this.resultService.result = row;
    this.router.navigateByUrl(`/view-Result`);
  }
  addProyect() {
    console.log("NAVEGANDO A ADD");
    this.router.navigateByUrl(`/add-proyect`);
  }
  crearResult(): Result {
    let d: Data[] = [{
      nombreDato: 'Imagen Huella',
      formaAlmacenamiento: 'Archivo JPEG',
    }];

    let el: Element[] = [{
      datos: d,
      nombreElemento: 'Huella dactilar',
    }];
    let rnf: Rnf[] = [{

      id: 'S1-AUTH1',
      atributoCalidad: 'Atributo de Auth',
      valorAtribCalidad: 'valor atbC',
      justificacion: 'Este requisito es escencial porque ...',
      importancia: true,
      urgencia: false,
      intervaloTiempo: 'Pasado-Presente',
      valorPrioridad: 1,
      descripcion: 'Hazlo Inmediatamente',
      tipo: 'Básico',
      dificultad: 'Dificil',
      riesgos: '- Accesos no permitidos',
      obligatoriedad: 'Obligatorio',
      rol: 'Regla o hecho',
      elemento: el,

    }];

    let subCaracteristica: SubCharacteristic[] = [{
      nombreSubCaracteristica: 'Autenticidad',
      rnf: rnf
    }]
    let c: Characteristic[] = [{
      nombreCaracteristica: 'Seguridad',
      id: 'S2',
      dependencia: true,
      subCaracteristica: subCaracteristica
    }];

    let a: Activity[] = [{
      nombreActividad: 'Cargar Huella',
      caracteristica: c,
    }];
    let proceso: Process[] = [{
      id: 'P1',
      nombreProceso: 'Leer huella 1',
      actividad: a,
    }];
    let responsable: Responsable = {
      nombreResponsable: "Jhonatan Zuniga",
      cargo: "Analista",
      organizacion: "Unicauca"
    }
    let resultado: Result = {
      proceso: proceso,
      nombreResult: "Sabana 2",
      imagen: "gs://patron-especificacion-rnf.appspot.com/imagen_2021-03-13_143558.png",
      responsable

    };
    return resultado;
  }
}
