import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgularMateriaModule } from "./Modules/agular-materia.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoComponent } from './Components/Empleados/empleado/empleado.component';
import { EmpleadosDialogAddEditComponent } from './Components/Dialogs/empleados-dialog-add-edit/empleados-dialog-add-edit.component';
import { EmpleadosDialogDeleteComponent } from './Components/Dialogs/empleados-dialog-delete/empleados-dialog-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    EmpleadosDialogAddEditComponent,
    EmpleadosDialogDeleteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgularMateriaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
