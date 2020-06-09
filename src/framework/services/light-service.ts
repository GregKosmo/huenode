import { HueService } from './hue-service';
import { LightState } from '../models/light-state';

export class LightService extends HueService {
    static readonly LIGHTS_PATH = 'lights';
    static readonly STATE_PATH = 'state';

    static async getAllLights<T>(): Promise<T> {
        return await super.get<any>(LightService.LIGHTS_PATH);
    }

    static async updateState<T>(id: string, state: LightState): Promise<T> {
        return await super.put(`${LightService.LIGHTS_PATH}/${id}/${LightService.STATE_PATH}`, state);
    }

    static async turnOnLights<T>(...ids: string[]): Promise<T> {
        for(let id of ids) {
            await LightService.turnOnLight(id);
        }
        return;
    }

    static async turnOffLights<T>(...ids: string[]): Promise<T> {
        for(let id of ids) {
            await LightService.turnOffLight(id);
        }
        return;
    }

    static async turnOnLight<T>(id: string): Promise<T> {
        let lightState = new LightState();
        lightState.on = true;

        return await LightService.updateState<T>(id, lightState);
    }

    static async turnOffLight<T>(id: string): Promise<T> {
        let lightState = new LightState();
        lightState.on = false;
        
        return await LightService.updateState<T>(id, lightState);
    }
}

export enum Lights {
    BATHROOM_HALLWAY_ID = '00:17:88:01:04:9f:45:0a-0b',
    KITCHEN_HALLWAY_ID = '00:17:88:01:04:59:03:3d-0b',
    BATHROOM_LEFT_ID = '00:17:88:01:04:65:0d:c2-0b',
    BATHROOM_MIDDLE_ID = '00:17:88:01:04:9f:3e:77-0b',
    BATHROOM_RIGHT_ID = '00:17:88:01:04:5a:12:80-0b',
    KITCHEN_RIGHT_ID = '00:17:88:01:04:1d:bb:cb-0b',
    KITCHEN_LEFT_ID = '00:17:88:01:04:9f:0d:b3-0b',
    KITCHEN_MIDDLE_LEFT_ID = '00:17:88:01:04:20:ec:3b-0b',
    KITCHEN_MIDDLE_RIGHT_ID = '00:17:88:01:04:9f:0d:aa-0b'
}