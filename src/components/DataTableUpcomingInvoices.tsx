import { useContext, useEffect, useMemo, useState } from "react";
import DataTable from "./DataTable";
import { API_BASE_URL } from "../constants";
import { AppContext } from "../contexts/AppContext";
import DialogFormCollect from "./DialogFormCollect";

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
};

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
};

type TypeUpcomingInvoices = {
    id: number;
    invoice_number: string;
    school_name: string;
    balance: number;
    due_date: string;
    status: string;
};

enum TypeActions {
    Collect = "Collect",
    SchoolDetails = "SchoolDetails",
    UpdateInvoiceStatus = "UpdateInvoiceStatus"
}

const UpcomingInvoices = () => {
    const ctx = useContext(AppContext);
    const columns: Column[] = [
        { id: "invoice_number", label: "Invoice Number", minWidth: 170 },
        { id: "school_name", label: "School Name", minWidth: 100 },
        {
            id: "balance",
            label: "Amount Due",
            minWidth: 170,
        },
        {
            id: "due_date",
            label: "Due Date",
            minWidth: 170,
        },
        {
            id: "status",
            label: "Status",
            minWidth: 170,
        },
        {
            id: "actions-collect",
            label: "Actions",
            minWidth: 170,
        },
    ];

    const [rows, setRows] = useState<Row[]>([]);

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
            ...invoice,
            school_name: invoiceMap.get(invoice.school_id)!,
        }));
    };

    const ascUpcomingInvoices = useMemo(() => {
        // Sort the data based on collection_date
        const sorted = [...rows].sort((a, b) => {
            const dateA = new Date(a.due_date);
            const dateB = new Date(b.due_date);
            return dateA.getTime() - dateB.getTime();
        });
        return sorted;
    }, [rows]);

    const [showCollectionForm, setShowCollectionForm] = useState(false);

    const handleToggleCollectionForm = () => {
        setShowCollectionForm(!showCollectionForm);
    };

    const handleCloseCollectionForm = () => {
        setShowCollectionForm(false);
    };

    const [activeRow, setActiveRow] = useState<Row>({});

    const handleActionClick = (type: TypeActions, row: Row) => {
        setActiveRow(row);
        if (type === TypeActions.Collect) {
            handleToggleCollectionForm();
        }
    };

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

                response = await fetch(`${API_BASE_URL}/schools`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const schools = await response.json();
                upcomingInvoices = replaceSchoolIdWithSchoolName(
                    upcomingInvoices,
                    schools
                );

                setRows(upcomingInvoices);
            } catch (error) {
                ctx?.onNotif(`Loading collections failed with error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <DataTable
                columns={columns}
                rows={ascUpcomingInvoices ?? []}
                onActionClick={handleActionClick}
            />
            <DialogFormCollect activeRow={activeRow} showCollectionForm={showCollectionForm} onCloseCollectionForm={handleCloseCollectionForm}/>
        </>
    );
};

export default UpcomingInvoices;
