import { GroupState } from './group-state';
import { GroupAction } from './group-action';

export class Group {
    name: string;
    lights: string[];
    sensors: string[];
    type: string;
    recycle: boolean;
    class: string;
    state: GroupState;
    action: GroupAction;
}