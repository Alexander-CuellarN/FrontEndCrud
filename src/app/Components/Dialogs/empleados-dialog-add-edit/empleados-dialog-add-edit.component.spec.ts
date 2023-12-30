import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosDialogAddEditComponent } from './empleados-dialog-add-edit.component';

describe('EmpleadosDialogAddEditComponent', () => {
  let component: EmpleadosDialogAddEditComponent;
  let fixture: ComponentFixture<EmpleadosDialogAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadosDialogAddEditComponent]
    });
    fixture = TestBed.createComponent(EmpleadosDialogAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
