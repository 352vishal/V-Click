import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { order } from '../data-types';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent  implements OnInit{
  icon=faShoppingCart;
  
  orderData:order[]|undefined
  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      // if(result){
        this.getOrderList();
      // }
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}
