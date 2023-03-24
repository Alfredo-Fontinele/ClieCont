import React from "react";

export interface IChildren {
    children: React.ReactNode;
}

export interface IItemMenuOptions {
    name: string;
    href: string;
    onClick?: Function;
}
