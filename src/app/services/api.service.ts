import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  User
} from '../interfaces/user';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  Employee
} from '../interfaces/employee';
import {
  map,
  catchError,
  retry
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .toPromise()
      .then(res => res as User[])
      .then(data => {
        return data;
      });
  }

  /********************** GET  **********************/
  /*
  getEmployees(): Observable < any > {
    return this.http.get('http://dummy.restapiexample.com/api/v1/employees')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
*/
getEmployees(): Observable < any > {
  return this.http.get('http://dummy.restapiexample.com/api/v1/employees')
}

  getEmployee(employeeId) {
    return this.http.get(
      'http://dummy.restapiexample.com/api/v1/employee/' + employeeId
    );
  }
  /******************** Delete  ********************/
  deleteEmployee(employeeId) {
    return this.http
      .delete('http://dummy.restapiexample.com/api/v1/delete/' + employeeId)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  /********************** ADD ******************** */
  addEmployee(emp) {
    return this.http.post('http://dummy.restapiexample.com/api/v1/create', emp);
  }


}
