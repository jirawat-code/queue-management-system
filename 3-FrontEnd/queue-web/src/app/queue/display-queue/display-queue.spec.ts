import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayQueueComponent } from './display-queue';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

describe('DisplayQueueComponent', () => {
  let component: DisplayQueueComponent;
  let fixture: ComponentFixture<DisplayQueueComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayQueueComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    router = TestBed.inject(Router);
    // สร้าง Spy สำหรับตรวจสอบการเปลี่ยนหน้า
    vi.spyOn(router, 'navigate');
  });

  // case 1
  it('should navigate back to /get-queue if state data is missing', () => {
    vi.stubGlobal('history', { state: {} });

    fixture = TestBed.createComponent(DisplayQueueComponent);
    component = fixture.componentInstance;
    
    expect(router.navigate).toHaveBeenCalledWith(['/get-queue']);
  });
  // case 2
  it('should store the queue data in the component variable when navigation state is provided', () => {
    const mockData = { FullQueue: 'A1', CreatedAt: new Date() };
    vi.stubGlobal('history', { state: { data: mockData } });
    
    fixture = TestBed.createComponent(DisplayQueueComponent);
    component = fixture.componentInstance;
    
    expect(component.queue).toEqual(mockData);
  });
});