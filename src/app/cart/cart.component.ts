import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() addedItem: Subject<any>;
  cartItems: any = [];
  constructor() { }

  ngOnInit() {
    this.initializeCart();
    if (this.addedItem !== undefined ) {
      this.addedItem.subscribe((data) => {
        this.cartItems.push(data);
      });
    }
  }

  initializeCart() {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart'));
  }

}
