import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Banking';

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
