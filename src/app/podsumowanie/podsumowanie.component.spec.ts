import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsumowanieComponent } from './podsumowanie.component';

describe('PodsumowanieComponent', () => {
  let component: PodsumowanieComponent;
  let fixture: ComponentFixture<PodsumowanieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodsumowanieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodsumowanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
