export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    registered_date: Date;
    is_active: boolean;
    contacts: [];
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    client: Client;
    registered_date: Date;
    is_active: boolean;
}
