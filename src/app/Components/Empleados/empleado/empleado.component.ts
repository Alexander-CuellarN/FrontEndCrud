import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/Interfaces/empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { EmpleadosDialogAddEditComponent } from '../../Dialogs/empleados-dialog-add-edit/empleados-dialog-add-edit.component';
import { EmpleadosDialogDeleteComponent } from '../../Dialogs/empleados-dialog-delete/empleados-dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nombreCompleto', 'nombreDepartamento', 'sueldo', 'fechaContrato', 'Acciones'];
  dataSource!: MatTableDataSource<Empleado>;
  userList: Empleado[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _EmpleadoService: EmpleadoService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.userList);
  }

  ngOnInit(): void {
    this.motrarEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  motrarEmpleados(): void {
    this._EmpleadoService.getList().subscribe({
      next: (data: Empleado[]) => {
        this.dataSource.data = data;
      },
      error: (error) => console.log(error)
    })
  }

  openDialogCreate() {
    const dialogRef = this._dialog.open(EmpleadosDialogAddEditComponent, {
      disableClose: true,
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "Creado"){
        this.motrarEmpleados();
      }
    });
  }

  openDialogUpdate(data: Empleado) {
    const dialogRef = this._dialog.open(EmpleadosDialogAddEditComponent, {
      disableClose: true,
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "Editado"){
        this.motrarEmpleados();
      }
    });
  }

  openDialogDelete(data: Empleado){
    const dialogRef = this._dialog.open(EmpleadosDialogDeleteComponent, {
      disableClose: true,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "Eliminar"){

        this._EmpleadoService.delete(data.idEmpleado).subscribe({
          next: () =>{
            this._snackBar.open("El empleado se elimino correctamente", "Ok", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000
            });
            this.motrarEmpleados();
          }, 

          error: ()=>{
            this._snackBar.open("No se ha podido eliminar el empleado", "Ok", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000
            });
          }
        })
        

        
      }
    });
  }
}

