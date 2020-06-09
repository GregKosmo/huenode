import { ObjectUtils } from './object-utils';

export class StringUtils {
    static isEmpty(string: string): boolean {
        return ObjectUtils.isEmpty(string) || string.length === 0;
    }
}