import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosDialogDeleteComponent } from './empleados-dialog-delete.component';

describe('EmpleadosDialogDeleteComponent', () => {
  let component: EmpleadosDialogDeleteComponent;
  let fixture: ComponentFixture<EmpleadosDialogDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadosDialogDeleteComponent]
    });
    fixture = TestBed.createComponent(EmpleadosDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
