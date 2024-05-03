import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewServiceService {
  private Url = 'http://localhost:3000/posts';

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.Url);
  }
  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.Url}/${id}`);
  }
  deleteReview(id?: string): Observable<Review> {
    return this.http.delete<Review>(`${this.Url}/${id}`);
  }
  editReviews(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.Url}/${id}`, review);
  }
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.Url, review);
  }
  constructor(private http: HttpClient) {}
}
