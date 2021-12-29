export class Contact{
  _id?:any;
  contactname?:string;
  email?:string;
  phone?:string;
  address?:string;


  constructor(id:any,name:string,email:string,phone:string,add:string){
     this._id = id;
     this.contactname = name;
     this.email=email;
     this.phone = phone;
     this.address = add;
  }
}
