import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})

export class SinglePostService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    getPostDetail(id: string) {
        return this.to(this.httpClient.get<any>(this.apiUrl + `/posts/get-detail/${id}`));
    }

    updateViewPost(id: string) {
        return this.to(this.httpClient.post<any>(this.apiUrl + `/posts/${id}/view`, {}));
    }

    to(obs: Observable<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const subscriber: any = obs.subscribe(
                complete => resolve(this.handleData(complete)),
                error => reject(error),
                () => subscriber.unsubscribe()
            )
        })
    }

    handleData(data: any) {
        return data;
    }
}