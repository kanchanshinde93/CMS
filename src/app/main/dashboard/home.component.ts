import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { AdminService } from "app/services/admin.service";
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from '@angular/platform-browser';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  // public
  public data: any;
 
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: "All", value: "" },
    { name: "Downloaded", value: "Downloaded" },
    { name: "Draft", value: "Draft" },
    { name: "Paid", value: "Paid" },
    { name: "Partial Payment", value: "Partial Payment" },
    { name: "Past Due", value: "Past Due" },
    { name: "Sent", value: "Sent" },
  ];

  public selectedStatus = [];
  public searchValue = "";
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  // decorator

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows=[];
  public tempFilterData;
  public previousStatusFilter = "";

  // public
  public contentHeader: object;
  public searchText: string;
  ListData: any;
  kitchenSinkRows: any;
  filteredData: any;
  userId: string;
  customerData: any;
  name:any
  contactNumber: any;

  // private
  sipnumber:any
  ipNumber:any='@10.2.0.90'
  modalRef: import("@ng-bootstrap/ng-bootstrap").NgbModalRef;
  /**
   * Constructor
   *
   *
   */
  constructor(private adminService: AdminService,private modalService: NgbModal,private toastr:ToastrService,private sanitizer:DomSanitizer) {
   
    
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    //     this.adminService.onFaqsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });
    this.data = [{ title: "Pending Call" }];
    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Sample",
            isLink: false,
          },
        ],
      },
    };
    this.getAllList()
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  getAllList() {
    this.adminService.getallList().subscribe((data: any) => {
      this.ListData = data.data;
      this.userId= localStorage.getItem("user_id")
      this.rows = data.data[this.userId];
      this.name=  this.rows[0]?.name;
      this.contactNumber= this.rows[0]?.contact;
      this.sipnumber=this.contactNumber+this.ipNumber;
     // console.log( this.sipnumber);
      this.tempData = this.rows;
      this.kitchenSinkRows = this.ListData;
      this.filteredData = this.ListData;
    })
  }
  callApi(data:any){
     let body=  {
      "status":"call_back"
    }
     this.adminService.changeStatus(data.leadId,body).subscribe((data: any) => {
     // console.log(data)
      this.getAllList();
    }) 
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
 

  modalOPenCall(body:any,cutsData:any){
    this.customerData=cutsData;
    //console.log(this.customerData);
    
    this.modalRef=this.modalService.open(body, {
      centered: true,
      size: 'lg'
    });
  }


  changeStutes(stutes:any){
  let body=  {
      "status":stutes,
  }
 // console.log(body);
this.adminService.changeStatus(this.customerData.leadId,body).subscribe({
  next: (response) => {
    this.modalRef.close();
  this.getAllList();
   
  this.toastr.success(response.message,"Success!");
   },
  error: (error) => {
    console.log(error);
  this.toastr.error(error.error.message,"error!");

  },
  complete: () => {
    console.log("error");
    // define on request complete logic
    // 'complete' is not the same as 'finalize'!!
    // this logic will not be executed if error is fired
  }
})
}
}
