
import { Process } from "./process.model";
import { Responsable } from "./responsable.model";

export interface Result {
  proceso: Process[],
  nombreResult: string,
  imagen: string,
  responsable: Responsable
}
