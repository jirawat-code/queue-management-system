import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QueueService } from '../../services/queue';

@Component({
  selector: 'app-reset-queue',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './reset-queue.html',
  styleUrl: './reset-queue.css'
})
export class ResetQueueComponent implements OnInit {

  currentFullQueue: any;

  constructor(
    private queueService: QueueService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.loadCurrentQueue();
  }

  loadCurrentQueue() {
    this.queueService.getCurrent().subscribe({
      next: (res) => {
        if (res) {
          this.currentFullQueue = res.FullQueue;
        } else {
          this.currentFullQueue = null;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('เชื่อมต่อไม่ได้', err)
    });
  }

  reset() {
    if (confirm('คุณต้องการล้างคิวทั้งหมดใช่หรือไม่?')) {
      this.queueService.resetQueue().subscribe({
        next: () => {
          this.loadCurrentQueue();
        },
        error: (err) => console.error(err)
      });
    }
  }
}