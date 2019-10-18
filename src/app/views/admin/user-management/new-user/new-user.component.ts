import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(private userServ : UsersService,
    private toaster : ToastrService,
    private authService : AuthenticationService,
    private router : Router
    ) { }

  ngOnInit() {
    this.userServ.getAllRoles().subscribe(
      (data)=>{
        
        let roles = data['roles'];
        let allRoles =[];
        debugger;
          for( let id in roles  ){
           
            allRoles.push({id: id , text : roles[id]['title'] });
          }
          this.dropdownList = allRoles;
          debugger;
      },
      (error)=>{
        console.log(error);

      });
      
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه موارد',
      searchPlaceholderText: 'جستجو',
      itemsShowLimit: 3,
      limitSelection : 1,
      allowSearchFilter: true
    };
  }

  fetchData(data) {
    let finalData = [];
    for (let i in data) {
      finalData.push(data[i]["id"]);
    }

    return finalData.join(",");
  }

  onItemSelect(){}
  onSelectAll(event){}
  onSubmit(){

    let userData = this.userData.getRawValue();
    debugger;
    userData['role'] = this.fetchData(userData['role']);

    this.userServ.addUser(userData).subscribe(
      data=>{
        debugger;
        this.toaster.success('کاربر جدید اضافه شد.');
        this.router.navigate(['/admin/users-management/users']);
      },
      error=>{
        this.authService.handdleAuthErrors(error);
      }
    )
    
  }

  notSelectedRoles = [];
  allRoles = [];

  selectedRoles = [{ value: '1', title: 'Option 1' }];


  selecteRole(item){
    debugger;
    this.userData.value.role;
  }


}
