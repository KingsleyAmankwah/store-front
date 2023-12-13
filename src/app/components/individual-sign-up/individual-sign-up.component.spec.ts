import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSignUpComponent } from './individual-sign-up.component';

describe('IndividualSignUpComponent', () => {
  let component: IndividualSignUpComponent;
  let fixture: ComponentFixture<IndividualSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
