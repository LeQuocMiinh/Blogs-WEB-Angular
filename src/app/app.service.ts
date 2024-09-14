import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})

export class AppService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    getAccessToken(params: any): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/auth/normal-user', params);
    }

    getAllCategories(params: any): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/category/get-all', params);
    }

    to(obs: Observable<any>) {
        return new Promise((resolve, reject) => {
            const subscriber: any = obs.subscribe(
                complete => resolve(this.handleData(complete)),
                error => reject(error),
                () => subscriber.unsubscribe()
            );
        });
    }

    handleData(data: any) {
        return data;
    }
}