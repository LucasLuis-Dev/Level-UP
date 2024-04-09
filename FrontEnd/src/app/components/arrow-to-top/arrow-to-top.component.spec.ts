import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowToTopComponent } from './arrow-to-top.component';

describe('ArrowToTopComponent', () => {
  let component: ArrowToTopComponent;
  let fixture: ComponentFixture<ArrowToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowToTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
