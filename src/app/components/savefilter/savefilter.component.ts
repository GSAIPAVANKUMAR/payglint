import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BackendApiService } from 'src/app/services/backend-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-savefilter',
  templateUrl: './savefilter.component.html',
  styleUrls: ['./savefilter.component.scss']
})
export class SavefilterComponent implements OnInit {
  access:any = "private";
  title:any = "Only you";
  show:boolean = true;
  selectedOption:any;
  selectplaceholder = "private"
  filterData:any;
  
  user = this.authenticationService.userValue;
  
  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
  private _mdr: MatDialogRef<SavefilterComponent>,
  private api: BackendApiService,
  private authenticationService: AuthenticationService,
  private notify: NotificationService,
 
  ) { }
  
  ngOnInit(): void {
	   // will log the entire data object
	  console.log("Filter Data ====>" + JSON.stringify(this.data));
	  //console.log("======>" +this.data.filters.checkpoint.values[0]);
  }
  
  CloseDialog() {
    this._mdr.close(false);
  }
  
  selectedValue(val: any) {
    //console.log(this.selectedOption);
    this.show = !this.show;
    this.access = val;
    this.selectplaceholder=""
  }
  
  setSelectedValue(val: any) {
	  this.selectplaceholder= val;
	  this.access = val;
	  if(val=='public') this.title="Everyone";
	  else this.title="Only you";
  }
  
  //This method to save the filter data into storage unit.
  saveFilters() {
	  
	//Get the filter data inputs
	const filterName = (<HTMLInputElement>document.getElementById("text-name"))?.value;
	
	//Construct API request payload.
	this.filterData = {
			"filter_data": {
				"checkpoint": (this.data.filters)?(this.data.filters.checkpoint)?.values[0]:"",
				"deviceid": (this.data.filters)?(this.data.filters.deviceId)?.values[0]:"",
				"end_date": (this.data.ranges)? this.data.ranges.bigEquals : "",
				"filter_name": filterName,
				"requestid": (this.data.filters)?(this.data.filters.requestId)?.values[0]:"",
				"sessionid": (this.data.filters)?(this.data.filters.sessionId)?.values[0]:"",
				"severity": (this.data.filters)?(this.data.filters.severity)?.values[0]:"",
				"start_date": (this.data.smallEquals)? this.data.ranges.smallEquals : "", 
				"status": (this.data.filters)?(this.data.filters.status)?.values[0]:"",
				"userid": (this.data.filters)?(this.data.filters.userId)?.values[0]:""
		  },
		  "filter_type": this.selectplaceholder
	};
	
	//Make API call to save the filter data.
	this.api.saveFilterData(this.filterData, this.user?.token)
      .subscribe(
        data => {
			if (data) {
				this.CloseDialog();
				this.notify.info("Filter saved.");
			} else {
				this.notify.info("Unable to save the filter , please try again!");
			}
        },
        error => {
          this.notify.error(error);
          console.log(error);
        }
      );
	
  }
}
