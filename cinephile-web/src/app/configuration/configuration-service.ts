import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './configuration';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {

    public ApiConfiguration: Configuration = null;
    private configurationUrl = 'http://localhost:5000/api/configuration';

    constructor(private http: HttpClient) { }

    getApiConfiguration(): Promise<Configuration> {        
        let promise = this.http.get<Configuration>(this.configurationUrl).toPromise();
        promise.then(config => this.ApiConfiguration = config);
        console.log('Retrieved configuration');
        return promise;
    }
}