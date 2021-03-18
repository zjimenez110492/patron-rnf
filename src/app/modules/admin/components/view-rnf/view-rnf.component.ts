import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-rnf',
  templateUrl: './view-rnf.component.html',
  styleUrls: ['./view-rnf.component.scss']
})
export class ViewRnfComponent implements OnInit {
  nombresRNF:string[];
  constructor(public dialogRef: MatDialogRef<ViewRnfComponent>) {
    this.nombresRNF=[];
  }

  ngOnInit(): void {
  }

}
