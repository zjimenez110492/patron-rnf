import { ResultsService } from './../../services/results.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-proyect',
  templateUrl: './add-proyect.component.html',
  styleUrls: ['./add-proyect.component.scss']
})
export class AddProyectComponent implements OnInit {
  formulario1: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;
  porcentaje=0;
  elegido=false;
  finalizado=false;
  public datosFormulario = new FormData();
  isLinear = true;
  mensajeArchivo=''
  nombreArchivo=''
  constructor(private formBuilder: FormBuilder, private router: Router, private ResultService:ResultsService) { }

  ngOnInit() {
    this.finalizado=false;
    this.porcentaje=0;
    this.mensajeArchivo=''
    this.nombreArchivo=''
    this.elegido=false;
    this.crearFormularios();
  }
  volver() {

    this.router.navigateByUrl('')
  }
  private crearFormularios(): void {
    this.formulario1 = this.formBuilder.group(
      {
        nombre: ['', Validators.required]
      });
    this.formulario2 = this.formBuilder.group(
      {
        responsable: ['', Validators.required],
        organizacion: ['', Validators.required]
      });


    this.formulario1.get('nombre').valueChanges.subscribe(nombre => {
      console.log("First:  ", nombre)
    })
    this.formulario2.get('responsable').valueChanges.subscribe(responsable => {
      console.log("Second:  ", responsable)
    })
    this.formulario2.get('organizacion').valueChanges.subscribe(organizacion => {
      console.log("Third:  ", organizacion)
    })

  }
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
      this.elegido=true;
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }


  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.ResultService.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.ResultService.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
     console.log("Porcentage:   ",porcentaje);

     this.porcentaje = Math.round(porcentaje);
     if (this.porcentaje == 100) {
        this.finalizado = true;
     }

    });

    referencia.getDownloadURL().subscribe((URL) => {
      /* this.URLPublica = URL; */
      console.log("URL Download:   ",URL);
    });
  }
}
