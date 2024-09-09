import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AppStorage } from 'src/libs/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent {
  title = 'Blogs-WEB-Angular';
  storage: AppStorage = new AppStorage();
  constructor(private appService: AppService) {

  }

  async ngOnInit() {
    await this.getAccessToken();
  }

  getAccessToken() {
    this.appService.getAccessToken([]).subscribe(res => {
      if (res.status) {
        this.storage.setItem('access_token', res.access_token);
      }
    })
  }
}
