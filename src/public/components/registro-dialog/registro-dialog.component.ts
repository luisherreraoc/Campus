import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'registro-dialog',
  templateUrl: './registro-dialog.component.html'
})
export class RegistroDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit() {
  }

}
