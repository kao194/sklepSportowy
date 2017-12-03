import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponentComponent } from './admin-login-component.component';

describe('AdminLoginComponentComponent', () => {
  let component: AdminLoginComponentComponent;
  let fixture: ComponentFixture<AdminLoginComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoginComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
