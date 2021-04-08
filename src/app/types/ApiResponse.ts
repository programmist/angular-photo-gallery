import { Image } from './Image';

export interface ApiResponse {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
}

export interface ImgApiResponse extends ApiResponse {
  photos: Image[];
}
