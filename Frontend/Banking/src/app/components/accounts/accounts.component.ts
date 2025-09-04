import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Account } from '../../models/account.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-accounts',
  imports: [MaterialModule,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  account: Account | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAccount(1, 'Archana Venna').subscribe(account => this.account = account);
  }

  onSaveAccount() {
    const newAccount = {
      customerId: 2,
      username: 'Archana Venna',
      panCardNum: 'ABCDE345H',
      aadhaarCardNum: '123443212341',
      accountNumber: '1234567890',
      accountType: 'SAVINGS',
      balance: 1000.00,
      loan: 0.00
    };
    this.api.saveAccount(newAccount).subscribe({
      next: () => alert('Account saved'),
      error: err => console.error('Save failed', err)
    });
  }

}
