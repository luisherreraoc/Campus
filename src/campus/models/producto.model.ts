import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

import { Sello }                from './sello.model';
import { EntidadCertificadora } from './entidad-certificadora.model';
import { Licencia }              from './licencia.model';

export interface ProductoInterface extends ModelInterface
{
    id: number|string,
    name: string,
    description: string,
    url_access: string,
    multimidia: { default_image: string },
    stamp: Sello,
    certifying_entity: EntidadCertificadora,
    licences: Array<Licencia>,
    certificate: any
}

export class Producto extends Model
{
    public static readonly _model_type: string = 'Producto';

    public constructor ( m: ProductoInterface )
    {
        let inter: ProductoInterface = m ? m : <ProductoInterface>{ id: "", name: "", description: "", url_access: "", multimidia: { default_image: "" }, stamp: null, certifying_entity: null, licences: [], certificate: null };
        super(inter);
    }

    public get type () { return Producto }
}
