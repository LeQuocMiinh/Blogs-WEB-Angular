import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent {
  postsAll: any[] = [];
  recentPosts: any[] = [];
  imageDefault = 'assets/img/default.jpg';
  recentPostsRandom: any[] = [];
  ranked: any;
  constructor(
    private homeService: HomeService,
    public router: Router
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
    this.postsAll = res.data.filter((e: any) => e.status == 'published').slice(0, 5);
  }

  /**
   * Lấy bài viết mới nhất
   */
  async getRecentPosts() {
    const params = { nums: 6 };
    const res: any = await this.homeService.getRecentPosts(params);
    this.recentPosts = res.data.filter((e: any) => e.status == 'published');
    this.ranked = this.recentPosts.slice(0, 4).sort((a, b) => b.views - a.views);
    this.recentPostsRandom = this.recentPosts.slice(2).sort(() => Math.random() - 0.5);
  }

  /**
   * Chuyển hướng 
   * @param redirect 
   * @param id 
   */
  navigate(redirect: string, id: string) {
    this.router.navigate([redirect + '/' + id]);
  }

}
