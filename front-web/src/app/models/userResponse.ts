import { Ticket } from './ticket';
export interface UserResponse {
    success: boolean;
    page: number;
    page_size: number;
    total: number;
    users: User[];
}

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    birthday: Date;
    phonenumber: number;
    adress: string;
    isActive: boolean;
    isGain: boolean;
    register_date: Date;
    gains: Ticket[];
}

