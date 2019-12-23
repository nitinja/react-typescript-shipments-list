 /* Shipment types */

export interface Shipment {
    id:          string;
    name:        string;
    cargo:       Cargo[];
    mode:        string;
    type:        string;
    destination: string;
    origin:      string;
    services:    Service[];
    total:       string;
    status:      string;
    userId:      string;
}

export interface Cargo {
    type:        string;
    description: string;
    volume:      string;
}

export interface Service {
    type: string;
}