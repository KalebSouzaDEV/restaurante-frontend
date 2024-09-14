import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface order {
  id: string,
  valueOrder: number,
  method: string,
  client: string,
  createdAt: string
}

interface user {
  id: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    orders: order[] = [];
    totalValueOrders = 0;
    totalClients = 0; 

    constructor(private http: HttpClient) {
      this.getAllOrders()
      this.getAllClients()
    }

    getAllClients(){
      this.http.get<user[]>("http://localhost:8080/users").subscribe(response => {
        this.totalClients = response.length - 1
      })
    }

    getAllOrders(){
      this.http.get<order[]>("http://localhost:8080/order").subscribe(response => {
        this.orders = response
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          this.totalValueOrders += element.valueOrder;
        }
      })
    }
}
