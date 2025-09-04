import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { Account } from '../../models/account.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  customer: Customer | null = null;
  account: Account | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCustomer(2).subscribe(customer => this.customer = customer);
    this.api.getAccount(1, 'Archana Venna').subscribe(account => this.account = account);
  }

}
