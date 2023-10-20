import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { HomeComponent } from "./home.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AuthGuard } from "app/auth/helpers";

const routes = [
  {
    path: "home",
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: { animation: "home" },
  },
];

@NgModule({
  declarations: [ HomeComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule,NgbModule, CoreCommonModule,  TranslateModule, CoreCommonModule,NgxDatatableModule],
  exports: [HomeComponent],
})
export class HomeModule {}
