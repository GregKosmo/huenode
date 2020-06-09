export class ObjectUtils {
    static isEmpty(object: any): boolean {
        return object === undefined || object === null;
    }

    static isAnyEmpty(...objects: any[]): boolean {
        for(let object of objects) {
            if(ObjectUtils.isEmpty(object)) {
                return true;
            }
        }
        return false;
    }
}