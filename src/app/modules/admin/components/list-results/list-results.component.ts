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


@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss'],
})
export class ListResultsComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'numProcesos','opciones'];
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
    let d: Data = {
      dato: 'Huella Dactilar',
      formaAlmacenamiento: 'Archivo txt',
      valor: 'x:12,13,005,65',
    };
    let dato: Data[] = [];
    dato.push(d);
    let el: Element = {
      atributoCalidad: 'Atributo',
      datos: dato,
      elemento: 'Huella dactilar',
    };
    let elemento: Element[] = [];
    elemento.push(el);
    let rnf: Rnf[] = [{
      subCaracteristica: 'Autenticidad',
      id: 'S2-1',
      justificacion: 'Requisito justificado',
      descripcion: 'Hazlo Inmediatamente',
      dificultad: 'Dificil',
      elemento: elemento,
      importancia: true,
      urgencia: false,
      intervaloTiempo: 'Pasado-Presente',
      obligatoriedad: 'Deseable',
      riesgos: '- Accesos no permitidos',
      rol: 'Regla o hecho',
      tipo: 'Básico',
      valorPrioridad: 2,

    },
    {
      descripcion: 'Hazlo Inmediatamente',
      dificultad: 'Dificil',
      elemento: elemento,
      id: 'S2-1',
      importancia: true,
      urgencia: false,
      intervaloTiempo: 'Pasado-Presente',
      justificacion: 'Requisito justificado',
      obligatoriedad: 'Deseable',
      riesgos: '- Accesos no permitidos',
      rol: 'Regla o hecho',
      tipo: 'Básico',
      valorPrioridad: 2,
      subCaracteristica: 'Autenticidad',
    }];
    let c: Characteristic = {
      Caracteristica: 'Seguridad',
      id: 'S2',
      dependencia: true,
      rnf: rnf,
    };
    let caracteristica: Characteristic[] = [];
    caracteristica.push(c);
    let a: Activity = {
      actividad: 'Cargar Huella',
      caracteristica: caracteristica,
    };
    let actividad: Activity[] = [];
    actividad.push(a);
    let p: Process = {
      id: 'P2',
      nombre: 'Leer huella 1',
      actividad: actividad,
    };
    let proceso: Process[] = [];
    proceso.push(p);
    let resultados: Result = {
      proceso: proceso,
      nombre:"Sabana 2"
    };
    return resultados;
  }
}
