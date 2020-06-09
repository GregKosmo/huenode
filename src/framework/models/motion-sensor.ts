import { MotionSensorState } from './motion-sensor-state';
import { SoftwareUpdate } from './software-update';
import { MotionSensorConfig } from './motion-sensor-config';
import { MotionSensorCapabilities } from './motion-sensor-capabilities';

export class MotionSensor {
    name: string;
    type: string;
    modelid; string;
    manufacturername: string;
    productname: string;
    swversion: string;
    uniqueid: string;
    capabilities: MotionSensorCapabilities;
    swupdate: SoftwareUpdate;
    state: MotionSensorState;
    config: MotionSensorConfig;
}