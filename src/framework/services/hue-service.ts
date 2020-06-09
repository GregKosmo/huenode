import { HttpRequest } from '../http-request';

export class HueService {
    static readonly HUE_IP = '192.168.1.30';
    static readonly HUE_PORT = 80;
    static readonly USER_ID = 'dZUiqeBzbQEJSESscUovvHO5aDBJW1tN045TR7mI';
    static readonly API_PATH = 'api'
    static readonly DEFAULT_HOST = `http://${HueService.HUE_IP}`
    static readonly DEFAULT_PATH = `${HueService.API_PATH}/${HueService.USER_ID}`;

    static async get<T>(path: string): Promise<T> {
        return await HttpRequest.get(`${HueService.DEFAULT_HOST}/${HueService.DEFAULT_PATH}/${path}`);
    }

    static async put<T>(path: string, body: any): Promise<T> {
        return await HttpRequest.put(HueService.HUE_IP, HueService.HUE_PORT, `/${HueService.DEFAULT_PATH}/${path}`, body);
    }
}