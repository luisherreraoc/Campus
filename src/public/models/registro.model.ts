import { Model }                from 'mk';
import { ModelInterface }       from 'mk';


export interface RegistroInterface extends ModelInterface
{
    // -- Informacion sobre el contrato -------------------------
    resgistro_id?: number | string;
    registro_first_name: string;
    registro_email: string;
    registro_password: string;
    registro_job: string;
    registro_especialization: Array<any>;
    registro_accepted_terms: boolean;
    registro_collage: Array<any>;
}

export class Registro extends Model
{
    public static readonly _model_type: string = 'Registro';

    public constructor ( m: RegistroInterface )
    {
        let inter: RegistroInterface = m ? m : <RegistroInterface>{ "resgistro_id": "", "registro_first_name": "", "registro_email": "", "registro_password": "", "registro_job": "", "registro_especialization": [], "registro_collage": [], "registro_accepted_terms": false }
        super(inter);
    }

    public get type () { return Registro }
}