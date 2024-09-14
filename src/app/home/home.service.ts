import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ParamGetPostsByFilter, ParamGetRecentPosts } from "./home.model";

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    apiUrl: string = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    getAllPosts(params: ParamGetPostsByFilter) {
        return this.to(this.httpClient.post<any>(this.apiUrl + '/posts/get-posts-by-filter', params));
    }

    getRecentPosts(params: ParamGetRecentPosts) {
        return this.to(this.httpClient.post<any>(this.apiUrl + '/posts/get-recent-posts', params));
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