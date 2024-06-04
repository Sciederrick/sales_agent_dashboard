import { TextField } from "@mui/material";
import DialogForm from "./DialogForm";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { API_BASE_URL } from "../constants";
import CollectionStatusDropdown from "./CollectionStatusDropdown";

type Row = {
    [key: string]: any;
};

type TypeProps = {
    activeRow: Row;
    showCollectionStatusForm: boolean;
    onCloseCollectionStatusForm: () => void;
};

const DialogFormCollectionStatus = ({
    activeRow,
    showCollectionStatusForm,
    onCloseCollectionStatusForm,
}: TypeProps) => {
    const ctx = useContext(AppContext);

    const [newStatus, setNewStatus] = useState<string>();
    const updateCollection = async (collectionId: number, updatedCollection: Row) => {
        const endpoint = `${API_BASE_URL}/collections/${collectionId}`;

        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCollection),
            });

            if (!response.ok) {
                throw new Error("Failed to update invoice");
            }

            const data = await response.json();
            ctx?.onNotif(
                `Collection ${data["collection_number"]} updated successfully`
            );
        } catch (error) {
            ctx?.onNotif(
                `Update collection operation failed with the following error: ${error}`
            );
        }
    };

    const handleSubmitForm = () => {
        const validCollection = { ...activeRow };
        delete validCollection.invoice_number;
        const updatedCollection = {
            ...validCollection,
            status: newStatus
        };
        updateCollection(activeRow["id"], updatedCollection);
        // TODO: update corresponding invoice
    };
    const statuses = ["Valid", "Bounced", "Pending"];

    const handleStatusChange = (newStatus: string) => {
        setNewStatus(newStatus);
    };
    return (
        <DialogForm
            open={showCollectionStatusForm}
            onClose={onCloseCollectionStatusForm}
            onFormSubmit={handleSubmitForm}
            title="Update Collection Status"
            desc="Mark collection as valid or bounced & update corresponding invoice"
            btnText="Change Status"
        >
            <TextField
                disabled
                id="collection_number"
                name="collection_number"
                label="collection_number"
                defaultValue={activeRow["collection_number"]}
                fullWidth
            />
            <TextField
                disabled
                type="number"
                id="amount"
                name="amount"
                label="amount"
                defaultValue={activeRow["amount"]}
                fullWidth
            />
            <TextField
                disabled
                id="status"
                name="status"
                label="current_status"
                defaultValue={activeRow["status"]}
                fullWidth
            />
            <CollectionStatusDropdown
                initialStatus="Valid"
                statuses={statuses}
                onStatusChange={handleStatusChange}
            />
        </DialogForm>
    );
};

export default DialogFormCollectionStatus;
