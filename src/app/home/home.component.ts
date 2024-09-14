import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent {
  posts: any[] = [];
  recentPosts: any[] = [];
  imageDefault = 'assets/img/default.jpg';
  constructor(
    private homeService: HomeService
  ) {

  }

  async ngOnInit() {
    await this.getRecentPosts();
    await this.getPostByFilter();
  }

  /**
   * Lấy tất cả bài viết
   */
  async getPostByFilter() {
    const params = { deleted: true };
    const res: any = await this.homeService.getAllPosts(params);
    this.posts = res.data;
  }

  /**
   * Lấy bài viết mới nhất
   */
  async getRecentPosts() {
    const params = { nums: 4 };
    const res: any = await this.homeService.getRecentPosts(params);
    this.recentPosts = res.data;
  }

}
