import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentdetailService } from "src/app/studentdetail/studentdetail.service";
import { StudentDetail } from "../Models/student.model";
import { Global } from '../Shared/global';
import { NgForm } from "@angular/forms/forms";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
  @ViewChild('studentForm')
  studentForm!: NgForm;

  records: any;
  responsedata: any;
  studentdata: StudentDetail = new StudentDetail;
  searchtext: any;
  drpdata: any;
  states: any;
  cities: any;
  

  constructor(private service: StudentdetailService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.studentdata = new StudentDetail();
    this.List();
    this.fillState()
    $('#btnsubmit').attr('disabled', true);
  }

  List() {
    const data = {

    }
     this.service.List(data)
       .subscribe((data1) => {
    
        this.responsedata = data1;
        if (this.responsedata.isSuccess == false) {
          return
        }
        else {
          this.records = this.responsedata.StudentDetailList;
          this.studentForm.resetForm();
        }
      }, (err: HttpErrorResponse) => {
        localStorage.clear();
        this.toastr.error('Something Went Wrong');
      });

  }
  getChkAgree(event) {
    if( event.target.checked == true){
      $('#btnsubmit').attr('disabled', false);
    }
    else{
      $('#btnsubmit').attr('disabled', true);
    }
  }
  fillState() {
    const data = {}
    this.service.fillState(data)
      .subscribe(data => {
        this.drpdata = data;
        this.states = this.drpdata.dropdownlist;
        this.studentdata.stateid = 0; 
      });

  }
  fillCity(id,type) {
    const data = {
      stateID : id
    }
    this.service.fillCity(data)
      .subscribe(data => {
        this.drpdata = data;
        this.cities = this.drpdata.dropdownlist;
        if(type != 2){
        this.studentdata.cityid = 0;
        }
      });

  }

  onSubmit(data: StudentDetail) {
    if (this.studentForm.valid && this.studentdata.stateid != 0 && this.studentdata.cityid != 0) {
      this.service.Insert(data)
        .subscribe(data => {
          this.responsedata = data;
          if (this.responsedata.isSuccess == false) {
            this.toastr.error(this.responsedata.Message);
          }
          else {
            this.closesubmitmodal();
            this.List();
            this.toastr.success(this.responsedata.Message);
          }

        }, (err: HttpErrorResponse) => {
          localStorage.clear();
          this.toastr.error('Something Went Wrong');
          this.router.navigate(['/dashboard']);
        });
    }
  }

  onEdit(data: StudentDetail) {
    this.service.Edit(data)
      .subscribe((data1 : StudentDetail) => {
        
        this.responsedata = data1;
        this.studentdata = this.responsedata;
        
        if (this.responsedata.isSuccess == true) {
          this.fillCity(data1.stateid,2);
          setTimeout(() => {
            this.studentdata.stateid = this.responsedata.stateid;
            this.studentdata.cityid = this.responsedata.cityid;  
            $('#Agree').prop('checked', true);
            $('#btnsubmit').attr('disabled', false);
          }, 1000);
          this.openmodal();
        
        }
        else {
         this.toastr.error(this.responsedata.Message);
         return;
         
        }
      }, (err: HttpErrorResponse) => {
        localStorage.clear();
        
        this.toastr.error('Something Went Wrong');
        this.router.navigate(['/login']);
      });
  }
  onDelete(data:any) {
    var a = confirm("Are you sure you want to delete ?");
    if (a) {
      this.service.Delete(data)
        .subscribe((data1) => {
          this.responsedata = data1;
          if (this.responsedata.isSuccess == false) {
            this.toastr.error(this.responsedata.Message);
          }
          else {
            this.toastr.success(this.responsedata.Message);
          }
          this.List();
        }, (err: HttpErrorResponse) => {
          localStorage.clear();
          this.toastr.error('Something Went Wrong');
          this.router.navigate(['/login']);
        });
    }
  }
  openmodal() {
    $('#studentModal').modal('show');
   
  
  }
  closesubmitmodal() {
    $('#studentModal').modal('hide');
    this.studentForm.resetForm();
    $('#Agree').prop('checked', false);
    $('#btnsubmit').attr('disabled', true);
    setTimeout(() => {
      this.studentdata.stateid = 0;
      this.studentdata.cityid = 0;
    }, 1000);
  }
}
