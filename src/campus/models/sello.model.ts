import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

export interface SelloInterface extends ModelInterface
{
    sello_id: number|string,
    sello_nombre: string,
    sello_imagen: string
}

export class Sello extends Model
{
    public static readonly _model_type: string = 'Sello';

    public constructor ( m: SelloInterface )
    {
        let inter: SelloInterface = m ? m : <SelloInterface>{ "sello_id": "", "sello_nombre": "", "sello_imagen": "" };
        super(inter);
    }

    public get type () { return Sello }
}