import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

export interface UserInterface extends ModelInterface
{
    oauth_user_id: number|string,
    oauth_user_first_name: string,
    oauth_user_last_name: string,
    oauth_user_avatar: string,
    oauth_user_zipcode: string,
    oauth_user_dni: string,
    oauth_user_email: string,
    oauth_user_country_id: string|number,
    oauth_user_country: string,
    oauth_user_address: string,
    oauth_user_action: string,
    oauth_user_phone: string,
    oauth_user_phones: Array<string>,
    oauth_user_rol: string,
    oauth_user_username: string,
    oauth_user_updated_at: string,
    oauth_user_created_at: string,
    oauth_user_created_by: number|string,
    oauth_user_updated_by: number|string,
    oauth_user_deleted_at: string,
    oauth_user_details: Array<any>,
    token: string
}

export class User extends Model
{
    public static readonly _model_type: string = 'User';

    public constructor ( m: UserInterface )
    {
        let inter: UserInterface = m ? m : <UserInterface>{ token: "", oauth_user_id: "", oauth_user_first_name: "", oauth_user_last_name: "", oauth_user_avatar: "", oauth_user_zipcode: "", oauth_user_dni: "", oauth_user_email: "", oauth_user_country_id: "", oauth_user_country: "", oauth_user_address: "", oauth_user_action: "", oauth_user_phone: "", oauth_user_phones: [], oauth_user_rol: "", oauth_user_username: "", oauth_user_updated_at: "", oauth_user_created_at: "", oauth_user_created_by: "", oauth_user_updated_by: "", oauth_user_deleted_at: "", oauth_user_details: [] }
        let details: Array<any> = new Array();
        let aux: any;

        // Array en la que almacenar las keys de user_details que son de un select tipo múltiple
        let user_details_multiple_value: Array<string> = new Array();
        let aux_multiple: Array<string> = new Array();

        inter.oauth_user_details = inter.oauth_user_details ? inter.oauth_user_details : new Array();

        // Rellenamos la array de control con los nombres de las keys repetidas en el listado de details de usuario
        inter.oauth_user_details.map( (det:any) =>
        {
            if ( aux_multiple.indexOf(det.user_details_key) < 0 ) 
            {
                aux_multiple.push(det.user_details_key)
            }
            else
            {
                user_details_multiple_value.push(det.user_details_key);
            }
        });

        inter.oauth_user_details.map( (det:any) =>
        {
            aux = {};
            aux[det.user_details_key] = det.user_details_value;
            details.push(aux);

            // Chapuzilla para adptar la estructura que nos pasa Albert a la que ha de tener el model 
            // paa que la actualización de datos en el MkForm sea corecta.
            if ( user_details_multiple_value.indexOf(det.user_details_key) < 0 && det.user_details_key != 'especialization' && det.user_details_key != 'college' )
            {
                inter['user_details_' + det.user_details_key] = det.user_details_value;
            }
            else
            {
                if ( !Array.isArray(inter['user_details_' + det.user_details_key]) ) 
                {
                    inter['user_details_' + det.user_details_key] = new Array();
                }
                inter['user_details_' + det.user_details_key].push(det.user_details_value);
            }

        });

        inter.oauth_user_details = details;

        super(inter);
    }

    public get type () { return User }
}
