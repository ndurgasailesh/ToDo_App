import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './utilities/jwt.interceptor';
import { ErrorInterceptor } from './utilities/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { CorsRequestInterceptor } from './utilities/cors.interceptor';
import { TodoComponent } from './todo/todoComponent';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { RegisterComponent } from './register/register.component';
import { SearchTitlePipe } from './pipes/filter.pipe';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { AllUserToDoComponent } from './all-user-to-do/all-user-to-do.component';
import { AlertModule } from 'ngx-alerts';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
    ModalComponent,
    TodoListComponent,
    TodoItemComponent,
    RegisterComponent,
    SearchTitlePipe,
    AddEditTodoComponent,
    AllUserToDoComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkListboxModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatSidenavModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CorsRequestInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
