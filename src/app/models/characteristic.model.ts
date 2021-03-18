import { Rnf } from './rnf.model';
import { SubCharacteristic } from './subcharacteristic.model';
export interface Characteristic {
id: string,
nombreCaracteristica:string,
dependencia: boolean,
subCaracteristica: SubCharacteristic[]
}
