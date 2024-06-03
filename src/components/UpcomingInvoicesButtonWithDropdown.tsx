import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdArrowDropDown } from "react-icons/md";
// import { useNavigate } from "react-router-dom";


const DropdownButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    // const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // navigate("/")
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGoToInvoices = () => {
        // navigate("/")
        handleClose();
    };
    
    const handleGoToCollections = () => {
        // navigate("/");
        handleClose();  
    };

    return (
        <div className="flex gap-16">
            <Button
                id="btn-details"
                variant="contained"
                size="small"
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
                <MenuItem
                    onClick={handleGoToInvoices}
                >
                    View School Invoices
                </MenuItem>
                <MenuItem
                    onClick={handleGoToCollections}
                >
                    View School Collections
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DropdownButton;
