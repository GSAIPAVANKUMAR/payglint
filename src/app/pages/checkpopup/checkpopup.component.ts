import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkpopup',
  templateUrl: './checkpopup.component.html',
  styleUrls: ['./checkpopup.component.scss']
})
export class CheckpopupComponent implements OnInit {
  showgeninf = true;
  dis = false;
  showuserinf = true;
  showreasoninf = true;
  @Input() row: any;
  @Output() newEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  addNew(value:boolean){
    this.newEvent.emit(this.dis);
  }
  gencollapse() {
    console.log(this.showgeninf);
    if (this.showgeninf == true) {
      this.showgeninf = false;
      return;
    }
    this.showgeninf = true;
  }
  usercollapse() {
    console.log(this.showgeninf);
    if (this.showuserinf == true) {
      this.showuserinf = false;
      return;
    }
    this.showuserinf = true;
  } 
  reasoncollapse() {
    if (this.showreasoninf == true) {
      this.showreasoninf = false;
      return;
    }
    this.showreasoninf = true;
  } 
}
