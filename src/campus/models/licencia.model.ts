import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

export interface LicenciaInterface extends ModelInterface
{
    licencia_id: number|string,
    licencia_codigo: string,
    licencia_identidad_id: string,
    licencia_estado: string
}

export class Licencia extends Model
{
    public static readonly _model_type: string = 'Licencia';

    public constructor ( m: LicenciaInterface )
    {
        let inter: LicenciaInterface = m ? m : <LicenciaInterface>{ "licencia_id": "", "licencia_codigo": "", "licencia_identidad_id": "", "licencia_estado": "" };
        super(inter);
    }

    public get type () { return Licencia }
}