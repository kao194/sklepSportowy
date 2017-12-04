import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocyjneProduktyComponent } from './promocyjne-produkty.component';

describe('PromocyjneProduktyComponent', () => {
  let component: PromocyjneProduktyComponent;
  let fixture: ComponentFixture<PromocyjneProduktyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocyjneProduktyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocyjneProduktyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
