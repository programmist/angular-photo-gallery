import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '../types/Image';
import { MediaService } from '../media.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ImgApiResponse } from '../types/ApiResponse';
import { RESPONSE } from './mock-search-response';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('loading') loadingIndicator: ElementRef<HTMLElement>;
  images: Image[] = RESPONSE.photos; //[]; TODO: Remove after testing
  private observer: IntersectionObserver;
  private imageStream = new Subject<Image[]>();
  private currentResult: ImgApiResponse = RESPONSE; // TODO: Remove after testing

  constructor(
    private mediaService: MediaService,
    private dialog: MatDialog,
    private host: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.imageStream.subscribe((images: Image[]) => {
      this.images = [...this.images, ...images];
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.images.length > 0) {
        this.nextPage();
      }
    }, {});
    this.observer.observe(this.loadingIndicator.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  // TODO: DRY up repetitive code
  search(term: string, event: Event): void {
    event.preventDefault();
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
