import { HueService } from './hue-service';
import { StringUtils } from '../utilities/string-utils'
import { MotionSensorConfig } from '../models/motion-sensor-config';

export class SensorService extends HueService {
    static readonly SENSORS_PATH = 'sensors';
    static readonly CONFIG_PATH = 'config';

    static async getSensor<T>(id: string): Promise<T> {
        if(!StringUtils.isEmpty(id)) {
            return await super.get<any>(`${SensorService.SENSORS_PATH}/${id}`);
        } else {
            throw new Error('Can not search for sensor with empty id.');
        }
    }

    static async getAllSensors<T>(): Promise<T> {
        return await super.get<any>(SensorService.SENSORS_PATH);
    }

    static async updateConfig<T>(id: string, config: MotionSensorConfig): Promise<T> {
        return await super.put(`${SensorService.SENSORS_PATH}/${id}/${SensorService.CONFIG_PATH}`, config);
    }

    static async turnOnSensors<T>(...ids: string[]): Promise<T> {
        for(let id of ids) {
            await SensorService.turnOnSensor(id);
        }
        return;
    }

    static async turnOnSensor<T>(id: string): Promise<T> {
        let motionSensorConfig = new MotionSensorConfig();
        motionSensorConfig.on = true;

        return await SensorService.updateConfig(id, motionSensorConfig);
    }

    static async turnOffSensors<T>(...ids: string[]): Promise<T> {
        for(let id of ids) {
            await SensorService.turnOffSensor(id);
        }
        return;
    }

    static async turnOffSensor<T>(id: string): Promise<T> {
        let motionSensorConfig = new MotionSensorConfig();
        motionSensorConfig.on = false;

        return await SensorService.updateConfig(id, motionSensorConfig);
    }
}

export enum Sensors {
    SENSOR_1_ID = '00:17:88:01:03:2a:d9:ee-02-0406',
    SENSOR_2_ID = '00:17:88:01:04:b6:4f:41-02-0406',
    SENSOR_3_ID = '00:17:88:01:04:b6:84:14-02-0406',
    SENSOR_4_ID = '00:17:88:01:04:b6:63:69-02-0406'
}