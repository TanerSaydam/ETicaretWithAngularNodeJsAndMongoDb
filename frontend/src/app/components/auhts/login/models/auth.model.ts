import { UserModel } from "src/app/components/users/models/user.model";

export class AuthModel{
    token: string = "";
    user: UserModel = new UserModel();
}
