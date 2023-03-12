export class UserModel{
    _id: string = "";
    name: string = "";
    email: string = "";
    userName: string = "";
    password: string = "";
    createdDate: string = "";
    updatedDate: string = "";
    isAdmin: boolean = false;
    isMailConfirm: boolean = false;
    forgotPasswordCode: string = "";
    isForgotPasswordCodeActive: boolean = false;
}