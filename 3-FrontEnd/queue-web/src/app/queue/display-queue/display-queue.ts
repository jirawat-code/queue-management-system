import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-display-queue',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './display-queue.html',
  styleUrl: './display-queue.css'
})
export class DisplayQueueComponent {
  private router = inject(Router);
  queue = history.state?.data;
  constructor() {
    if (!this.queue) {
      this.router.navigate(['/get-queue']);
    }
  }
}