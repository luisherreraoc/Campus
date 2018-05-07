import { Component }                         							from '@angular/core';

import { Logger }														from 'mk';
			

@Component({
	selector: 'certificate',
	templateUrl: './certificate.component.html',
	styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent
{

	public constructor ( private logger: Logger ) { logger.log('CERTIFICATE COMPONENT'); }

	public ngOnInit () : void
	{

	}
}