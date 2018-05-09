import { Model }                from 'mk';
import { ModelInterface }       from 'mk';

export interface UserInterface extends ModelInterface
{
    user_id: number|string,
    user_first_name: string,
    user_last_name: string,
    user_prefix: string,
    user_telefono: string,
    user_password: string,
    user_job: string,
    user_especialization: Array<string>,
    user_college: Array<string>
}

export class User extends Model
{
    public static readonly _model_type: string = 'User';

    public constructor ( m: UserInterface )
    {
        let inter: UserInterface = m ? m : <UserInterface>{ "user_id": "", "user_first_name": "", "user_last_name": "", "user_prefix": "", "user_telefono": "", "user_password": "", "user_job": "", "user_especialization": new Array(), "user_college": new Array() }
        super(inter);
    }

    public get type () { return User }
}