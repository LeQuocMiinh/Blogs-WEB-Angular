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
}