import { ObjectUtils } from './object-utils';

export class MapUtils {
    static isEmpty(map: Map<any, any>): boolean {
        return ObjectUtils.isEmpty(map) || map.size === 0;
    }
}