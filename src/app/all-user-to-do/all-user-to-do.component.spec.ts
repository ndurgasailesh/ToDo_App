import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserToDoComponent } from './all-user-to-do.component';

describe('AllUserToDoComponent', () => {
  let component: AllUserToDoComponent;
  let fixture: ComponentFixture<AllUserToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
