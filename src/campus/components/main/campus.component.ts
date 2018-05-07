import { Component }                         							from '@angular/core';

import { Logger }														from 'mk';
			

@Component({
	templateUrl: './campus.component.html',
	styleUrls: ['./campus.component.scss']
})
export class CampusComponent
{
	public constructor ( private logger: Logger ) { logger.log('CAMPUS COMPONENT'); }

	public ngOnInit () : void
	{
		
	}
}