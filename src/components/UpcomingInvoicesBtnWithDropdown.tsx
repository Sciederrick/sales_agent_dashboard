import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdArrowDropDown } from "react-icons/md";
import { AppContext } from "../contexts/AppContext";

type TypeProps = {
    onActionClick: (section: string) => void;
};

const DropdownButton = ({ onActionClick }: TypeProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const ctx = useContext(AppContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGoToInvoices = () => {
        ctx?.onSetActiveSchoolSection("invoices");
        onActionClick("invoices");
        handleClose();
    };
    
    const handleGoToCollections = () => {
        ctx?.onSetActiveSchoolSection("collections");
        onActionClick("collections");
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
