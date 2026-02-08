import { Routes } from '@angular/router';
import { GetQueueComponent } from './queue/get-queue/get-queue';
import { DisplayQueueComponent } from './queue/display-queue/display-queue';
import { ResetQueueComponent } from './queue/reset-queue/reset-queue';

export const routes: Routes = [
  { path: '', redirectTo: 'get-queue', pathMatch: 'full' },
  { path: 'get-queue', component: GetQueueComponent },      // หน้า IT 05-1
  { path: 'display-queue', component: DisplayQueueComponent }, // หน้า IT 05-2
  { path: 'reset-queue', component: ResetQueueComponent }    // หน้า IT 05-3
];