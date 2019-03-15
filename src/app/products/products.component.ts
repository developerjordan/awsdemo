import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
public products: any = [];
@Output() selectedProduct: Subject<any> = new Subject;
cart: any = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts().subscribe((data) => {
      const prod: any = data;
      prod.forEach(element => {
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  addToCart(item) {
    this.selectedProduct.next(item);
    this.cart.push(item);
    this.saveCart(this.cart);
  }
  saveCart(items) {
    sessionStorage.setItem('cart', JSON.stringify(items));
  }

}
