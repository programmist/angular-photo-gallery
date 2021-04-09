import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, ImgApiResponse } from '../types/ApiResponse';
import { Query } from './Query';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  // FIXME: Get from environment variable instead (.env)
  private API_KEY = '563492ad6f917000010000011e0c663dc7004d84affdeeb485a38207';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.API_KEY,
      'Content-Type': 'application/json',
    }),
  };
  private static BASE_URLs = {
    image: 'https://api.pexels.com/v1/search',
    video: 'https://api.pexels.com/videos',
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
    const baseUrl = MediaService.BASE_URLs.image;
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
