import { Result } from './../../../../models/result.model';
import { Activity } from './../../../../models/activity.model';
import { Rnf } from './../../../../models/rnf.model';
import { Element } from './../../../../models/element.model';
import { Data } from './../../../../models/data.model';
import { ResultsService } from './../../services/results.service';
import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process.model';
import { Characteristic } from 'src/app/models/characteristic.model';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss'],
})
export class ListResultsComponent implements OnInit {
  /*  displayedColumns: string[] = ['Proceso', 'Actividad', 'Caracteristica', 'SubCaracteristica']; */
  /*   dataSource: MatTableDataSource<Result>; */
  resultados: Result[];
  constructor(private resultService: ResultsService) {
    this.resultados = [];
  }

  ngOnInit(): void {
    this.resultados = [];
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
    let r: Rnf = {
      descripcion: '',
      dificultad: '',
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
      subCaracteristica: 'sub caracteristica',
    };
    let rnf: Rnf[] = [];
    rnf.push(r);
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
      nombre: 'Leer huella 2',
      actividad: actividad,
    };
    let proceso: Process[] = [];
    proceso.push(p);
    let resultados: Result = {
      proceso: proceso,
    };

    this.resultService.getResults().subscribe((result) => {
      let procesos: Process[] = [];
      console.log('RESULTADO COMPLETO:  ', result);
      result.forEach((r: Result) => {

        r.proceso.forEach((pr: Process) => {
          console.log('Proces:  ', pr);
          procesos.push(pr);
        });
        console.log("Array Procesos:  ",procesos);
        let resultado:Result={
          proceso:procesos
        };
        this.resultados.push(resultado);
        console.log('**************Insertados:  ', resultados);
      });
    });
    /*   CREAR RESULTADO
    this.resultService.addResult(resultados); */
  }
}
