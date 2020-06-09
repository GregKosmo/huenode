import { HueService } from './hue-service';
import { GroupAction } from '../models/group-action';

export class GroupService extends HueService {
    static readonly GROUPS_PATH = 'groups';
    static readonly ACTION_PATH = 'action';

    static async getAllGroups<T>(): Promise<T> {
        return await super.get<any>(GroupService.GROUPS_PATH);
    }

    static async sendAction<T>(id: string, action: GroupAction): Promise<T> {
        return await super.put(`${GroupService.GROUPS_PATH}/${id}/${GroupService.ACTION_PATH}`, action);
    }

    static async turnOnGroups<T>(...ids: string[]): Promise<T> {
        for(let id of ids) {
            await GroupService.turnOnGroup(id);
        }
        return;
    }

    static async turnOffGroups<T>(...ids: string[]): Promise<T> {
        for(let id of ids) {
            await GroupService.turnOffGroup(id);
        }
        return;
    }

    static async turnOnGroup<T>(id: string): Promise<T> {
        let lightState = new GroupAction();
        lightState.on = true;

        return await GroupService.sendAction<T>(id, lightState);
    }

    static async turnOffGroup<T>(id: string): Promise<T> {
        let lightState = new GroupAction();
        lightState.on = false;
        
        return await GroupService.sendAction<T>(id, lightState);
    }
}

export enum Groups {
    APARTMENT = 'Apartment',
    BATHROOM = 'Bathroom',
    KITCHEN = 'Kitchen',
    BATHROOM_HALLWAY = 'Bathroom Hallway',
    KITCHEN_HALLWAY = 'Kitchen Hallway',
    LIVING_ROOM = 'Living room'
}