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

        inter.oauth_user_details = inter.oauth_user_details ? inter.oauth_user_details : new Array();

        inter.oauth_user_details.map( (det:any) =>
        {
            aux = {};
            aux[det.user_details_key] = det.user_details_value;
            details.push(aux);
        });

        inter.oauth_user_details = details;

        super(inter);
    }

    public get type () { return User }
}
