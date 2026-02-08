import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // ใช้แทน Module
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'; // ใช้แทน Module
import { QueueService } from './queue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('QueueService', () => {
  let service: QueueService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://localhost:7232/api/queue';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueueService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(QueueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  // Case 1
  it('should call POST /generate and return data', () => {
    const mockResponse = { FullQueue: 'A1' };

    service.generateQueue().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/generate`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Case 2
  it('should call POST /current and return the latest queue info', () => {
    const mockResponse = { FullQueue: 'A5' };

    service.getCurrent().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/current`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Case 3
  it('should call POST /reset to clear all queues', () => {
    const mockResponse = { message: 'Reset successful' };

    service.resetQueue().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/reset`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
