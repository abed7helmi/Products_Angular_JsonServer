import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{


  constructor(private productService:ProductService,
              private router : Router, public appState : AppStateService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.appState.setProductState({status:"LOADING"})

    this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSize)
      .subscribe({
        next : (resp) => {
          let products = resp.body as Product[]; // pour faire le cast
          let totalProducts:number=parseInt( resp.headers.get('x-total-count')!)
          //parseInt ne peut pas perser null , j'ai ajoute ! pour demande de oublier ca '
          //this.appState.productsState.totalProducts=totalProducts;
          //this.appState.productsState.totalPages= Math.floor(totalProducts/ this.appState.productsState.pageSize) // floor arrondi
          let totalPages =  Math.floor(totalProducts/ this.appState.productsState.pageSize) // floor arrondi
          if(totalProducts % this.appState.productsState.pageSize != 0){
            //this.appState.productsState.totalPages=this.appState.productsState.totalPages+1;
            totalPages++
          }
          this.appState.setProductState({
            products: products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            status : "LOADED"

          })
        },
        error : err => {
          console.log(err);
          this.appState.setProductState({

            status : "ERROR",
            errorMessage : err

          })
        }
      })

    //this.products=this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
        //this.getProducts();
      }
    })
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        this.appState.productsState.products=
          this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
      }
    })
  }



  handleGoToPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.getProducts();

  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
