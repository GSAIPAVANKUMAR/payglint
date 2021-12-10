import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addmodel',
  templateUrl: './addmodel.component.html',
  styleUrls: ['./addmodel.component.scss']
})
export class AddmodelComponent implements OnInit {

  constructor(private _mdr: MatDialogRef<AddmodelComponent>) { }

  ngOnInit(): void {
  }
  CloseDialog() {
    this._mdr.close(false);
  }
}
