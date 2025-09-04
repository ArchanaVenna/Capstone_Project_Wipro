import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payments',
  imports: [MaterialModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  userEmail = '';
  amount = 0;

  constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  onPayment() {
    this.api.createPayment({ userEmail: this.userEmail, amount: this.amount }).subscribe({
      next: response => {
        this.snackBar.open(response.message || 'Payment initiated. Email sent via Kafka.', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: err => this.snackBar.open('Payment failed', 'Close', { duration: 3000 })
    });
  }

}
