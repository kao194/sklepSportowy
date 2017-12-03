import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocjeKomponentComponent } from './promocje-komponent.component';

describe('PromocjeKomponentComponent', () => {
  let component: PromocjeKomponentComponent;
  let fixture: ComponentFixture<PromocjeKomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocjeKomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocjeKomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
