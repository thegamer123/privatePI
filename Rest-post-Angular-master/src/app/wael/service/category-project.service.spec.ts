import { TestBed, inject } from '@angular/core/testing';

import { CategoryProjectService } from './category-project.service';

describe('CategoryProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryProjectService]
    });
  });

  it('should be created', inject([CategoryProjectService], (service: CategoryProjectService) => {
    expect(service).toBeTruthy();
  }));
});
