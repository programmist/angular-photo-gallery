import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from '../types/Image';
import { MediaService } from '../media.service';
import { RESPONSE } from './mock-search-response';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit {
  // TODO: Remove hard-code response after styling
  images: Image[] = RESPONSE.photos;

  constructor(private mediaService: MediaService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  // TODO: Add loading indicator
  search(term: string): void {
    this.mediaService.searchImages(term).subscribe((res) => {
      this.images = res.photos;
    });
  }

  openModal(image: Image): void {
    this.dialog.open(ImageModalComponent, {
      data: image,
    });
  }
}
