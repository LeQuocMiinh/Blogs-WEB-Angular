import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AppStorage } from 'src/libs/storage';
import { AuthService } from './auth/auth.service';
import { of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent {
  categoryMenu: any[] = [];
  title = 'Blogs-WEB-Angular';
  storage: AppStorage = new AppStorage();

  constructor(
    public appService: AppService,
    public authService: AuthService,
    public router: Router
  ) {

  }

  ngAfterViewInit(): void {
    this.getAllCategories();
  }

  /**
   * Lấy các danh mục hiển thị như Menu
   */
  getAllCategories() {
    const params = { deleted: true };
    this.appService.getAccessToken([]).pipe(
      switchMap((res: any) => {
        if (res.status) {
          this.storage.setItem('access_token', res.access_token);
          return this.appService.getAllCategories(params);
        } else {
          this.router.navigate(['/auth']);
          return of(null);
        }
      })
    ).subscribe(
      (res: any) => {
        this.categoryMenu = res.data;
      },
      (error) => {
        this.router.navigate(['/auth']);
      }
    );
  }

}
