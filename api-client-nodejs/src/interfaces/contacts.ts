import { IClientCreateResponse } from "./clients";
import { Client } from "./../entities/Client";

export interface IContactCreateRequest {
    name: string;
    email: string;
    phone: string;
}

export interface IContactUpdateRequest {
    name?: string;
    email?: string;
    phone?: string;
    is_active?: boolean;
}

export interface IContactCreateResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    client: IClientCreateResponse;
    registered_date: Date;
    is_active: boolean;
}
