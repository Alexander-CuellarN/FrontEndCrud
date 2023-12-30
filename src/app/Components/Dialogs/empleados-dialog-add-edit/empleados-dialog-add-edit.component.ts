import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departamento } from 'src/app/Interfaces/departamento';
import { Empleado } from 'src/app/Interfaces/empleado';
import { DepartamentoService } from 'src/app/Services/departamento.service';
import { EmpleadoService } from 'src/app/Services/empleado.service';

@Component({
  selector: 'app-empleados-dialog-add-edit',
  templateUrl: './empleados-dialog-add-edit.component.html',
  styleUrls: ['./empleados-dialog-add-edit.component.css']
})
export class EmpleadosDialogAddEditComponent implements OnInit {

  fromEmpleado!: FormGroup;
  titulo: string = "Nuevo";
  botonAccion: string = "Gurdar";
  listaDepartamentos!: Departamento[];


  constructor(
    private dialogReferences: MatDialogRef<EmpleadosDialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _departamentoServicio: DepartamentoService,
    private _empleadoServicio: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {


    this.fromEmpleado = this.fb.group({
      nombreCompleto: ["", Validators.required],
      idDepartamento: ["", Validators.required],
      sueldo: ["", Validators.required],
      fechaContrato: ["", Validators.required]
    })

    this._departamentoServicio.getList().subscribe({
      next: (data) => {
        this.listaDepartamentos = data;
      },
      error: (error) => {
        console.error(error)
      }
    })


  }

  addEdit() {

    let { nombreCompleto, idDepartamento, sueldo, fechaContrato } = this.fromEmpleado.value;

    let Empleado: Empleado = {
      idEmpleado: 0,
      nombreCompleto: nombreCompleto,
      idDepartamento: idDepartamento,
      sueldo: sueldo,
      fechaContrato: this.formatDate(fechaContrato)
    }

    if(this.dataEmpleado === null){
      this._empleadoServicio.add(Empleado).subscribe({
        next: (data) => {
          this.openSnackBar("El empleado se ha creado con exito", "Aceptar!");
          this.dialogReferences.close("Creado");
        },
        error: () => {
          this.openSnackBar("No se ha podido crear el Empleado", "ok!");
        }
      })
    }else{
      Empleado.idEmpleado = this.dataEmpleado.idEmpleado

      this._empleadoServicio.update(this.dataEmpleado.idEmpleado, Empleado).subscribe({
        next: () => {
          this.openSnackBar("El empleado se ha actualizado con exito", "Aceptar!");
          this.dialogReferences.close("Editado");
        },
        error: () => {
          this.openSnackBar("No se ha podido editar el Empleado", "ok!");
        }
      })
    }
  }

  formatDate(fecha: any) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let año = fecha.getFullYear().toString().substr(-2); // Obtiene los últimos dos dígitos del año

    // Asegúrate de que el día y el mes siempre tengan dos dígitos
    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;

    let fechaFormateada = dia + '/' + mes + '/' + año;

    return fechaFormateada
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  ngOnInit(): void {

    if (this.dataEmpleado) {

      let { fechaContrato, nombreCompleto, sueldo, idDepartamento } = this.dataEmpleado
      
      this.fromEmpleado.patchValue({
        nombreCompleto: nombreCompleto,
        idDepartamento: idDepartamento,
        sueldo: sueldo,
        fechaContrato: this.dateToPicker(fechaContrato)
      })

      this.titulo = "Actualizar"
      this.botonAccion = "Editar"
    }
  }

  dateToPicker(fecha: string) {
    let partes = fecha.split("/");
    let año = partes[2];
    // Asegúrate de que el año tenga cuatro dígitos
    if (año.length === 2) año = "20" + año;
    let fechaFormateada = partes[0] + "/" + partes[1] + "/" + año;
    return  new Date(fechaFormateada)
  }
}
