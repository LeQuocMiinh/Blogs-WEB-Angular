import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglePostRoutingModule } from './single-post-routing.module';
import { SinglePostComponent } from './single-post.component';


@NgModule({
  declarations: [
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    SinglePostRoutingModule
  ]
})
export class SinglePostModule { }
