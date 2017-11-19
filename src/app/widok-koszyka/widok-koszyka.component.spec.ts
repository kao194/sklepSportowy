import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidokKoszykaComponent } from './widok-koszyka.component';

describe('WidokKoszykaComponent', () => {
  let component: WidokKoszykaComponent;
  let fixture: ComponentFixture<WidokKoszykaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidokKoszykaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidokKoszykaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
