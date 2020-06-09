import { MotionSensor } from './framework/models/motion-sensor';
import { SensorService, Sensors } from './framework/services/sensor-service';
import { GroupService, Groups } from './framework/services/group-service';
import { ObjectUtils } from './framework/utilities/object-utils';
import { MapUtils } from './framework/utilities/map-utils';
import { Group } from './framework/models/group';
import { SunTimes } from './framework/models/sun-times';
import { AlarmService } from './framework/services/alarm-service';
import * as SunCalc from 'suncalc';

process.on('uncaughtException', error => {
    console.error(error);
})

process.on('unhandledRejection', error => {
    console.error(error);
})

let sensorMap = new Map<string, MotionSensor>();
let sensorKeyMap = new Map<string, string>();
let motionDetectedMap = new Map<string, Date>();

let groupKeyMap = new Map<string, string>();

const REFRESH_TIME_MILLIS = 2000;

try {
    setInterval(async () => {
        if(MapUtils.isEmpty(sensorKeyMap)) {
            await setSensorKeys();
        }

        if(MapUtils.isEmpty(groupKeyMap)) {
            await setGroupKeys();
        }

        sensorKeyMap.forEach(async (key, uniqueId) => {
            if([Sensors.SENSOR_1_ID, Sensors.SENSOR_2_ID, Sensors.SENSOR_3_ID, Sensors.SENSOR_4_ID].includes(<Sensors>uniqueId)) {
                sensorMap.set(uniqueId, await SensorService.getSensor<MotionSensor>(key));
            }
        })

        sensorMap.forEach((sensor, uniqueId) => {
            if(sensor.state.presence && sensor.state.lastupdated !== motionDetectedMap.get(uniqueId)) {
                motionDetectedMap.set(uniqueId, sensor.state.lastupdated);
            }
        })

        if(!ObjectUtils.isAnyEmpty(motionDetectedMap.get(Sensors.SENSOR_1_ID), motionDetectedMap.get(Sensors.SENSOR_4_ID))) {
            try {
                if(motionDetectedMap.get(Sensors.SENSOR_1_ID) < motionDetectedMap.get(Sensors.SENSOR_4_ID)) {
                    await GroupService.turnOnGroups(
                        groupKeyMap.get(Groups.KITCHEN),
                        groupKeyMap.get(Groups.KITCHEN_HALLWAY),
                        groupKeyMap.get(Groups.BATHROOM_HALLWAY)
                    );

                    let today = new Date()
                    let sunTimes: SunTimes = SunCalc.getTimes(today, 40.853129, -96.722815);

                    if(today > sunTimes.sunset || today < sunTimes.sunrise) {
                        await GroupService.turnOnGroups(
                            groupKeyMap.get(Groups.LIVING_ROOM)
                        );
                    }
                    await AlarmService.turnOnAlarms();

                } else if(motionDetectedMap.get(Sensors.SENSOR_1_ID) > motionDetectedMap.get(Sensors.SENSOR_4_ID)) {
                    await GroupService.turnOffGroup(groupKeyMap.get(Groups.APARTMENT));
                    await AlarmService.turnOffAlarms();
                }

            } catch(error) {
                console.error(error);

            } finally {
                motionDetectedMap.delete(Sensors.SENSOR_1_ID);
                motionDetectedMap.delete(Sensors.SENSOR_4_ID);
            }
        }

        if(!ObjectUtils.isAnyEmpty(motionDetectedMap.get(Sensors.SENSOR_2_ID), motionDetectedMap.get(Sensors.SENSOR_3_ID))) {
            try {
                if(motionDetectedMap.get(Sensors.SENSOR_2_ID) < motionDetectedMap.get(Sensors.SENSOR_3_ID)) {
                    await GroupService.turnOnGroup(groupKeyMap.get(Groups.BATHROOM));

                } else if(motionDetectedMap.get(Sensors.SENSOR_2_ID) > motionDetectedMap.get(Sensors.SENSOR_3_ID)) {
                    await GroupService.turnOffGroup(groupKeyMap.get(Groups.BATHROOM));
                }
                
            } catch(error) {
                console.error(error);

            } finally {
                motionDetectedMap.delete(Sensors.SENSOR_2_ID);
                motionDetectedMap.delete(Sensors.SENSOR_3_ID);
            }
        }
    }, REFRESH_TIME_MILLIS);
} catch(error) {
    console.error(error);
}

async function setSensorKeys() {
    let sensors = await SensorService.getAllSensors();

    for(let key in sensors) {
        let sensor: MotionSensor = sensors[key];
        sensorKeyMap.set(sensor.uniqueid, key);
    }
}

async function setGroupKeys() {
    let groups = await GroupService.getAllGroups();

    for(let key in groups) {
        let group: Group = groups[key];
        groupKeyMap.set(group.name, key);
    }
}