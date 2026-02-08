import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetQueueComponent } from './get-queue';
import { QueueService } from '../../services/queue';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { vi } from 'vitest';

describe('GetQueueComponent', () => {
  let component: GetQueueComponent;
  let fixture: ComponentFixture<GetQueueComponent>;
  let queueServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {

    queueServiceMock = {
      generateQueue: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [GetQueueComponent],
      providers: [
        provideRouter([]),
        { provide: QueueService, useValue: queueServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GetQueueComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router);

    vi.spyOn(routerMock, 'navigate');
    fixture.detectChanges();
  });

  // case 1
  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  // case 2
  it('should navigate to display-queue with data when generate button is clicked', () => {
    const mockRes = { FullQueue: 'A1', CreatedAt: new Date() };

    queueServiceMock.generateQueue.mockReturnValue(of(mockRes));
    component.generate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/display-queue'], {
      state: {
        data: expect.objectContaining({ FullQueue: 'A1' })
      }
    });
  });

  // case 3: Error Handling
  it('should alert the user when the API returns an error', () => {
    const mockError = new Error('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    queueServiceMock.generateQueue.mockReturnValue(throwError(() => mockError));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    component.generate();
    expect(alertSpy).toHaveBeenCalledWith('เกิดข้อผิดพลาดในการเชื่อมต่อ API');
  });
});