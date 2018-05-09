import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

import { Sello }                from './sello.model';
import { EntidadCertificadora } from './entidad-certificadora.model';
import { Licencia }              from './licencia.model';

export interface ProductoInterface extends ModelInterface
{
    producto_id: number|string,
    producto_nombre: string,
    producto_descripcion: string,
    producto_url_acceso: string,
    producto_informacion_multimedia: { default_image: string },
    producto_sello: Sello,
    producto_entidad_certificadora: EntidadCertificadora,
    producto_licencia: Licencia
}

export class Producto extends Model
{
    public static readonly _model_type: string = 'Producto';

    public constructor ( m: ProductoInterface )
    {
        let inter: ProductoInterface = m ? m : <ProductoInterface>{ "producto_id": "", "producto_nombre": "", "producto_descripcion": "", "producto_url_acceso": "", "producto_informacion_multimedia": { "default_image": "" }, "producto_sello": null, "producto_entidad_certificadora": null, "producto_licencia": null }
        super(inter);
    }

    public get type () { return Producto }
}

