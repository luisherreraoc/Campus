import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'form-error-dialog',
    templateUrl: 'form-error-dialog.component.html'
})
export class FormErrorDialog 
{

    constructor( 
        public dialogRef: MatDialogRef<FormErrorDialog>, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any,
    ) 
    {
        this.dialogRef.disableClose = true;
    }

    private close () : void
    {
        this.dialogRef.close();
    }

}