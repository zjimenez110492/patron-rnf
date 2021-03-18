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


@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss'],
})
export class ListResultsComponent implements OnInit {
  displayedColumns: string[] = ['nombre','modelo','numProcesos','opciones'];
  dataSource: MatTableDataSource<Result>;
  resultados: Result[];
  constructor(private resultService: ResultsService, public dialog: MatDialog) {
    this.resultados = [];
  }

  ngOnInit(): void {
    this.resultados = [];
    this.resultService.getResults().subscribe((result) => {
      result.forEach((res:Result)=>{
        console.log("Result:  ",res);
        this.resultados.push(res);
        console.log("Array hasta el momento: ",this.resultados);
      });
      this.dataSource = new MatTableDataSource(this.resultados);
      });
/*
     this.resultService.addResult(this.crearResult()); */
  }
  verModelo(row:Result){
    const dialogRef = this.dialog.open(ViewModelComponent, {
      width: '1600px',
      height:'600px',
      data:{}
    });

   /*  dialogRef.componentInstance.imagen=row.nombre; */
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  verResult(row:Result){
    const dialogRef = this.dialog.open(ResultDetailsComponent, {
      width: '1600px',
      height:'600px',
      data:{}
    });

    dialogRef.componentInstance.result=row;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  crearResult():Result{
    let d: Data[] = [{
      nombreDato: 'Huella Dactilar',
      formaAlmacenamiento: 'Archivo txt',
    }];

    let el: Element[] = [{
      datos: d,
      nombreElemento: 'Huella dactilar',
    }];
    let rnf: Rnf[] = [{

      id: 'S2-1',
      atributoCalidad:'Atributo',
      valorAtribCalidad:'valor atbC',
      justificacion: 'Requisito justificado',
      importancia: true,
      urgencia: false,
      intervaloTiempo: 'Pasado-Presente',
      valorPrioridad: 2,
      descripcion: 'Hazlo Inmediatamente',
      tipo: 'Básico',
      dificultad: 'Dificil',
      riesgos: '- Accesos no permitidos',
      obligatoriedad: 'Deseable',
      rol: 'Regla o hecho',
      elemento: el,

    }];

    let subCaracteristica: SubCharacteristic[]=[{
      nombreSubCaracteristica:'Autenticidad',
      rnf:rnf
    }]
    let c: Characteristic []= [{
      nombreCaracteristica: 'Seguridad',
      id: 'S2',
      dependencia: true,
      subCaracteristica:subCaracteristica
    }];

    let a: Activity []= [{
      nombreActividad: 'Cargar Huella',
      caracteristica: c,
    }];
    let proceso: Process []= [{
      id: 'P2',
      nombreProceso: 'Leer huella 1',
      actividad: a,
    }];

    let resultado: Result = {
      proceso: proceso,
      nombreResult:"Sabana 2",
      imagen:"gs://patron-especificacion-rnf.appspot.com/imagen_2021-03-13_143558.png"
    };
    return resultado;
  }
}
