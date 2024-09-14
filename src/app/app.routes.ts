import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersClientComponent } from './orders-client/orders-client.component';
import { clientGuard, adminGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "admin/products", component: ProductsComponent, canActivate: [adminGuard]},
    {path: "admin/dashboard", component: DashboardComponent, canActivate: [adminGuard]},
    {path: "admin/categories", component: CategoriesComponent, canActivate: [adminGuard]},
    {path: "user", component: OrdersClientComponent, canActivate: [clientGuard]},
    {path: "**", redirectTo: 'login'}
];
