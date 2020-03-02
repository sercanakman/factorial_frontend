export interface ITimestampedRecord {
    created_at: string;
    updated_at: string;
}

export interface IContact extends ITimestampedRecord {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}