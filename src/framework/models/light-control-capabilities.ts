import { MinMax } from './min-max';

export class LightControlCapabilities {
    mindimlevel: number;
    maxlumen: number;
    colorgamuttype: string;
    colorgamut: number[][];
    ct: MinMax;
}