import { descripcionRnf } from './../../../../models/descripcionRnf.model';
import { ViewRnfComponent } from './../view-rnf/view-rnf.component';
import { ResultsService } from './../../services/results.service';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/result.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent implements OnInit {
  result: Result;
  colProceso: number;
  colActividad: number;
  colCaracteristica: number;
  nombresRNF: string[]=[];
  descripcionesRNF:descripcionRnf[];
  constructor(private resultService: ResultsService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.descripcionesRNF=[];
    this.result = this.resultService.result;
    if (this.result) {
      this.dataTable();
    }
    else {
      this.router.navigateByUrl('')
    }

  }

  createTable(header, tableData) {
    console.log("HEADER:  ", header);
    var div = document.getElementById('table-container');
    console.log("div:  ", div);
    var table = document.createElement('table');
    var tableHead = document.createElement('thead');
    tableHead.style.backgroundColor = "red"
    var tableBody = document.createElement('tbody');


    header.forEach(
      function (rowData) {
        console.log("HEADER ROWDATA:  ", rowData);
        var row = document.createElement('tr');

        rowData.forEach(
          function (cellData) {
            var cell = document.createElement('th');

            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
            row.style.backgroundColor = "rgb(153,255,255)"
          });
        tableHead.appendChild(row);
      });

    tableData.forEach(
      function (rowData) {
        console.log("TABLA ROWDATA:  ", rowData);
        var row = document.createElement('tr');
        rowData.forEach(
          function (cellData) {
            var cell = document.createElement('td');
            cell.style.border = "rgb(0, 0, 0) 1px solid";
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
          });

        tableBody.appendChild(row);
      });
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tableHead.style.paddingTop = "10cm"
    tableBody.style.padding = "2cm"
    table.style.padding = "2cm"
    div.appendChild(table);
  }

  volver() {
    this.result = null;
    this.resultService.result = null;
    this.ngOnInit()
    this.router.navigateByUrl('')
  }
  generarNombres(){

    const dialogRef = this.dialog.open(ViewRnfComponent, {
      width: '800px',
      height:'600px',
      data:{}
    });

    dialogRef.componentInstance.descripcionesRNF=this.descripcionesRNF;
    dialogRef.afterClosed().subscribe(result => {
     /*  this.ngOnInit(); */
    });

  }
  dataTable() {
    let data = [[]];
    let header = ["ID Proceso", "Nombre Proceso", "Actividad", "ID Caracteristica", "Caracteristica", "Dependencia", "Sub Caracteristica", "ID RNF", "Atributo", "Valor Atributo", "Justificacion", "Importancia", "Urgencia", "Intervalo Tiempo", "Valor Prioridad", "Descripcion", "Tipo", "Dificultad", "Riesgos", "Obligatoriedad", "Rol", "Elemento", "Dato Almacenar", "Formato Almacenamiento"]

    for (let p of this.result.proceso) {
      for (let a of p.actividad) {
        for (let c of a.caracteristica) {
          for (let sc of c.subCaracteristica) {
            for (let rnf of sc.rnf) {
              for (let e of rnf.elemento) {
                for (let d of e.datos) {
                  let row = [p.id, p.nombreProceso, a.nombreActividad, c.id, c.nombreCaracteristica, c.dependencia ? 'X' : '', sc.nombreSubCaracteristica,
                  rnf.id,/* `<a style="cursor: pointer;"> ${  */rnf.atributoCalidad/* }</a>` */, rnf.valorAtribCalidad, rnf.justificacion, rnf.importancia ? 'X' : '', rnf.urgencia ? 'X' : '', rnf.intervaloTiempo, rnf.valorPrioridad + '', rnf.descripcion,
                  rnf.tipo, rnf.dificultad, rnf.riesgos, rnf.obligatoriedad, rnf.rol, e.nombreElemento, d.nombreDato, d.formaAlmacenamiento]
                  data.push(row);
                  let desc:descripcionRnf = {
                    descripcion:  `El sistema en el proceso ${p.nombreProceso} con la actividad ${a.nombreActividad}, con respecto a ${c.nombreCaracteristica} en ${sc.nombreSubCaracteristica}
                    , deberá: a través de el/la ${e.nombreElemento}  deberá almacenar el/la ${d.nombreDato} en formato ${d.formaAlmacenamiento}`,
                    idRnf:rnf.id
                  };
                 this.descripcionesRNF.push(desc);

                }
              }
            }
          }
        }
      }
    }
    console.log("Nombres Formados:  ", this.descripcionesRNF)
    this.createTable([header], data)
  }
  generarNombre() {
    Swal.fire({
      title: 'El sistema en el proceso leer huella con la actividad Cargar huella, con respecto a la seguridad en la atenticidad deberá: a traves de la huella dactilar, deberá almacenar la imagen y los archivos distancia en formatos .JPEG y .TXT respectivamente',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

}
