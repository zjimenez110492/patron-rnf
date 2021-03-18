import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRnfComponent } from './view-rnf.component';

describe('ViewRnfComponent', () => {
  let component: ViewRnfComponent;
  let fixture: ComponentFixture<ViewRnfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRnfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
