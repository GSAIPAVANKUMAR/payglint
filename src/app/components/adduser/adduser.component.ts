import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  constructor(private _mdr: MatDialogRef<AdduserComponent>) { }

  ngOnInit(): void {
  }
  CloseDialog() {
    this._mdr.close(false);
  }
}
