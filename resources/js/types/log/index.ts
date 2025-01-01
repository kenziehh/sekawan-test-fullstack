import { User } from "..";

export interface Log {
    action: string;
    created_at: string;
    description: string;
    id: string;
    updated_at: string;
    user?: User;
}
