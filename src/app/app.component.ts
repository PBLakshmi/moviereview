import { Component, OnInit } from '@angular/core';
import { Review } from './review.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewServiceService } from './review-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'review-app';

  review: Review[] = [];
  reviewsToDisplay!: Review[];

  searchForm!: FormGroup;
  reviews: any;
  filteredmovies!: any;

  onAdd() {
    this.router.navigate(['add']);
  }
  constructor(
    private router: Router,
    private service: ReviewServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      searchMovie: [''],
    });
  }
  ngOnInit(): void {
    this.service.getReviews().subscribe((data) => {
      this.review = data;
    });
    this.searchForm.get('searchMovie')!.valueChanges.subscribe((value) => {
      this.filterMovies(value);
    });
  }
  filterMovies(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredmovies = this.review.filter((review) =>
      review.movieName.toLowerCase().includes(filterValue)
    );
  }
}
