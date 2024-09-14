import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    apiUrl: string = environment.apiUrl;
    public resToken = new BehaviorSubject<string>('');

    constructor(
        private httpClient: HttpClient
    ) {
    }

    /**
     * Lấy token
     * @param params 
     * @returns 
     */
    getAcessToken(params: any): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/auth/normal-user', params).pipe(
            tap((res: any) => this.resToken.next(res.access_token)), // sử dụng tap để sử lý dữ liệu theo nhánh khác mà không ảnh hưởng đến kết quả ban đầu
            map(res => res.access_token) // sử dụng map để trả về dữ liệu mong muốn
        );
    }

    /**
     * Kiểm tra token
     * @returns 
     */
    hasToken(): boolean {
        return !!this.resToken.value;
    }

    /**
    * Sử dụng get (getter) là một cách để định nghĩa một phương thức đó có thể được truy cập như một thuộc tính.
    */
    get token(): string | null {
        return this.resToken.value;
    }

}