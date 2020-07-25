import { TestBed, inject } from '@angular/core/testing';
import { ProjetService } from './projet.service';



describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjetService]
    });
  });

  it('should be created', inject([ProjetService], (service: ProjetService) => {
    expect(service).toBeTruthy();
  }));
});
