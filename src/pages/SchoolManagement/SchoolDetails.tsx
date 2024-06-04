import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Header from "../../components/TheHeader";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { API_BASE_URL } from "../../constants";
import { Box, Chip, Tab, Tabs } from "@mui/material";
import DataTable from "../../components/DataTable";

import {
    MdOutlineLocationOn,
    MdOutlineMail,
    MdOutlineCall,
} from "react-icons/md";
import DialogFormCollect from "../../components/DialogFormCollect";

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
}

const SchoolDetails = () => {
    const { id, section } = useParams();
    const ctx = useContext(AppContext);

    const handleClickToggleNav = () => {
        ctx?.onToggleMobileNav();
    };

    const handleClickToggleProfileSideBar = () => {
        ctx?.onToggleProfileSideBar();
    };

    const [school, setSchool] = useState<TypeSchool>();

    const [currTab, setCurrTab] = useState(0);

    const handleChangeCurrTab = (
        _event: React.SyntheticEvent,
        newValue: number
    ) => {
        setCurrTab(newValue);
    };

    const columns: Column[] = [
        { id: "invoice_number", label: "Invoice Number", minWidth: 170 },
        { id: "item", label: "Item", minWidth: 170 },
        { id: "creation_date", label: "Creation Date", minWidth: 170 },
        {
            id: "due_date",
            label: "Due Date",
            minWidth: 120,
        },
        {
            id: "amount",
            label: "Amount",
            minWidth: 170,
        },
        {
            id: "paid_amount",
            label: "Paid Amount",
            minWidth: 170,
        },
        {
            id: "balance",
            label: "Balance",
            minWidth: 170,
        },
        {
            id: "status",
            label: "Status",
            minWidth: 150,
        },
        {
            id: "days_until_due",
            label: "Days `til Due",
            minWidth: 120,
        },
        {
            id: "actions-collect",
            label: "Actions",
            minWidth: 170,
        },
    ];

    const [invoices, setInvoices] = useState<Row[]>([]);

    const fetchInvoices = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/invoices?school_id=${id}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const invoices = await response.json();
            setInvoices(invoices);
        } catch (error) {
            ctx?.onNotif(
                `Loading the school with ${id} failed with error: ${error}`
            );
        }
    };

    const ascUpcomingInvoices = useMemo(() => {
        const sorted = [...invoices].sort((a, b) => {
            const dateA = new Date(a.due_date);
            const dateB = new Date(b.due_date);
            return dateA.getTime() - dateB.getTime();
        });
        return sorted;
    }, [invoices]);

    const [showCollectionForm, setShowCollectionForm] = useState(false);

    const handleCloseCollectionForm = () => {
        setShowCollectionForm(false);
    };

    const [activeRow, setActiveRow] = useState<Row>();

    const handleActionClick = (_type: TypeActions, row: Row) => {
        setActiveRow(row);
    };

    useEffect(() => {
        const fetchSchool = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/schools/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const school = await response.json();
                setSchool(school);
            } catch (error) {
                ctx?.onNotif(
                    `Loading the school with ${id} failed with error: ${error}`
                );
            }
        };

        fetchSchool();

        if (
            (section === "invoices" && invoices.length === 0) ||
            (currTab === 1 && invoices.length === 0)
        )
            fetchInvoices();
    }, [currTab]);

    return (
        <DashboardLayout>
            <Header
                title="School Management"
                description="Organization, viewing, and manipulation of school-related data"
                onToggleProfileSidebar={handleClickToggleProfileSideBar}
                onToggleNav={handleClickToggleNav}
            />
            <main className="pb-32 pt-4 lg:pt-8">
                <div className="px-8 flex flex-col gap-4 lg:py-4 lg:px-12">
                    <header className="pl-2">
                        <h1 className="pb-1 text-gray-600">
                            {school?.name ?? ""}
                        </h1>
                        <p className="text-xs text-gray-600 pb-2">{`Joined ${school?.registration_date}`}</p>
                        <div className="md:flex">
                            <ul className="text-xs text-gray-600 pb-2 md:border-r md:border-gray-200 md:pr-4">
                                <li className="flex items-center pb-1">
                                    <MdOutlineLocationOn />
                                    &nbsp; {school?.county}
                                    &nbsp;County
                                </li>
                                <li className="flex items-center pb-1">
                                    <MdOutlineMail />
                                    &nbsp; {school?.contact_email}
                                </li>
                                <li className="flex items-center">
                                    <MdOutlineCall />
                                    &nbsp; {school?.contact_phone}
                                </li>
                            </ul>
                            <ul className="text-xs text-gray-600 md:px-4">
                                <li className="flex items-center pb-1">
                                    Products:&nbsp;
                                    {school?.products
                                        .split(",")
                                        .map((product) => {
                                            return (
                                                <Chip
                                                    key={product.trim()}
                                                    sx={{
                                                        fontSize: "11px",
                                                        margin: "2px",
                                                    }}
                                                    label={product.trim()}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            );
                                        })}
                                </li>
                                <li className="flex items-center">
                                    Balance: KES&nbsp;{school?.balance}
                                </li>
                            </ul>
                        </div>
                    </header>
                    <div>
                        <Box
                            sx={{
                                maxWidth: { xs: 320, sm: 480 },
                                bgcolor: "background.transparent",
                            }}
                        >
                            <Tabs
                                value={currTab}
                                onChange={handleChangeCurrTab}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="scrollable force tabs example"
                            >
                                <Tab label="Invoices" />
                                <Tab label="Collections" />
                            </Tabs>
                        </Box>
                        <div className="container">
                            {currTab === 0 && (
                                <DataTable
                                    columns={columns}
                                    rows={ascUpcomingInvoices ?? []}
                                />
                            )}
                            {currTab === 1 && (
                                <DataTable
                                    columns={columns}
                                    rows={ascUpcomingInvoices ?? []}
                                    onActionClick={handleActionClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {activeRow && (
                    <DialogFormCollect
                        activeRow={activeRow}
                        showCollectionForm={showCollectionForm}
                        onCloseCollectionForm={handleCloseCollectionForm}
                    />
                )}
            </main>
        </DashboardLayout>
    );
};

export default SchoolDetails;
