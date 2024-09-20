import { Component, OnInit } from '@angular/core';
import { SinglePostService } from './single-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  id: string = '';
  postDetail: any;
  postsListNext: any[] = [];
  postsListNextRandom: any[] = [];
  imageDefault = 'assets/img/default.jpg';
  constructor(
    public singlePostService: SinglePostService,
    public activateRoute: ActivatedRoute,
    public homeService: HomeService,
    public router: Router
  ) { }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(async params => {
      if (params['id']) {
        this.id = params['id'];
        await this.getPostDetail(params['id']);
        setTimeout(() => {
          this.updateView(params['id']);
        }, 3000);
      }
    });

    this.getRecentPosts();
  }


  async getPostDetail(id: string) {
    await this.singlePostService.getPostDetail(id).then((res: any) => {
      this.postDetail = res.data;
    })
  }

  /**
 * Lấy bài viết mới nhất
 */
  async getRecentPosts() {
    const params = { nums: 6 };
    const res: any = await this.homeService.getRecentPosts(params);
    this.postsListNext = res.data.filter((e: any) => e.status == 'published' && e._id != this.id);
    this.postsListNextRandom = this.postsListNext.slice(1).sort(() => Math.random() - 0.5);
  }

  updateView(id: string) {
    this.singlePostService.updateViewPost(id);
  }

  navigate(redirect: string, id: string) {
    this.router.navigate([redirect + '/' + id]);
  }

  async share() {
    try {
      await navigator.share({
        title: this.postDetail.title,
        text: this.postDetail.description,
        url: window.location.href
      });
    } catch (error) {
      console.log(error);
    }
  }
}
