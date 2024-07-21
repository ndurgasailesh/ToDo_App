import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utilities/auth.guards';
import { LoginComponent } from './login/login.component';
import { Role } from './models/role';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RegisterComponent } from './register/register.component';
import { AllUserToDoComponent } from './all-user-to-do/all-user-to-do.component';
import { RoleGuard } from './utilities/role.guard';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'todo',
        component: TodoListComponent,
        canActivate: [AuthGuard,RoleGuard],
        data: { role: [Role.User] }
    },
    {
        path: 'todo/all',
        component: AllUserToDoComponent,
        canActivate: [AuthGuard,RoleGuard],
        data: { role: [Role.Admin] }
    },
    {
        path: 'unauthorised',
        component: ErrorComponent 
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }