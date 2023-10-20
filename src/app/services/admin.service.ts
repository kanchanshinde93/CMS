import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
// console.log(localStorage.getItem("authToken"));
@Injectable({
  providedIn: "root",
})
export class AdminService {
  private baseUrl = "";
  private apiUrl = environment.apiUrl;

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
 
  login(bodyData:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/lead/login", bodyData).pipe(
      map((data: any) => {
        
         localStorage.setItem("user_id", data.data.username);
        return data;
      })
    );
  }

  getallList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/lead/split").pipe(
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

 
}
