import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';

/**
 * Flyweight-like class holding query state and actions
 */
export class Query<T extends ApiResponse> {
  constructor(
    public response: T,
    private http: HttpClient,
    private httpOptions: { headers: HttpHeaders }
  ) {}

  /**
   * Report whether query has more results
   */
  get hasNext(): boolean {
    return this.response.next_page !== undefined;
  }

  /**
   * Get the next page of query results
   */
  nextPage(): Observable<T> {
    return this.http.get<T>(this.response.next_page, this.httpOptions);
  }
}
