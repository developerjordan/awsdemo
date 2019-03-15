import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
productId: any = 0;
item: any;
relatedItems: any = [];
description: any;
images: any;

@Output() selectedProduct: Subject<any> = new Subject;
cart: any = [];

  constructor(private router: ActivatedRoute, private api: ApiService ) { }

  ngOnInit() {
      $(document).ready(function() {
        $('.carousel').carousel({
          fullWidth: false,
          indicators: true
        });
        $('select').formSelect();
      });
    this.router.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.productId = params.get('id');
      this.api.getProductById(this.productId).subscribe((data) => {
        const product: any = data;
        this.item = product;
        this.getRelatedProducts(this.item.related_ids);
        this.stripHtml(this.item.description);
      });
    });

  }

  getRelatedProducts(relatedIds) {
    relatedIds.forEach(element => {
      this.api.getProductById(element).subscribe((data) => {
        this.relatedItems.push(data);
      });
      console.log(this.relatedItems);
    });
  }

  // strips html tags from a string
  stripHtml(html) {
    const StrippedString = html.replace(/(<([^>]+)>)/ig, '');
    this.item.description = StrippedString;
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
