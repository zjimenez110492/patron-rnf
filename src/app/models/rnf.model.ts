import {  Element } from './element.model';
export interface Rnf {
id:string,
subCaracteristica:string,
justificacion:string,
elemento:Element[],
importancia:boolean,
urgencia:boolean,
intervaloTiempo:string,
valorPrioridad:number,
descripcion:string,
tipo: string,
dificultad:string,
riesgos: string,
obligatoriedad: string,
rol:string
}
