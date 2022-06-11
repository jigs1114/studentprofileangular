import { Injectable } from '@angular/core';
import { Global } from '../Shared/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentdetailService {

  constructor(private http : HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  Insert(data)
  {
    return this.http.post(Global.baseAPIUrl + "StudentDetail/InsertStudent",data,Global.httpOptions);
  }
  List(data)
  {
    return this.http.post(Global.baseAPIUrl + "StudentDetail/StudentList",data,Global.httpOptions);
  }
  Edit(data)
  {
    return this.http.post(Global.baseAPIUrl + "StudentDetail/EditStudent",data,Global.httpOptions);
  }

  Delete(data)
  {
    return this.http.post(Global.baseAPIUrl + "StudentDetail/DeleteStudent",data,Global.httpOptions);
  }
  fillState(data)
  {
    return this.http.post(Global.baseAPIUrl + "DropDown/SelectState",data,Global.httpOptions);
  }
  fillCity(data)
  {
    return this.http.post(Global.baseAPIUrl + "DropDown/SelectCity",data,Global.httpOptions);
  }
}
