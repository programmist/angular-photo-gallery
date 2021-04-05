import { Component, OnInit } from '@angular/core';
import { Image } from '../types/Image';
import { MediaService } from '../media.service';
import { RESPONSE } from './mock-search-response';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit {
  // TODO: Remove hard-code response after styling
  images: Image[] = RESPONSE.photos;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {}

  // TODO: Add loading indicator
  search(term: string): void {
    this.mediaService.searchImages(term).subscribe((res) => {
      this.images = res.photos;
    });
  }
}
