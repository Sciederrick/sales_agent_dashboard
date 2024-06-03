import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import DialogForm from "./DialogForm";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { API_BASE_URL } from "../constants";

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

type TypeProps = {
    activeRow: Row,
    showCollectionForm: boolean;
    onCloseCollectionForm: () => void;

}

const DialogFormUpcomingInvoices = ({
    activeRow,
    showCollectionForm,
    onCloseCollectionForm,
}: TypeProps) => {
    const ctx = useContext(AppContext);
    const [isCollectRemainingAmount, setIsCollectRemainingAmount] =
        useState(true);
    const [amountToCollect, setAmountToCollect] = useState<number>(0);
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
    const generateCollectionString = () => {
        const prefix = "COL-";
        const randomPart = Math.random().toString(36).substr(2, 10); // Generate a random alphanumeric string
        const uniquePart = Date.now().toString(36); // Add timestamp to ensure uniqueness

        return `${prefix}${randomPart}${uniquePart}`;
    };
    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month index starts from 0
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
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

    const handleSetAmountToCollect = (e: any) => {
        setAmountToCollect(e.target);
    };
    const handleToggleCollectRemainingAmount = () => {
        if (isCollectRemainingAmount) setAmountToCollect(activeRow["balance"]);
        setIsCollectRemainingAmount(!isCollectRemainingAmount);
    };
    const handleSubmitForm = () => {
        const validInvoice = { ...activeRow };
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
    return (
        <DialogForm
            open={showCollectionForm}
            onClose={onCloseCollectionForm}
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
    );
};

export default DialogFormUpcomingInvoices;
