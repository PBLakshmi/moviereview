import { Component, OnInit } from '@angular/core';
import { Review } from '../review.model';
import { ReviewServiceService } from '../review-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css'],
})
export class ViewReviewComponent implements OnInit {
  reviews: Review[] = [];
  selectedReview: any;
  reviewId!: string;

  constructor(
    private service: ReviewServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.reviewId = this.route.snapshot.paramMap.get('id')!;
    this.service.getReviewById(this.reviewId).subscribe((data: any) => {
      this.selectedReview = data;
      console.log(data);
    });
  }
}
