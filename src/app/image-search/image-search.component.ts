import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '../types/Image';
import { MediaService } from '../media.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ImgApiResponse } from '../types/ImgApiResponse';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('loading') loadingIndicator: ElementRef<HTMLElement>;
  images: Image[] = [];
  private observer: IntersectionObserver;
  private imageStream = new Subject<Image[]>();
  private currentResult: ImgApiResponse;

  constructor(
    private mediaService: MediaService,
    private dialog: MatDialog,
    private host: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.images.length > 0) this.nextPage();
    }, {});

    this.observer.observe(this.loadingIndicator.nativeElement);
  }

  ngOnInit(): void {
    this.imageStream.subscribe((images: Image[]) => {
      this.images = [...this.images, ...images];
    });
  }

  // TODO: DRY up repetitive code
  search(term: string): void {
    this.mediaService.searchImages(term).subscribe((res) => {
      this.currentResult = res;
      this.images = [];
      this.imageStream.next(res.photos);
    });
  }

  nextPage(): void {
    this.mediaService.get(this.currentResult.next_page).subscribe((res) => {
      this.currentResult = res;
      this.imageStream.next(res.photos);
    });
  }

  openModal(image: Image): void {
    this.dialog.open(ImageModalComponent, {
      data: image,
    });
  }
}
