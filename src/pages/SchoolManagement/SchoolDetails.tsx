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
import DialogFormCollectionStatus from "../../components/DialogFormCollectionStatus";

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
    UpdateInvoiceStatus = "UpdateInvoiceStatus",
}

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

interface TypeCollection {
    id: number;
    invoice_id: number;
    school_id: number;
    collection_number: string;
    collection_date: string;
    amount: number;
    status: string;
    payment_method: string;
}

interface TypeUICollection extends TypeCollection {
    invoice_number?: string;
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

    const columnsInvoice: Column[] = [
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

    const columnsCollection: Column[] = [
        { id: "collection_number", label: "Collection Number", minWidth: 170 },
        { id: "invoice_number", label: "Invoice Number", minWidth: 170 },
        {
            id: "amount",
            label: "Amount",
            minWidth: 170,
        },
        {
            id: "status",
            label: "Status",
            minWidth: 150,
        },
        {
            id: "payment_method",
            label: "Payment Method",
            minWidth: 120,
        },
        {
            id: "collection_date",
            label: "Collection Date",
            minWidth: 120,
        },
        {
            id: "actions-update-status",
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
                `Loading invoices for school with ${id} failed with error: ${error}`
            );
        }
    };

    const ascInvoices = useMemo(() => {
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

    const [showCollectionStatusForm, setShowCollectionStatusForm] =
        useState(false);

    const handleCloseCollectionStatusForm = () => {
        setShowCollectionStatusForm(false);
    };

    const [activeRow, setActiveRow] = useState<Row>();

    const handleActionClick = (type: TypeActions, row: Row) => {
        setActiveRow(row);
        if (type === TypeActions.Collect) {
            setShowCollectionForm(!showCollectionForm);
        } else if (type === TypeActions.UpdateInvoiceStatus) {
            setShowCollectionStatusForm(!showCollectionStatusForm);
        }
    };

    const [collections, setCollections] = useState<Row[]>([]);

    const descCollections = useMemo(() => {
        const sorted = [...collections].sort((a, b) => {
            const dateA = new Date(a.due_date);
            const dateB = new Date(b.due_date);
            return dateB.getTime() - dateA.getTime();
        });
        return sorted;
    }, [collections]);

    const fetchCollections = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/collections?school_id=${id}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            let collections = await response.json();
            if (invoices.length > 0) {
                collections = addInvoiceNumbersToCollections(
                    collections,
                    invoices as TypeInvoice[]
                );
            } else {
                fetchInvoices();
                collections = addInvoiceNumbersToCollections(
                    collections,
                    invoices as TypeInvoice[]
                );
            }
            setCollections(collections);
        } catch (error) {
            ctx?.onNotif(
                `Loading collections for school with ${id} failed with error: ${error}`
            );
        }
    };

    const addInvoiceNumbersToCollections = (
        collections: TypeCollection[],
        invoices: TypeInvoice[]
    ): TypeUICollection[] => {
        return collections.map((collection) => {
            const invoice = invoices.find(
                (inv) => inv.id === collection.invoice_id
            );
            return {
                ...collection,
                invoice_number: invoice ? invoice.invoice_number : undefined,
            };
        });
    };

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

    const fetchTabData = () => {
        if (
            (section === "invoices" && invoices.length === 0) ||
            (currTab === 0 && invoices.length === 0)
        ) {
            fetchInvoices();
        } else if (
            (section === "collections" && collections.length === 0) ||
            (currTab === 1 && collections.length === 0)
        ) {
            fetchCollections();
        }
    };

    const switchToSectionTab = () => {
        setCurrTab(section === "invoices" ? 0 : 1);
    };

    useEffect(() => {
        fetchTabData();
        fetchSchool();
    }, [currTab]);

    useEffect(() => {
        switchToSectionTab();
    }, []);

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
                                    columns={columnsInvoice}
                                    rows={ascInvoices ?? []}
                                    onActionClick={handleActionClick}
                                />
                            )}
                            {currTab === 1 && (
                                <DataTable
                                    columns={columnsCollection}
                                    rows={descCollections ?? []}
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
                {activeRow && (
                    <DialogFormCollectionStatus
                        activeRow={activeRow}
                        showCollectionStatusForm={showCollectionStatusForm}
                        onCloseCollectionStatusForm={
                            handleCloseCollectionStatusForm
                        }
                    />
                )}
            </main>
        </DashboardLayout>
    );
};

export default SchoolDetails;
