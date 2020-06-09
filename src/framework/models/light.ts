import { LightState } from './light-state';
import { SoftwareUpdate } from './software-update';
import { LightCapabilities } from './light-capabilities';
import { LightConfig } from './light-config';

export class Light {
    type: string;
    name: string;
    modelid: string;
    manufacturername: string;
    productname: string;
    uniqueid: string;
    swversion: string;
    swconfigid: string;
    productid: string;
    capabilities: LightCapabilities;
    state: LightState;
    swupdate: SoftwareUpdate;
    config: LightConfig;
}