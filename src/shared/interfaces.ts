export interface ITimestampedRecord {
    created_at: string;
    updated_at: string;
}

export interface IDRecord {
    id: number;
}

export interface IContact extends IDRecord, ITimestampedRecord {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface IEvent extends IDRecord, ITimestampedRecord {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
}