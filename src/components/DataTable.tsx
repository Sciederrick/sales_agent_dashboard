import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Checkbox, Chip, FormControlLabel, TextField } from "@mui/material";
import { useContext, useState } from "react";
import DialogForm from "./DialogForm";
import { API_BASE_URL } from "../constants";
import { AppContext } from "../contexts/AppContext";

type Column = {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
};

type TypeCollection = {
    id: number;
    invoice_id: number;
    collection_number: string;
    collection_date: string;
    amount: number;
    status: string;
    payment_method: string;
};

type Row = {
    [key: string]: any;
};

type Props = {
    columns: Column[];
    rows: Row[];
};

enum TypeActions {
    Collect = "Collect",
}

type TypeHandleClickAction = (type: TypeActions, row: Row) => void;

const DataTable = ({ columns, rows }: Props) => {
    const ctx = useContext(AppContext);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [activeRow, setActiveRow] = useState<Row>({});
    const handleActionClick = (type: TypeActions, row: Row) => {
        if (type === TypeActions.Collect) {
            setActiveRow(row);
            handleToggleCollectionForm();
        }
    };

    const [showCollectionForm, setShowCollectionForm] = useState(false);

    const handleToggleCollectionForm = () => {
        setShowCollectionForm(!showCollectionForm);
    };

    const [isCollectRemainingAmount, setIsCollectRemainingAmount] =
        useState(true);
    const [amountToCollect, setAmountToCollect] = useState<number>(0);

    const handleSetAmountToCollect = (e: any) => {
        setAmountToCollect(e.target);
    };

    const handleToggleCollectRemainingAmount = () => {
        if(isCollectRemainingAmount) setAmountToCollect(activeRow['balance']);
        setIsCollectRemainingAmount(!isCollectRemainingAmount);
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month index starts from 0
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const generateCollectionString = () => {
        const prefix = "COL-";
        const randomPart = Math.random().toString(36).substr(2, 10); // Generate a random alphanumeric string
        const uniquePart = Date.now().toString(36); // Add timestamp to ensure uniqueness

        return `${prefix}${randomPart}${uniquePart}`;
    }

    const handleSubmitForm = () => {        
        const validInvoice = {...activeRow}
        delete validInvoice.school_name;
        const updatedInvoice = {
            ...validInvoice,
            balance:
                activeRow["balance"] -
                (isCollectRemainingAmount
                    ? activeRow["balance"]
                    : amountToCollect),
            status:
                activeRow["balance"] -
                    (isCollectRemainingAmount
                        ? activeRow["balance"]
                        : amountToCollect) ===
                0
                    ? "Paid"
                    : "Partial",
            paid_amount:
                activeRow["paid_amount"] +
                (isCollectRemainingAmount
                    ? activeRow["balance"]
                    : amountToCollect),
        };
        updateInvoice(activeRow["id"], updatedInvoice);
        const newCollectionEntry = {
            invoice_id: activeRow["id"] as number,
            collection_number: generateCollectionString(),
            collection_date: getCurrentDate(),
            amount: isCollectRemainingAmount
                ? activeRow["balance"]
                : amountToCollect,
            status: "Valid",
            payment_method: "cash",
        };
        addCollectionEntry(newCollectionEntry);
    };

    const updateInvoice = async (invoiceId: number, updatedInvoice: Row) => {
        const endpoint = `${API_BASE_URL}/invoices/${invoiceId}`;

        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedInvoice),
            });

            if (!response.ok) {
                throw new Error("Failed to update invoice");
            }

            const data = await response.json();
            ctx?.onNotif(
                `Invoice ${data["invoice_number"]} updated successfully`
            );
        } catch (error) {
            ctx?.onNotif(
                `Update invoice operation failed with the following error: ${error}`
            );
        }
    };

    const getNextId = async () => {
        const endpoint = `${API_BASE_URL}/collections`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error("Failed to fetch collections data");
            }

            const data = await response.json();
            const maxId = data.reduce(
                (max: number, entry: { id: number }) =>
                    entry.id > max ? entry.id : max,
                0
            );
            return maxId + 1;
        } catch (error) {
            return null;
        }
    };

    // Usage example
    const addCollectionEntry = async (newEntry: Partial<TypeCollection>) => {
        try {
            const nextId = await getNextId();
            if (nextId !== null) {
                newEntry.id = nextId;
                const endpoint = `${API_BASE_URL}/collections`; // Assuming the endpoint is /collections

                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!response.ok) {
                    throw new Error("Failed to add collection entry");
                }

                const res = await response.json();
                ctx?.onNotif(
                    `New collection entry with id - ${res["id"]} added successfully`
                );
            } else {
                throw new Error("id generation failed");
            }
        } catch (error: any) {
            console.error("Error adding collection entry:", error.message);
        }
    };

    const renderCellContent = (
        column: Column,
        value: string | number,
        handleActionClick: TypeHandleClickAction,
        row: Row
    ) => {
        if (column.id === "actions-collect") {
            return (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleActionClick(TypeActions.Collect, row)}
                >
                    Collect Payment
                </Button>
            );
        } else if (column.id === "status") {
            return (
                <Chip
                    label={value}
                    variant="outlined"
                    size="small"
                    color={value === "Pending" ? "default" : "primary"}
                />
            );
        } else {
            return column.format && typeof value === "number"
                ? column.format(value)
                : value;
        }
    };

    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 3,
                    padding: 2,
                }}
            >
                <TableContainer sx={{ maxHeight: 480, height: 480 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {renderCellContent(
                                                            column,
                                                            value,
                                                            handleActionClick,
                                                            row
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <DialogForm
                open={showCollectionForm}
                onClose={handleToggleCollectionForm}
                onFormSubmit={handleSubmitForm}
                title="Collect Payment"
                desc="Settle outstanding invoices"
                btnText="Collect Payment"
            >
                <TextField
                    disabled
                    id="invoice_number"
                    name="invoice_number"
                    label="invoice number"
                    defaultValue={activeRow["invoice_number"]}
                    fullWidth
                />
                <TextField
                    disabled
                    type="number"
                    id="amount_due"
                    name="amount_due"
                    label="amount due"
                    defaultValue={activeRow["balance"]}
                    fullWidth
                />
                <TextField
                    disabled
                    type="number"
                    id="amount_paid"
                    name="amount_paid"
                    label="amount paid"
                    defaultValue={activeRow["paid_amount"]}
                    fullWidth
                />
                <TextField
                    disabled={isCollectRemainingAmount}
                    type="number"
                    id="collect"
                    name="collect"
                    label="collect"
                    value={
                        isCollectRemainingAmount
                            ? activeRow["balance"]
                            : amountToCollect
                    }
                    inputProps={{
                        max: activeRow["balance"], // Maximum value allowed
                    }}
                    onChange={handleSetAmountToCollect}
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked={isCollectRemainingAmount}
                            onChange={handleToggleCollectRemainingAmount}
                        />
                    }
                    label="collect remaining amount"
                />
            </DialogForm>
        </>
    );
};

export default DataTable;
