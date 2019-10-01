import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewUserComponent implements OnInit {
  dropdownList :any = [];
  selectedItems = [];
  dropdownSettings = {};

  userData = new FormGroup({
    active : new FormControl(''),
    name : new FormControl(''),
    username :  new FormControl(''),
    password :  new FormControl(''),
    confirmpassword :  new FormControl(''),
    level :  new FormControl('operator'),
    role :  new FormControl(''),

    //Operator related fields
    phonenumber :  new FormControl(''),
    num_queue1 :  new FormControl(''),
    num_park :  new FormControl(''),
    num_hold :  new FormControl(''),
    num_redial :  new FormControl(''),
    conferance :  new FormControl('')
    
  });

  constructor(private userServ : UsersService) { }

  ngOnInit() {
    this.userServ.getAllRoles().subscribe(
      (data)=>{
        
        let roles = data['roles'];
        let allRoles =[];
        debugger;
          for( let id in roles  ){
           
            allRoles.push({item_id: id , item_text : roles[id]['title'] });
          }
          this.dropdownList = allRoles;
          debugger;
      },
      (error)=>{
        console.log(error);

      })
    // this.dropdownList = [
    //   { item_id: '1', item_text: 'مقام مدیر' },
    //   { item_id: '2', item_text: ' مقام مدیر درجه 2' },
    //   { item_id: '3', item_text: 'مقام مدیر بخش فرماندهی' },
    //   { item_id: '4', item_text: 'مدیر بخش بازاریابی' },
    //   { item_id: '5', item_text: 'مدیر بخش مدیریت کارفرمایان' },
    //   { item_id: '6', item_text: 'مقام مربوط به دیگر بخش ها' },
    // ];
    // this.selectedItems = [
    //   { item_id: '1', item_text: 'مقام مدیر' }
    // ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه موارد',
      searchPlaceholderText: 'جستجو',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(){}
  onSelectAll(event){}
  onSubmit(userType : string){
    this.userData.patchValue({level: userType});

    console.log(this.userData.getRawValue());
  }

  notSelectedRoles = [];
  allRoles = [];

  selectedRoles = [{ value: '1', title: 'Option 1' }];


  selecteRole(item){
    debugger;
    this.userData.value.role;
  }


}
