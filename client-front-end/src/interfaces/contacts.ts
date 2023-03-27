import { Client } from "./../../../api-client-nodejs/src/entities/Client";
import { IClientCreateResponse } from "./clients";

export interface IContactCreateRequest {
    name: string;
    email: string;
    phone: string;
}

export interface IContactUpdateRequest {
    name?: string;
    email?: string;
    phone?: string;
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
