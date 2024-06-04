import { useContext, useEffect, useState } from "react";
import DataTable from "./DataTable";
import { API_BASE_URL } from "../constants";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

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

enum TypeActions {
    Collect = "Collect",
    SchoolDetails = "SchoolDetails",
    UpdateInvoiceStatus = "UpdateInvoiceStatus",
}

const SchoolList = () => {
    const ctx = useContext(AppContext);
    const columns: Column[] = [
        { id: "name", label: "School", minWidth: 170 },
        { id: "type", label: "Type", minWidth: 100 },
        {
            id: "products",
            label: "Products",
            minWidth: 240,
        },
        {
            id: "county",
            label: "County",
            minWidth: 170,
        },
        {
            id: "registration_date",
            label: "Reg. Date",
            minWidth: 120,
        },
        {
            id: "contact_email",
            label: "Contact",
            minWidth: 170,
        },
        {
            id: "balance",
            label: "Balance",
            minWidth: 170,
        },
        {
            id: "actions-school-details",
            label: "Actions",
            minWidth: 170,
        },
    ];

    const [rows, setRows] = useState<Row[]>([]);

    const navigate = useNavigate();
    const handleActionClick = (type: TypeActions, row: Row, section:string|undefined) => {
        if (type === TypeActions.SchoolDetails) {
            ctx?.onSetActiveSchool(row.id);
            navigate(`/schools/${row.id}/${section}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/schools`);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const schools = await response.json();
                setRows(schools);
            } catch (error) {
                ctx?.onNotif(`Loading collections failed with error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <DataTable
            columns={columns}
            rows={rows ?? []}
            onActionClick={handleActionClick}
        />
    );
};

export default SchoolList;
