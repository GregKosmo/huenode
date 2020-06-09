import { HttpRequest } from '../http-request';

export class GoogleHomeService {
    static readonly GOOGLE_HOME_IP = '192.168.1.29';
    static readonly GOOGLE_HOME_PORT = 8008;
    static readonly API_PATH = 'setup'
    static readonly DEFAULT_HOST = `http://${GoogleHomeService.GOOGLE_HOME_IP}`
    static readonly DEFAULT_PATH = GoogleHomeService.API_PATH;

    static async post<T>(path: string, body: any): Promise<T> {
        return await HttpRequest.post(GoogleHomeService.GOOGLE_HOME_IP, GoogleHomeService.GOOGLE_HOME_PORT, `/${GoogleHomeService.DEFAULT_PATH}/${path}`, body);
    }
}