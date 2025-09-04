import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feedback',
  imports: [MaterialModule,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  customerId = 2;
  message = '';

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  onSubmitFeedback() {
    this.api.submitFeedback({ customerId: this.customerId, type: 'FEEDBACK', message: this.message }).subscribe({
      next: () => this.snackBar.open('Feedback submitted', 'Close', { duration: 3000 }),
      error: err => this.snackBar.open('Submission failed', 'Close', { duration: 3000 })
    });
  }

  onUpdateStatus() {
    this.api.updateFeedbackStatus(12, 'RESOLVED').subscribe({
      next: () => this.snackBar.open('Feedback status updated', 'Close', { duration: 3000 }),
      error: err => this.snackBar.open('Update failed', 'Close', { duration: 3000 })
    });
  }

}
