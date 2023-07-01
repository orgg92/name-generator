
import { MatSelect } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedYears: any[];
  years: any[];

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  // array is selectedYears
  selectAll(select: MatSelect, values, array) {
    select.value = values;
    array = values;
    console.log(this.selectedYears); // selectedYears is still undefined
  }

  deselectAll(select: MatSelect) {
    this.selectedYears = [];
    select.value = [];
  }

  ngOnInit(){
    this.years = [
      {id: 1, viewValue: "2017"},
      {id: 2, viewValue: "2018"},
      {id: 3, viewValue: "2019"},
      {id: 4, viewValue: "2020"},
      {id: 5, viewValue: "2021"}
    ]
  }
}
