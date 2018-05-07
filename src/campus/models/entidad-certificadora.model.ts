import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

export interface EntidadCertificadoraInterface extends ModelInterface
{
    entidad_certificadora_id: number|string,
    entidad_certificadora_nombre: string,
    entidad_certificadora_descripcion: string
}

export class EntidadCertificadora extends Model
{
    public static readonly _model_type: string = 'EntidadCertificadora';

    public constructor ( m: EntidadCertificadoraInterface )
    {
        let inter: EntidadCertificadoraInterface = m ? m : <EntidadCertificadoraInterface>{ "entidad_certificadora_id": "","entidad_certificadora_nombre": "","entidad_certificadora_descripcion": "" };
        super(inter);
    }

    public get type () { return EntidadCertificadora }
}



