import { Component }                         							from '@angular/core';

import { Logger }														from 'mk';
			

@Component({
	selector: 'certificate-card',
	templateUrl: './certificate-card.component.html',
	styleUrls: ['./certificate-card.component.scss']
})
export class CertificateCardComponent
{

	public constructor ( private logger: Logger ) { logger.log('CERTIFICATE CARD COMPONENT'); }

	public ngOnInit () : void
	{

	}
}