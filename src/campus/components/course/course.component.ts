import { Component, Input }                         							from '@angular/core';

import { Logger }														from 'mk';
			

@Component({
	selector: 'course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.scss']
})
export class CourseComponent
{
	@Input('course') set course ( c: any )
	{
		this._title = c.title;
		this._img = c.img;
		this._redirect = c.redirect;
	}

	private _title: string;
	private _img: string;
	private _redirect: string;

	public constructor ( private logger: Logger ) { logger.log('COURSE COMPONENT'); }

	public ngOnInit () : void
	{
		
	}
}