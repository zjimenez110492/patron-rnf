import { descripcionRnf } from './../../../../models/descripcionRnf.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-rnf',
  templateUrl: './view-rnf.component.html',
  styleUrls: ['./view-rnf.component.scss']
})
export class ViewRnfComponent implements OnInit {
  descripcionesRNF:descripcionRnf[];
  constructor(public dialogRef: MatDialogRef<ViewRnfComponent>) {
    this.descripcionesRNF=[];
  }

  ngOnInit(): void {

  }

}
