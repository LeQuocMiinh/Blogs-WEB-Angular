import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AppStorage } from 'src/libs/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent {
  storage: AppStorage = new AppStorage();

  constructor(
    public authService: AuthService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAccessToken();
  }

  /**
   * Lấy token 
   */
  getAccessToken() {
    this.authService.getAcessToken([]).subscribe(res => {
      this.storage.setItem('access_token', res);
      this.router.navigate(['/home'])
    })
  }
}
