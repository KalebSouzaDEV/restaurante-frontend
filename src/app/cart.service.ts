import { Injectable } from '@angular/core';


interface cartItem {
  name: string, 
  quantity: number, 
  img: string, 
  price: number,
  valueTotal: number
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart: cartItem[] = [];
  valueCartTotal = 0;

  constructor() { 
    const cartData = localStorage.getItem("cart")
    if (cartData) {
      this.cart = JSON.parse(cartData)
      this.getCartValue()
    }
  }

  cartIsVisible = false;

	toggleCart(){
		this.cartIsVisible = !this.cartIsVisible;
	}

  cartIsActive(){
    return this.cartIsVisible;
  }

  addItemToCart(name: string, quantity: number, img: string, price: number){
    if (name && quantity && img && price) {
      const existingItem = this.cart.find(item => item.name == name);
      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.valueTotal = (existingItem.quantity * existingItem.price)
        this.getCartValue()
        localStorage.setItem("cart", JSON.stringify(this.cart))
      } else {
        this.cart.push({name, quantity, img, price, valueTotal: price}) 
        this.getCartValue()
        localStorage.setItem("cart", JSON.stringify(this.cart))
      }
    }
  }
  
  removeItemFromCart(name: string, quantity: number) {
    this.cart = this.cart.filter(element => {
      if (element.name == name) {
        if (element.quantity <= quantity) {
          this.getCartValue()
          return false;
        } else {
          element.quantity -= quantity;
          element.valueTotal = (element.quantity * element.price)
          this.getCartValue()
          return true;
        }
      }
      return true;
    })
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }

  getAllItems() {
    return this.cart
  }

  getCartValue(){
    this.valueCartTotal = 0;
    this.cart.forEach(element => {
      this.valueCartTotal += element.valueTotal;
    });
  }

  clearCart(){
    this.cart = [];
    localStorage.removeItem("cart")
    this.getCartValue()
    this.cartIsVisible = false;
  }

}
