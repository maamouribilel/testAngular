import { Component, OnInit } from '@angular/core';
import { MenuItem, SortEvent } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  title = 'testApp';
  items: MenuItem[];
  users: User[];
  employees: Employee[];
  cols: any[];
  colsEm: any[];
  selectedColumns: any[];
  display = false;
  displayAddForm = false;
  selectedEmployee: any = {};

  addForm: FormGroup;
  isSubmitted = false;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private apiService: ApiService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.apiService.getUsers().then(users => (this.users = users));
    this.apiService.getEmployees().subscribe(res => {
      this.employees = res as Employee[];
    },(error)=>{
      this.messageService.add({
        severity: 'error',
        summary: error.message
      });
      
    });

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],
      id: ['', Validators.required]
    });
    this.formControls();
    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'fa fa-plus' },
          { label: 'Open', icon: 'fa fa-download' }
        ]
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: 'fa fa-refresh' },
          { label: 'Redo', icon: 'fa fa-repeat' }
        ]
      }
    ];
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
      { field: 'email', header: 'email' },
      { field: 'phone', header: 'phone' },
      { field: 'website', header: 'website' }
    ];
    this.colsEm = [
      { field: 'id', header: 'employee id' },
      { field: 'employee_name', header: 'employee_name' },
      { field: 'employee_salary', header: 'employee_salary' },
      { field: 'employee_age', header: 'employee_age' },
      { field: 'action', header: 'actions' }
    ];
    this.selectedColumns = this.cols;
  }

  callApi() {
    this.http.get('../assets/db.json').subscribe(data => {
    });
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return event.order * result;
    });
  }

  showDialog() {
    this.display = true;
  }
  showAddDialog() {
    this.displayAddForm = true;
  }

  formControls() {
    const formControls = this.addForm.controls;
    return formControls;
  }

  /****** /
   */
  getEmployee(employeeId) {
    this.apiService.getEmployee(employeeId).subscribe(res => {
      this.selectedEmployee = res;
    });
  }

  deleteEmployee(employeeId) {
    this.apiService.deleteEmployee(employeeId).then(res => {
      console.log(res.success.text);

      this.messageService.add({
        severity: 'success',
        summary: res.success.text
      });
    });
  }

  onAddEmployee() {
    this.isSubmitted = true;
    const newEmployee = {
      name: this.addForm.get('name').value,
      salary: this.addForm.get('salary').value,
      age: this.addForm.get('age').value,
      id: this.addForm.get('id').value,
    };
    this.apiService.addEmployee(newEmployee).subscribe(res => {
      if (res != null) {
        this.messageService.add({
          severity: 'success',
          summary: 'New Employee Added successfuly!'
        });
      } else {
        this.messageService.add({
          severity: 'warning',
          summary: 'an error occured!'
        });
      }
      this.addForm.reset();
      this.displayAddForm = false;
    });

  }
}
