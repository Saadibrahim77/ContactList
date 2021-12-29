import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../model/contact';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService]

})
export class ContactComponent implements OnInit {

  contactlist?:Contact[];
  Contactupdate?:Contact;
  contactnamefield?:string;
  emailfield?:string;
  phonefield?:string;
  addressfield?:string;
  searchfield?:any;
  isEditSubmitted:boolean=false;

  constructor(public _ContactService:ContactService) { }

  contactform = new FormGroup({
    contactname: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.getAllContacts();
    this.emailfield = "";
    this.phonefield = "";
    this.addressfield = "";
    this.contactnamefield = "";

  }

  getAllContacts(){
    this._ContactService.getAllContacts().subscribe((contacts:any)=>{

      this.contactlist=contacts;
      console.log(contacts);

    }
    );
  }


  addContact(){

    if(this.isEditSubmitted==false){
      console.log("EditSave" + this.isEditSubmitted)
      const newContact ={
        contactname:this.contactnamefield,
        email:this.emailfield,
        phone:this.phonefield,
        address:this.addressfield,
      }
        this._ContactService.addUserContact(newContact).subscribe(contact=>{
          this.contactlist?.push(contact);
          console.log(contact);
          this.ngOnInit();
     });
    }else{
      console.log("Edit Edit" + this.isEditSubmitted)
      this.onDelete(this.Contactupdate);
      this.isEditSubmitted=false;
      this.addContact();
     /* console.log("Edit Edit" + this.isEditSubmitted)
      this._ContactService.editContact(this.Contactupdate).subscribe((data)=>{
        console.log("Saad Ibrahim")
        console.log(data);
      })*/
    }
  }

  onEdit(contact:any){
    this.emailfield = contact.email;
    this.phonefield = contact.phone;
    this.addressfield = contact.address;
    this.contactnamefield = contact.contactname;
    this.Contactupdate = contact;
    this.isEditSubmitted=true;
    console.log("Edit" + this.isEditSubmitted)

  }

  onDelete(contact:any){

    this._ContactService.deleteContact(contact).subscribe((res)=>
    {

      console.log("Deleted");
      this.ngOnInit();
    });

  }


  Search(){
    if(this.searchfield==""){
      this.ngOnInit();
    }else{
      this.contactlist = this.contactlist?.filter(res =>{
        return res.contactname?.toLocaleLowerCase().match(this.searchfield.toLocaleLowerCase());
      });
    }
  }


}
