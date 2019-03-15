import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('http://localhost:8080/api/posts');
  }

  getProducts() {
    return this.http.get('http://localhost:8080/api/products');
  }

  getProductById(id) {
    return this.http.get(`http://localhost:8080/api/products/${id}`);
  }



}
