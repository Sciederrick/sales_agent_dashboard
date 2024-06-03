import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdArrowDropDown } from "react-icons/md";

const DropdownButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                endIcon={<MdArrowDropDown />}
                onClick={handleClick}
            >
                View&nbsp;Details
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>View School Invoices</MenuItem>
                <MenuItem onClick={handleClose}>
                    View School Collections
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DropdownButton;
