import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface CollectionStatusDropdownProps {
    initialStatus: string;
    statuses: string[];
    onStatusChange: (status: string) => void;
}

const CollectionStatusDropdown: React.FC<CollectionStatusDropdownProps> = ({
    initialStatus,
    statuses,
    onStatusChange,
}) => {
    const [status, setStatus] = useState(initialStatus);

    const handleChange = (event: any) => {
        const newStatus = event.target.value as string;
        setStatus(newStatus);
        onStatusChange(newStatus);
    };

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="collection-status-label">Status</InputLabel>
            <Select
                labelId="collection-status-label"
                value={status}
                onChange={handleChange}
                label="new_status"
            >
                {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CollectionStatusDropdown;
