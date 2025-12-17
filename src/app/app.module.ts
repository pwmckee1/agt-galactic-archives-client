import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forBrowser(),
    CommonModule,
    NgbModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      preventDuplicates: true,
      autoDismiss: true,
    }),
    AppRoutingModule,
  ],
})
export class AppModule { }
