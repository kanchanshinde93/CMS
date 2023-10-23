import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { AdminService } from "app/services/admin.service";
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  public rows;
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

  // private

  /**
   * Constructor
   *
   *
   */
  constructor(private adminService: AdminService,private modalService: NgbModal) {
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

  getAllList() {
    this.adminService.getallList().subscribe((data: any) => {
      this.ListData = data.data;
      console.log(data.data);
     this.userId= localStorage.getItem("user_id")
     console.log( this.userId);
      this.rows = data.data[this.userId];
      this.name=  this.rows[0]?.name;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.ListData;
      this.filteredData = this.ListData;
    })
  }
  /* filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.ListData.filter(function (d) {

      return d.name?.toLowerCase().indexOf(val) !== -1  ;
    });



    // update the rows
    this.kitchenSinkRows = this.rows;

  } */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  // modal delete promo
  modalBannerDelete(bannerDelete:any) {
    this.modalService.open(bannerDelete, {
      centered: true,
    });
  }

  modalOPenCall(body:any,cutsData:any){
    this.customerData=cutsData;
    console.log(this.customerData);
    
    this.modalService.open(body, {
      centered: true,
      size: 'lg'
    });
  }


  changeStutes(stutes:any){
  let body=  {
      "status":stutes,
  }
  console.log(body);
this.adminService.changeStatus(this.customerData.leadId,body).subscribe((data: any) => {
  console.log(data)
}) 
}
}
