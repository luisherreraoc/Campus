import { Component }                         							from '@angular/core';

import { Logger }														from 'mk';
			

@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent
{
	private _certificates: Array<any>;

	public constructor ( private logger: Logger ) { logger.log('CERTIFICATES COMPONENT'); }

	public ngOnInit () : void
	{
		this._certificates = [1,2,2];
	}
}