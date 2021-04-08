import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgApiResponse } from '../types/ApiResponse';
import { Image } from '../types/Image';

// TODO: generify for videos (generify service?)
export class Query {
  constructor(
    private http: HttpClient,
    private response: ImgApiResponse,
    private httpOptions: { headers: HttpHeaders }
  ) {}

  /**
   * Results of the query
   */
  get mediaResults(): Image[] {
    return this.response.photos;
  }

  /**
   * Report whether query has more results
   */
  get hasNext(): boolean {
    return this.response.next_page !== undefined;
  }

  /**
   * Get the next page of query results
   */
  nextPage(): Observable<ImgApiResponse> {
    return this.http.get<ImgApiResponse>(
      this.response.next_page,
      this.httpOptions
    );
  }
}
