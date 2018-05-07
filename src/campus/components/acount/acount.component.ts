import { Component }                         							from '@angular/core';

import { Logger }														from 'mk';
			

@Component({
	templateUrl: './acount.component.html',
	styleUrls: ['./acount.component.scss']
})
export class AcountComponent
{
	public constructor ( private logger: Logger ) { logger.log('ACOUNT COMPONENT'); }

	onl1 = ['user_first_name'];
	onl2 = ['user_first_name','user_password'];

	public ngOnInit () : void
	{
		
	}
}