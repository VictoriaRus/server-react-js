export interface User {
    name: string,
    email: string,
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    dateRegistration: string
    lastLoginDate: string;
    status: string;
    isDelete: boolean;
    isBlock: boolean;
    isCheck: boolean;
}

export interface IData{
    id: number;
    isBlock?: boolean;
    isDelete?: boolean;
}