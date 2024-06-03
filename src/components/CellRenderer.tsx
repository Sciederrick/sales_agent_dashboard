import React from "react";
import { Button, Chip } from "@mui/material";
import {
    Column,
    Row,
    Products,
    TypeActions,
    TypeHandleClickAction,
} from "../types";
import ButtonWithDropdown from "./UpcomingInvoicesButtonWithDropdown";

type Props = {
    column: Column;
    value: string | number;
    row: Row;
    handleActionClick: TypeHandleClickAction;
};

const CellRenderer = ({ column, value, row, handleActionClick }: Props) => {
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
    } else if (column.id === "products") {
        const productsArr = (value as string).split(",");
        return productsArr.map((product) => {
            product = product.trim();
            return (
                <Chip
                    key={product}
                    className="mb-2 mr-2"
                    label={product}
                    variant="outlined"
                    size="small"
                    color={
                        product === Products["Zeraki Analytics"]
                            ? "primary"
                            : product === Products["Zeraki Finance"]
                            ? "secondary"
                            : "default"
                    }
                />
            );
        });
    } else if (column.id === "actions-school-details") {
        return <ButtonWithDropdown />;
    } else {
        return column.format && typeof value === "number"
            ? column.format(value)
            : value;
    }
};

export default CellRenderer;
