import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetQueueComponent } from './reset-queue';
import { QueueService } from '../../services/queue';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('ResetQueueComponent', () => {
  let component: ResetQueueComponent;
  let fixture: ComponentFixture<ResetQueueComponent>;
  let queueServiceMock: any;

  beforeEach(async () => {
    queueServiceMock = {
      getCurrent: vi.fn().mockReturnValue(of({ FullQueue: 'A5' })),
      resetQueue: vi.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ResetQueueComponent],
      providers: [
        provideRouter([]),
        { provide: QueueService, useValue: queueServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // case 1
  it('should fetch the latest queue info on initialization (ngOnInit)', () => {
    expect(queueServiceMock.getCurrent).toHaveBeenCalled();
    expect(component.currentFullQueue).toBe('A5');
  });
  // case 2
  it('should call resetQueue service when user confirms the reset action', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.reset();
    expect(queueServiceMock.resetQueue).toHaveBeenCalled();
    expect(component.currentFullQueue).toBe('A5');
  });
});