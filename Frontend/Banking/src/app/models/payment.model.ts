export interface Payment {
  userEmail: string;
  amount: number;
  status?: string;
  message?: string;
}