import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Review } from '../review.model';
import { ReviewServiceService } from '../review-service.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  id!: string;
  form!: FormGroup;
  selectedImage: any;
  @ViewChild('fileInput') fileInput: any;
  reviews!: Review[];

  ngOnInit(): void {
    this.form = this.fb.group({
      movieName: new FormControl('', [Validators.required]),
      castAndCrew: new FormControl('', [Validators.required]),
      movieReview: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }
  constructor(private fb: FormBuilder, private service: ReviewServiceService) {}
  onSubmit() {
    let review = {
      movieName: this.form.value.movieName,
      castAndCrew: this.form.value.castAndCrew,
      movieReview: this.form.value.movieReview,
      imageUrl: this.fileInput.nativeElement.files[0],
    };
    this.service.addReview(review).subscribe((res) => {
      console.log(res);
    });
    this.form.reset();
  }
}
