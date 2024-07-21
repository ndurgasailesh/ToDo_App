import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthoriseComponent } from './unauthorise.component';

describe('UnAuthoriseComponent', () => {
  let component: UnAuthoriseComponent;
  let fixture: ComponentFixture<UnAuthoriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnAuthoriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthoriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
