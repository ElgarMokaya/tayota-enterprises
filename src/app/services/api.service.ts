import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../constants/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postProduct(data: any) {
    return this.http.post<any>(`${BASE_URL}/products`, data);
    
  }
  getProduct() {
    return this.http.get<any>(`${BASE_URL}/products`);
  }
  putProduct(data:any,id:number){
    return this.http.put<any>(`${BASE_URL}/products`+id,data)

  }
  deleteProduct(id:number){
    return this.http.delete<any>(`${BASE_URL}/products`+id )

  }
  
}
