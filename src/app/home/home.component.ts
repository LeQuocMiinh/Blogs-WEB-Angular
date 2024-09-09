import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent {
  posts: any;
  imageDefault = 'assets/img/default.jpg';
  constructor(
    private homeService: HomeService
  ) {

  }

  async ngOnInit() {
    await this.getPostByFilter();
    console.log(this.posts);
  }

  async getPostByFilter() {
    const res: any = await this.homeService.getAllPost();
    this.posts = res.data;
  }
}
