import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { AdminService } from "app/services/admin.service";
import { ToastrService } from "ngx-toastr";
import { log } from "console";


@Component({
  selector: "app-auth-login-v2",
  templateUrl: "./auth-login-v2.component.html",
  styleUrls: ["./auth-login-v2.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = "";
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService, private toastr:ToastrService,private adminService: AdminService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _router: Router) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else{
      const formData ={
        "username":this.loginForm.value.email,
        "password":this.loginForm.value.password
      }
      // this.adminService.login(formData).subscribe((data:any)=>{
      //   this._router.navigate(['/']);
      //   //console.log(data.status);
      //   /* if(data.status){
      //     this.toastr.success(data.message,"Success!");
      //     this._router.navigate(['/']);
      //   }
      //   else{
      //     this.toastr.error(data.message,"error!")
          
      //   } */
        
      // })
      this.adminService.login(formData).subscribe({
        next: (response) => {
         this._router.navigate(['/']);
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
  

    // redirect to home page
    /* setTimeout(() => {
      this.loading = false;
      this._router.navigate(["/"]);

    }, 100); */
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
