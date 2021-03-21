import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanComponent } from './bean.component';

describe('BeanComponent', () => {
  let component: BeanComponent;
  let fixture: ComponentFixture<BeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
