import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  rowdata: any;
  name:any;
  email:any;
  role:any;
  constructor(private _mdr: MatDialogRef<EdituserComponent>,@Inject(MAT_DIALOG_DATA) private data: any) {
    this.rowdata =  data;
    this.name = this.rowdata.row.Name;
    this.email = this.rowdata.row.Email;
    this.role = this.rowdata.row.Role;
   }
  
  ngOnInit(): void {
    
  }

  CloseDialog() {
    this._mdr.close(false);
  }
}
