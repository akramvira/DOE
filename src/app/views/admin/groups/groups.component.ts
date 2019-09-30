import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from './_services/groups.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../_services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(
    private groupServ : GroupsService, 
    private authServ: AuthenticationService,
    private toastr: ToastrService
    ) { }

  groups = new Array();
  allExtensions : [];
  selectedGroupExtensions : any = [] ;
  remainingExtensions : any;
  parentSelected: boolean = false;
  itemsChanged: boolean= false;
  activeParentId : number;
  addingNewGroup :boolean =false;
  newGroupName = new FormControl('', [Validators.required]);
  activeRow : number;
  editing = {};

  ngOnInit() {
    this.groupServ.getAllGroups().subscribe(
      (data)=>{
        let groupesData = new Array();
        for(var i in data['groups']){
          groupesData.push(data['groups'][i]);
        }
        this.groups = groupesData;

        this.allExtensions = data['extensions'];
        this.remainingExtensions = this.allExtensions;
        this.setRemainingExtensions();
       // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
        
      },
      (error)=>{
        console.log(error);
        this.authServ.handdleAuthErrors(error);
      }
       );
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.groups[rowIndex][cell] = event.target.value;
    this.refreshParents();
    console.log('UPDATED!', this.groups[rowIndex][cell]);

  let newName = this.groups[rowIndex][cell];
  let id = this.groups[rowIndex]['id'] ;
  
    this.groupServ.updateGroup({name:newName, id:id, value:this.selectedGroupExtensions.join(',')})
    .subscribe(
      (data)=>{
        console.log(data);
        this.itemsChanged= false;
        this.toastr.success('نام گروه با موفقیت تغییر یافت');
      },
      (error)=>{console.log(error)}
    );
  }

  refreshParents(){
    this.groups = [...this.groups];
  }

  onKeyPress(event){
    if(event.which == 13){
      event.target.blur();
    }
  }

  onActivate(event) {
    if(event.type == 'click') {
        this.parentSelected = true;
        this.selectedGroupExtensions = event.row.value.split(',');
        this.convertSelectedGroupExtentionsToInt();
        this.setRemainingExtensions();
        this.activeParentId =  event.row.id;
       
       
        this.itemsChanged = false;
    }
  }

  setActiveRow(rowIndex){
  this.activeRow = rowIndex;
  }

  setRemainingExtensions(){
    let $this = this;
    
    this.selectedGroupExtensions;
    this.remainingExtensions = this.allExtensions.filter(
      ( el ) => {
        return !$this.selectedGroupExtensions.includes( el ) 
      }
      );

    this.remainingExtensions.sort();
  }

  convertSelectedGroupExtentionsToInt(){
    let $this = this;
    this.selectedGroupExtensions.forEach(function(e, i){
      $this.selectedGroupExtensions[i]=   parseInt( $this.selectedGroupExtensions[i]);
    })
  }

  addItemToSelectedParent(event, subItem){
    if(this.parentSelected)
    if(!this.selectedGroupExtensions.includes( subItem ) ){
      this.itemsChanged = true;
      this.selectedGroupExtensions.push(subItem);
      this.setRemainingExtensions();
    }
      
  }

  removeFromSelectedParent(event, subItem){
    
    if(this.parentSelected)
    if(this.selectedGroupExtensions.includes( subItem ) ){
      this.itemsChanged = true;
      this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
      this.setRemainingExtensions();
    }
      
  }

  updateParentItems(){
    this.groupServ.updateGroup({id:this.activeParentId, value: this.selectedGroupExtensions.join(',')})
    .subscribe(
      (data)=>{
        console.log(data);
        this.itemsChanged= false;
      
        this.groups[this.activeRow]['value'] = this.selectedGroupExtensions.join(',');
      this.refreshParents();
        this.toastr.success('داخلی های گروهگ '+ this.groups[this.activeRow]['name']+'  با موفقیت ثبت شد.');
      },
      (error)=>{console.log(error)}
    );
  }



  addNewGroupClick(){
    if(this.addingNewGroup){
      

      let newItemData = {
        name: this.newGroupName.value,
        value:[]
      };

      this.groupServ.addGroup(newItemData).subscribe(
        (data)=>{
          this.toastr.success('گروه با موفقیت اضافه شد.')
          this.groups.push(newItemData);
          this.refreshParents();
        },
        (error)=>{console.log(error)}
      );

      this.refreshParents();
      this.addingNewGroup =  false;
    }
    else 
      this.addingNewGroup = true;
  }



  filterAllExtensions(event){
    let searhKey = event.target.value;

    this.setRemainingExtensions();// to refresh
    console.log(searhKey);
    let searchResult = this.remainingExtensions.filter(
      (el)=>{
        //debugger;
       
        String(el).indexOf(searhKey)== 0;
    })

  }

  @ViewChild('removeGroupModal') public smallModal: ModalDirective;
  
  selectedItemNameToDelete = '';
  showRemoveModal(rowIndex){
    
    this.smallModal.show();
    this.activeRow = rowIndex;
    this.selectedItemNameToDelete = this.groups[this.activeRow]['name'];
  }
  confirmDelete(){
    this.groupServ.deleteGroup(this.groups[this.activeRow]['id'])
    .subscribe(
      (data)=>{console.log(data)},
      (error)=>{console.log(error)}
      )
    console.log(this.groups[this.activeRow]['title']);
  }
  

}
