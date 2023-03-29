import { Client } from "../interfaces/entities";

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
    client: Client;
    registered_date: Date;
    is_active: boolean;
}
