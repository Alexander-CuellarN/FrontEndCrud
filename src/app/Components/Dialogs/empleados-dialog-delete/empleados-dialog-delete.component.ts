import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from 'src/app/Interfaces/empleado';

@Component({
  selector: 'app-empleados-dialog-delete',
  templateUrl: './empleados-dialog-delete.component.html',
  styleUrls: ['./empleados-dialog-delete.component.css']
})
export class EmpleadosDialogDeleteComponent {

  constructor(
    private dialogReferences: MatDialogRef<EmpleadosDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {}

  confirmarEliminar(){
    if(this.dataEmpleado){
      this.dialogReferences.close("Eliminar")
    }
  }
}
