import * as http from 'http';
import { ObjectUtils } from './utilities/object-utils';
import { StringUtils } from './utilities/string-utils';

export class HttpRequest {
    static async get<T>(path: string): Promise<T> {
        console.log(`GET: ${path}`);
        return await HttpRequest.handleRequest(http.get, path);
    }

    static async put<T>(host: string, port: number, path: string, body?: any): Promise<T> {
        return await HttpRequest.handlePostPut(host, port, path, 'PUT', body);
    }

    static async post<T>(host: string, port: number, path: string, body?: any): Promise<T> {
        return await HttpRequest.handlePostPut(host, port, path, 'POST', body);
    }

    static async handlePostPut<T>(host: string, port: number, path: string, method: 'POST' | 'PUT', body?: any): Promise<T> {
        let data: any;

        let options: http.RequestOptions = {
            host: host,
            port: port,
            path: path,
            method: `${method}`
        }

        console.log(`${method}: ${host}${path}`);

        if(!ObjectUtils.isEmpty(body)) {
            data = JSON.stringify(body);

            options.headers = {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }

            console.log(`body: ${data}`);
        }

        return await HttpRequest.handleRequest(http.request, options, data);
    }

    static async handleRequest<T>(request: (options: string | http.RequestOptions | URL, callback?: (res: http.IncomingMessage) => void) => http.ClientRequest, options: string | http.RequestOptions | URL, data?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            let req = request(options, response => {
                let returnData = '';
    
                response.on('data', chunk => {
                    returnData += chunk;
                });
    
                response.on('end', () => {
                    try {
                        if(!StringUtils.isEmpty(returnData)) {
                            let json = JSON.parse(returnData);

                            if(!(json instanceof Array && !ObjectUtils.isEmpty(json[0]) && !ObjectUtils.isEmpty(json[0].error))) {
                                resolve(json);
                            } else {
                                console.error(json[0].error.description);
                                reject(json[0].error.description);
                            }
                        }
                    } catch(error) {
                        console.error(error);
                        console.log(returnData);
                    }
                });

                response.on('error', error => {
                    console.error(error);
                    reject(error);
                });
            });

            req.on('error', error => {
                console.error(error);
                reject(error);
            })
            
            if(!ObjectUtils.isEmpty(data)) {
                req.write(data);
            }

            req.end();
        });
    }
}