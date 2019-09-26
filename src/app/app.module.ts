import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
// ngx spinner
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderService } from './services/loader.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InplaceModule } from 'primeng/inplace';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgOperatorsComponent } from './components/ng-operators/ng-operators.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ep0', component: DatatableComponent },
  { path: 'ep1', component: NgOperatorsComponent }
];

@NgModule({
  declarations: [AppComponent, NgOperatorsComponent, HomeComponent, HeaderComponent, DatatableComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    MenuModule,
    DropdownModule,
    PaginatorModule,
    NgxSpinnerModule,
    TableModule,
    MultiSelectModule,
    InplaceModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule

  ],
  providers: [
    // LoaderService,Http error intercepter
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
