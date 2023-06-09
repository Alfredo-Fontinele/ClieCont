import { Contact } from "../entities/Contact";

export interface IClientCreateRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface IClientCreateResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    registered_date: Date;
    is_active: boolean;
    contacts: [];
}

export interface IClientUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
    phone?: number;
    is_active?: boolean;
}

export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}
