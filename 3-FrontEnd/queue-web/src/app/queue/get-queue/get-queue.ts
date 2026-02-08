import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QueueService } from '../../services/queue';

@Component({
  selector: 'app-get-queue',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './get-queue.html',
  styleUrl: './get-queue.css'
})
export class GetQueueComponent {
  constructor(
    private queueService: QueueService,
    private router: Router
  ) {}

  generate() {
    this.queueService.generateQueue().subscribe({
      next: (res) => {
        this.router.navigate(['/display-queue'], { state: { data: res } });
      },
      error: (err) => alert('เกิดข้อผิดพลาดในการเชื่อมต่อ API')
    });
  }
}