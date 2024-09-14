import { Component } from '@angular/core';
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

interface order {
  createdAt: string,
  valueOrder: number, 
  method: string
}

@Component({
  selector: 'app-orders-client',
  standalone: true,
  imports: [SidebarClientComponent, CommonModule, FormsModule],
  templateUrl: './orders-client.component.html',
  styleUrl: './orders-client.component.css'
})
export class OrdersClientComponent {
  orders: order[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getOrders();
  }

  getOrders(){
    const clientName = this.authService.getNameToken()
    this.http.get<order[]>(`http://localhost:8080/order/${clientName}`).subscribe(response => {
      this.orders = response
    })
  }
}
