import { useContext, useEffect, useState } from "react";
import DataTable from "./DataTable";
import { API_BASE_URL } from "../constants";
import { AppContext } from "../contexts/AppContext";

type Column = {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
};

type Row = {
    [key: string]: any;
};

const UpcomingInvoices = () => {
    const ctx = useContext(AppContext)
    const columns:Column[] = [
        { id: "invoice_number", label: "Invoice Number", minWidth: 170 },
        { id: "school_name", label: "School Name", minWidth: 100 },
        {
            id: "amount_due",
            label: "Amount Due",
            minWidth: 170,
            align: "right",
            // format: (value: number) => value.toLocaleString("en-US"),
        },
        {
            id: "due_date",
            label: "Due Date",
            minWidth: 170,
            align: "right",
            // format: (value: number) => value.toLocaleString("en-US"),
        },
        {
            id: "status",
            label: "Status",
            minWidth: 170,
            align: "right",
            // format: (value: number) => value.toFixed(2),
        },
    ];

    const [rows, setRows] = useState<Row[]>()

    type TypeInvoice = {
        id: number;
        school_id: number;
        invoice_number: string;
        item: string;
        creation_date: string;
        due_date: string;
        amount: number;
        paid_amount: number;
        balance: number;
        status: string;
        days_until_due: number;
    }

    type TypeSchool = {
        id: number;
        name: string;
        type: string;
        county: string;
        registration_date: string;
        contact_name: string;
        contact_email: string;
        contact_phone: string;
        products: string;
        balance: number;
    }

    type TypeUpcomingInvoices = {
        invoice_number: string;
        school_name: string;
        amount_due: number;
        due_date: string;
        status: string;
    };

    const replaceSchoolIdWithSchoolName = (
        invoices: TypeInvoice[],
        schools: TypeSchool[]
    ): TypeUpcomingInvoices[] => {
        const invoiceMap: Map<number, string> = new Map();

        // Create a map of school IDs to school names
        schools.forEach((school) => {
            invoiceMap.set(school.id, school.name);
        });

        // Replace school_id with school name in each invoice
        return invoices.map((invoice) => ({
            "invoice_number":invoice['invoice_number'],
            "school_name": invoiceMap.get(invoice.school_id)!,
            "amount_due": invoice['balance'],
            "due_date": invoice['due_date'],
            "status": invoice['status']
        }));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(
                    `${API_BASE_URL}/invoices?status=Pending&status=Partial`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                let upcomingInvoices = await response.json();

                response = await fetch(
                    `${API_BASE_URL}/schools`
                );
                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok"
                    );
                }     
                const schools = await response.json()           
                upcomingInvoices = replaceSchoolIdWithSchoolName(upcomingInvoices, schools)

                setRows(upcomingInvoices);
            } catch (error) {
                ctx?.onNotif(
                    `Loading collections failed with error: ${error}`
                );
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Upcoming Invoices</h1>
            <DataTable columns={columns} rows={rows??[]} />
        </div>
    );
}

export default UpcomingInvoices;
