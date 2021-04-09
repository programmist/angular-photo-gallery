import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImgApiResponse } from '../types/ApiResponse';
import { Query } from './Query';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private static BASE_URLS = {
    image: 'https://api.pexels.com/v1/search',
    video: 'https://api.pexels.com/videos',
  };

  // For development-purposes only. Not secure.
  private API_KEY = environment.PEXELS_API_KEY;
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.API_KEY,
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Perform an image search
   *
   * @param term The search term
   * @param perPage The results per page
   * @param page The requested page of results
   */
  searchImages(
    term: string,
    perPage = 30,
    page = 0
  ): Observable<Query<ImgApiResponse>> {
    const baseUrl = MediaService.BASE_URLS.image;
    const searchUrl = `${baseUrl}?query=${term}&per_page=${perPage}&page=${page}`;
    return this.http
      .get<ImgApiResponse>(searchUrl, this.httpOptions)
      .pipe(
        map(
          (response: ImgApiResponse) =>
            new Query<ImgApiResponse>(response, this.http, this.httpOptions)
        )
      );
  }
}
