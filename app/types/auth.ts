import { User } from "./user";

export interface AuthResponse {
    message?: string;
    user?: User;
    access_token?: string; 
}
