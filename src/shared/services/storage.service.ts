import { Injectable } from '@angular/core';

import { environment }                                                          from '../../environments/environment';

import { Logger, Loader }	from 'mk';

@Injectable()
export class StorageService 
{
	public constructor ( private _logger: Logger )
	{
		this._logger.log('StorageService');
	}

	public get ( name: string ) : any
    {
        return localStorage.getItem(name);
    }
    
    public set ( name: string, item: any ) : void
    {
        localStorage.setItem( name, item );
    }

    public remove (name: string) : void
    {
        localStorage.removeItem(name);
    } 

    public clear () : void
    {
        localStorage.clear();
    }
}