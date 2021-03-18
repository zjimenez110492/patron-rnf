import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(public dialogoReg: MatDialogRef<ResultDetailsComponent>) { }

  ngOnInit(): void {
     console.log("Resultado en details:  ", this.result.proceso[0].nombreProceso);
     this.dataTable();
  }


  createTable(tableData) {
    console.log("CREANDO TABLA");
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(
      function (rowData) {
        var row = document.createElement('tr');
        rowData.forEach(
          function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
          });

        tableBody.appendChild(row);
      });

    table.appendChild(tableBody);
    document.body.appendChild(table);
  }


  dataTable() {
    let data = [[]];
    let row = ["ID Proceso", "Nombre Proceso", "Actividad", "ID Caracteristica", "Caracteristica", "Dependencia", "Sub Caracteristica", "ID RNF", "Atributo", "Valor Atributo", "Justificacion", "Importancia", "Urgencia", "Intervalo Tiempo", "Valor Prioridad", "Descripcion", "Tipo", "Dificultad", "Riesgos", "Obligatoriedad", "Rol", "Elemento", "Dato Almacenar", "Formato Almacenamiento"]
    data.push(row);
    for (let p of this.result.proceso) {
      for (let a of p.actividad) {
        for (let c of a.caracteristica) {
          for (let sc of c.subCaracteristica) {
            for (let rnf of sc.rnf) {
              for (let e of rnf.elemento) {
                for (let d of e.datos) {
                  console.log(`Proceso ${p.nombreProceso}- Actividad ${a.nombreActividad} - Caracteristica: ${c.nombreCaracteristica}
                  - SubCaracteristica: ${sc.nombreSubCaracteristica} - RNF ${rnf.id} - Elemento ${e.nombreElemento} - Dato ${d.nombreDato} Forma Almacenamiento: ${d.formaAlmacenamiento} `)
                  row = [p.id, p.nombreProceso, a.nombreActividad, c.id, c.nombreCaracteristica, c.dependencia?'X':'', sc.nombreSubCaracteristica,
                  rnf.id, rnf.atributoCalidad, rnf.valorAtribCalidad, rnf.justificacion, rnf.importancia?'X':'', rnf.urgencia?'X':'', rnf.intervaloTiempo, rnf.valorPrioridad+'', rnf.descripcion,
                  rnf.tipo, rnf.dificultad, rnf.riesgos, rnf.obligatoriedad, rnf.rol, e.nombreElemento, d.nombreDato, d.formaAlmacenamiento]
                data.push(row)
                }
              }
            }
          }
        }
      }
    }
console.log("DATA OBTENIDA:  ",data)
this.createTable(data)
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
