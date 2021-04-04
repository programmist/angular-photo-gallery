import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit {
  images$: Observable<string>;
  constructor() {}

  ngOnInit(): void {}

  search(text: string) {}
}
