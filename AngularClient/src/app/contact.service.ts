import { Injectable } from '@angular/core';
import { Contact } from './model/contact';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _HttpClient:HttpClient) { }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  addUserContact(newContact:any){
    return this._HttpClient.post("http://localhost:3000/api/addcontact",newContact);
  }
  deleteContact(deleteContact:any){
    console.log("delete");
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._HttpClient.delete("http://localhost:3000/api/deletecontact/"+deleteContact._id.trim(),this.httpOptions);
  }
  editContact(updatedContact:any){
    return this._HttpClient.put("http://localhost:3000/api/editcontact/"+updatedContact._id.trim(),updatedContact);
  }
  getAllContacts():Observable<Contact>{
    return this._HttpClient.get("http://localhost:3000/api/contacts");
  }


}
