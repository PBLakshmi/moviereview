import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Review } from '../review.model';
import { ActivatedRoute } from '@angular/router';
import { ReviewServiceService } from '../review-service.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  reviewId!: string;
  form!: FormGroup;
  @ViewChild('fileInput') fileInput: any;
  reviews!: Review[];
  currentImageName: string = '';
  selectedReview: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ReviewServiceService
  ) {}

  ngOnInit(): void {
    this.reviewId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.reviewId);

    this.form = this.fb.group({
      movieName: new FormControl('', [Validators.required]),
      castAndCrew: new FormControl('', [Validators.required]),
      movieReview: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
    this.fetchReviewById(this.reviewId);
  }
  fetchReviewById(reviewId: string): void {
    this.service.getReviewById(reviewId).subscribe((data: any) => {
      this.selectedReview = data;
      console.log(data);
      this.form.patchValue({
        movieName: data.movieName,
        CastAndCrew: data.castAndCrew,
        MovieReview: data.MovieReview,
        imageUrl: data.imageUrl,
      });
      this.currentImageName = data.imageUrl;
    });
  }
  onFileSelected(event: any) {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const [files] = event.target.files;
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        this.currentImageName = reader.result as string;
        this.form.patchValue({
          imageUrl: reader.result,
        });
      };
    }
  }
  onSubmit() {
    let imageUrl =
      this.fileInput.nativeElement.files.length > 0
        ? this.fileInput.nativeElement.files[0].movieName
        : this.currentImageName;
    let review = {
      movieName: this.form.value.movieName,
      castAndCrew: this.form.value.castAndCrew,
      movieReview: this.form.value.movieName,
      imageUrl: imageUrl,
    };
    this.service.editReviews(this.reviewId, review).subscribe((res) => {
      console.log(res);
    });
    this.form.reset();
  }
}
