import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { environment } from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
// console.log(localStorage.getItem("authToken"));
@Injectable({
  providedIn: "root",
})
export class AdminService {
  private baseUrl = "";
  constructor(private http: HttpClient) {}

  // token: any = JSON.parse(localStorage.getItem("authToken")).token;

  // httpOptions = { headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }) };

  // Header = () => {
  //   let headers = new HttpHeaders();
  //   // headers = headers.append('content-type', 'multipart/form-data');
  //   // headers = headers.append('Accept', 'multipart/form-data');
  //   headers = headers.append("Authorization", `Bearer ${this.token}`);

  //   return { headers };
  // };

  login(email: any, password: any): Observable<any> {
    let bodyData = { email, password };
    return this.http.post<any>(this.baseUrl + "/v1/admin/login", bodyData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAllMeasurementList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/v1/config/measurement").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addMeasurementConfig(measurementData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/v1/config/measurement", measurementData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  editMeasurementConfig(configId: any, measurementData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/config/measurement/${configId}`, measurementData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteMeasurementConfig(configId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/v1/config/measurement/remove/${configId}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAllDressList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/v1/config/dress").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addDress(measurementData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/v1/config/dress", measurementData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  editDress(dressId: any, dressData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/config/dress/${dressId}`, dressData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteDress(dressId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/v1/config/dress/remove/${dressId}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAllMaterialList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/v1/config/material").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addMaterial(materialData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/v1/config/material", materialData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  editMaterial(materialId: any, materialData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/config/material/${materialId}`, materialData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteMaterial(materialId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/v1/config/material/remove/${materialId}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/v1/customer", customerData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  editCustomer(customerId: any, customerData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/customer/${customerId}`, customerData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteCustomer(customerId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/v1/customer/remove/${customerId}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAllCustomerList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/v1/customer").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getCustomerMeasurementList(customerId: any, dressId: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/measurement/dress/${customerId}`, { dressId }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAllCustomerMeasurement(customerId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/v1/measurement/customer/${customerId}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addNewOrder(bodyData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/order`, bodyData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/v1/order").pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  ChangeOrderStatus(orderId: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/order/status/${orderId}`, null).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  ChangePaymentStatus(orderId: any, paymentMode: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/v1/order/payment/${orderId}`, paymentMode).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  homePageState(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/v1/home`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  //   getSellersOutlet(sellerId: String): Observable<any> {
  //     // sellerId = "9e4b1001";
  //     return this.http.get<any>(this.baseUrl + `/v1/outlet/seller?sellerId=${sellerId}&mode=2`, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   getAllOrder(status: any, from?: any, to?: any): Observable<any> {
  //     const url = from && to ? `${this.baseUrl}/v1/order/outlets?status=${status}&from=${from}&to=${to}` : `${this.baseUrl}/v1/order/outlets?status=${status}`;
  //     return this.http.get<any>(url, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   changeOrderStatus(bodyData: any, from?: any, to?: any): Observable<any> {
  //     const url = `${this.baseUrl}/v1/order/status`;
  //     return this.http.post<any>(url, bodyData, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   getAllTickets(status: any): Observable<any> {
  //     const url = status ? `${this.baseUrl}/v1/support?status=${status}` : `${this.baseUrl}/v1/order/outlets?status=All`;
  //     return this.http.get<any>(url, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   //verify outlet
  //   changeVerificationStatusOfOutlet(bodyData: any) {
  //     return this.http.post(this.baseUrl + "/v1/outlet/verify",bodyData, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // get all outlet
  //   getAllOutlet() {
  //     return this.http.get(this.baseUrl + "/v1/outlet/", this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit outlet by outlet id
  //   editOutletByOutletId(outletId: any, body: any) {
  //     return this.http.post(this.baseUrl + '/v1/outlet/update/' + outletId , body , this.httpOptions).pipe(map((data) => {
  //       return data;
  //     }));
  //   }

  //   // get all cuisine
  //   getAllCuisine() {
  //     return this.http.get(this.baseUrl + "/v1/outlet/cuisine", this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // change outlet status
  //   changeStatus(outletId: any) {
  //     return this.http.get(this.baseUrl + "/v1/outlet/status/" + outletId, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add new outlet
  //   addOutlet(formData: any) {
  //     return this.http.post(this.baseUrl + "/v1/outlet", formData, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   getStat() {
  //     return this.http.get(`${this.baseUrl}/v1/config/stat`, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // get outlet category
  //   getCategory(outletId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/category/" + outletId, this.Header()).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // get sub category
  //   getSubcategory(categoryId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/sub-category/" + categoryId, this.Header()).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // get product by category
  //   getProductBycategory(categoryId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/prod/" + categoryId, this.Header()).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit category
  //   editcategory(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/category/edit", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit product by product id

  //   editProductbyId(productId: any, body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/product/edit/" + productId, body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add outlet category
  //   addCategory(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/category", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add product by parent category id
  //   addProduct(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/product", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // view product details by product id
  //   viewProduct(productId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/product/" + productId, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // getoutlet addon by outlet id
  //   getOutletAddon(outletId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/addOn/" + outletId, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // getproduct addon by product id
  //   getProductAddon(productId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/product/addOn/" + productId, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // getproduct customization
  //   getProductCustomization(productId: any) {
  //     return this.http.get(this.baseUrl + "/v1/menu/customization/" + productId, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit addon Category
  //   editAddonCategory(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/addOn/Category/edit", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add addon Category
  //   addAddonCategory(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/addOn/Category", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit addon product
  //   editAddonProduct(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/addOn/product/edit", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add addon product
  //   addAddonProduct(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/addOn/product", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // link outlet addon to prodcut
  //   linkUnlink(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/product/addOn", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit customization variantion
  //   editVariation(variationId: any, body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/customization/edit/" + variationId, body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add variation in customization
  //   addCustomization(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/customization", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // add variant in variation
  //   addVariation(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/customitem", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // edit variant in variation
  //   editVariant(body: any) {
  //     return this.http.post(this.baseUrl + "/v1/menu/customitem/edit", body, this.httpOptions).pipe(
  //       map((data: any) => {
  //         return data;
  //       })
  //     );
  //   }

  //   // delete data
  //   deleteData(body:any){
  //     return this.http.post(this.baseUrl + '/v1/delete' , body,this.httpOptions).pipe(map((data:any) => {
  //       return data;
  //     }));
  //   }

  //   getPaymentDetails(from:any,to:any){
  //     return this.http.get(this.baseUrl + `/payment/transaction?from=${from}&to=${to}` ,this.httpOptions).pipe(map((data:any)=>{
  //       console.log(data);
  //       return data;
  //    }));
  //   }
}
