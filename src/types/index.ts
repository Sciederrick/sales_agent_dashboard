export type Column = {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
};

export type Row = {
    [key: string]: any;
};

export type TypeCollection = {
    id: number;
    invoice_id: number;
    collection_number: string;
    collection_date: string;
    amount: number;
    status: string;
    payment_method: string;
};

export type TypeHandleClickAction = (type: TypeActions, row: Row) => void;

export enum TypeActions {
    Collect = "Collect",
    SchoolDetails = "SchoolDetails",
}

export enum Products {
    "Zeraki Analytics" = "Zeraki Analytics",
    "Zeraki Finance" = "Zeraki Finance",
    "Zeraki Timetable" = "Zeraki Timetable",
}
