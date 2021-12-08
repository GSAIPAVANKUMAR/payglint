import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-savefilter',
  templateUrl: './savefilter.component.html',
  styleUrls: ['./savefilter.component.scss']
})
export class SavefilterComponent implements OnInit {
  access:any = "private";
  show:boolean = true;
  selectedOption:any;
  constructor(private _mdr: MatDialogRef<SavefilterComponent>) { }

  ngOnInit(): void {
  }
  CloseDialog() {
    this._mdr.close(false);
  }
  selectedValue(val:any) {
    this.show = !this.show;
    this.access = val;
  }
}
