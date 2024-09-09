import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    apiUrl: string = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    getAllPost() {
        return this.to(this.httpClient.get<any>(this.apiUrl + '/posts/get-posts-by-filter'));
    }

    to(obs: Observable<any>) {
        return new Promise((resolve, reject) => {
            const subsribers: any = obs.subscribe(
                complete => resolve(this.handleData(complete)),
                error => reject(error),
                () => subsribers.unsubscribe()
            )
        })
    }

    handleData(data: any) {
        return data;
    }
}