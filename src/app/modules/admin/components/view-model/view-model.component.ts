import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss']
})
export class ViewModelComponent implements OnInit {
  imagen:string="";
  constructor(public dialogoReg:MatDialogRef<ViewModelComponent>) { }

  ngOnInit(): void {
  }

}
