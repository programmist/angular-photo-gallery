import { Image } from './Image';

export interface ImgApiResponse {
  page: number;
  per_page: number;
  total_results: number;
  next_page: number;
  photos: Image[];
}
