import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgApiResponse } from './types/ImgApiResponse';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private imgSrcUrl = 'https://api.pexels.com/v1/search';
  // FIXME: Get from environment variable instead (.env)
  private API_KEY = '563492ad6f917000010000011e0c663dc7004d84affdeeb485a38207';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.API_KEY,
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  searchImages(
    term: string,
    perPage = 30,
    page = 0
  ): Observable<ImgApiResponse> {
    const searchUrl = `${this.imgSrcUrl}?query=${term}&per_page=${perPage}&page=${page}`;
    return this.http.get<ImgApiResponse>(searchUrl, this.httpOptions);
  }
}
