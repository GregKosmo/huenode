import { GoogleHomeService } from './google-home-service';
import { AlarmState } from '../models/alarm-state';

export class AlarmService extends GoogleHomeService {
    static readonly ALARMS_PATH = 'assistant/alarms';
    static readonly VOLUME_PATH = 'volume';

    static async turnOffAlarms(): Promise<AlarmState> {
        let alarmState: AlarmState = {
            volume: 0
        }

        return await super.post(`${this.ALARMS_PATH}/${this.VOLUME_PATH}`, alarmState);
    }

    static async turnOnAlarms(): Promise<AlarmState> {
        let alarmState: AlarmState = {
            volume: .71
        }

        return await super.post(`${this.ALARMS_PATH}/${this.VOLUME_PATH}`, alarmState);
    }
}