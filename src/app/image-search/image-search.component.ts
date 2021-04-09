import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '../types/Image';
import { MediaService } from '../media-service/media.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ImgApiResponse } from '../types/ApiResponse';
import { Query } from '../media-service/Query';

@Component({
  selector: 'image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('spinner') spinner: ElementRef<HTMLElement>;
  searchTerm = '';
  loading = false;
  images: Image[] = [];
  private observer: IntersectionObserver;
  private imageStream = new Subject<Image[]>();
  private currentQuery: Query<ImgApiResponse>;

  constructor(private mediaService: MediaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.imageStream.subscribe((images: Image[]) => {
      this.images.push(...images);
    });
  }

  ngAfterViewInit(): void {
    // Trigger next page load when sentinel element scroll into view
    this.observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && this.images.length > 0) {
          this.nextPage();
        }
      },
      {}
    );
    this.observer.observe(this.spinner.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  /**
   * Initiate new image search
   *
   * @param term The search term
   * @param event The DOM event
   */
  search(term: string, event: Event): void {
    event.preventDefault();

    if (!term?.trim()) {
      return;
    }

    this.searchTerm = term;
    this.loading = true;
    this.mediaService
      .searchImages(term)
      .subscribe((query: Query<ImgApiResponse>) => {
        this.loading = false;
        this.images = [];
        this.imageStream.next(query.response.photos);
        this.currentQuery = query;
      });
  }

  /**
   * Append next page of results, if available
   */
  nextPage(): void {
    if (this.currentQuery.hasNext) {
      this.currentQuery.nextPage().subscribe((res: ImgApiResponse) => {
        this.imageStream.next(res.photos);
      });
    }
  }

  /**
   * Open the image modal
   *
   * @param image The image to display
   */
  openModal(image: Image): void {
    this.dialog.open(ImageModalComponent, {
      data: image,
    });
  }
}
