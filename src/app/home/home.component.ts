import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: any = [];
  constructor(private api: ApiService) { }

  ngOnInit() {

    $(document).ready(function() {
      $('.parallax').parallax();
      $('.carousel').carousel({
        duration: 300,
        fullWidth: true,
        indicators: true
      });
    });

    this.api.getProducts().subscribe((prod) => {
      const p: any = prod;
      for (let index = 0; index < 3; index++) {

        this.featuredProducts.push(p[index]);
      }
  });
  console.log(this.featuredProducts);
  }
}
