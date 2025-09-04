import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Account } from '../models/account.model';
import { Payment } from '../models/payment.model';
import { Audit } from '../models/audit.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // Adjust port as needed (8080-8084)

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // Customer
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customer/getCustomer/${id}`, { headers: this.getHeaders() });
  }
  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer/createCustomer`, customer, { headers: this.getHeaders() });
  }

  // Account
  getAccount(id: number, username: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/getAccount/${id}?username=${username}`, { headers: this.getHeaders() });
  }
  saveAccount(account: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accounts/saveAccount`, account, { headers: this.getHeaders() });
  }

  // Payment
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payments`, { headers: this.getHeaders() });
  }
  createPayment(payment: { userEmail: string; amount: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments`, payment, { headers: this.getHeaders() });
  }

  // Audit
  createAudit(audit: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/audit/createAudit`, audit, { headers: this.getHeaders() });
  }
  getAuditById(id: number): Observable<Audit> {
    return this.http.get<Audit>(`${this.baseUrl}/audit/getAuditById/${id}`, { headers: this.getHeaders() });
  }

  // Feedback
  submitFeedback(feedback: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/feedback/submitform`, feedback, { headers: this.getHeaders() });
  }
  updateFeedbackStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/feedback/updateStatus/${id}?status=${status}`, {}, { headers: this.getHeaders() });
  }

  // Generic POST method (used by login)
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }
}