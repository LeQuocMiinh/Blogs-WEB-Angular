import { Component, Input } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() categoryMenu: any[] = [];
  constructor(
  ) {

  }

  ngOnInit(): void {
  }

}
