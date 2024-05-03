import { Component, OnInit } from '@angular/core';
import { Review } from '../review.model';
import { Subscription } from 'rxjs';
import { ReviewServiceService } from '../review-service.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  reviews!: Review[];
  reviewSubscription!: Subscription;

  ngOnInit() {
    this.fetchAllReviews();
  }
  fetchAllReviews() {
    this.reviewSubscription = this.service.getReviews().subscribe(
      (data: any[]) => {
        this.reviews = data;
      },
      (error: any) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  ratingControl = new FormControl(0);

  delete(Id?: string) {
    if (Id) {
      this.service.deleteReview(Id).subscribe(() => {
        this.reviews = this.reviews.filter((review) => review.id !== Id);
      });
    } else {
      console.error('invalidId');
    }
  }
  edit(Id: string) {
    this.router.navigate(['../edit', Id], { relativeTo: this.route.parent });
  }
  add() {
    this.router.navigate(['../add'], { relativeTo: this.route.parent });
  }

  constructor(
    private service: ReviewServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  onRateChange(rate: number) {
    console.log('New rating:', rate);
  }
}
