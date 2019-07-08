import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplyTokenComponent} from './apply-token.component';

describe('ApplyTokenComponent', () => {
  let component: ApplyTokenComponent;
  let fixture: ComponentFixture<ApplyTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyTokenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
