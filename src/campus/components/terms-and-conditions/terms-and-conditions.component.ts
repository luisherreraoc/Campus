import { Component }                         	from '@angular/core';
import { Location }								from '@angular/common';

@Component({
	templateUrl: './terms-and-conditions.component.html',
	styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent
{

	public constructor ( private _location : Location ) 
	{ 
		
	}

	private backClick() {
		this._location.back();
	}

}
