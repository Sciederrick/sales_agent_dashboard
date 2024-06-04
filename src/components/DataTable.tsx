import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
    Button,
    Chip,
} from "@mui/material";
import UpcomingInvoicesBtnWithDropdown from "./UpcomingInvoicesBtnWithDropdown";

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

type Props = {
    columns: Column[];
    rows: Row[];
    onActionClick?: TypeHandleClickAction;
};

enum TypeActions {
    Collect = "Collect",
    SchoolDetails = "SchoolDetails",
    UpdateInvoiceStatus = "UpdateInvoiceStatus",
}

enum Products {
    "Zeraki Analytics" = "Zeraki Analytics",
    "Zeraki Finance" = "Zeraki Finance",
    "Zeraki Timetable" = "Zeraki Timetable",
}

type TypeHandleClickAction = (type: TypeActions, row: Row, section?:string) => void;

const DataTable = ({ columns, rows, onActionClick }: Props) => {
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


    const renderCellContent = (
        column: Column,
        value: string | number,
        onActionClick: TypeHandleClickAction = () => {},
        row: Row
    ) => {
        if (column.id === "actions-collect") {
            return (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onActionClick(TypeActions.Collect, row)}
                >
                    Collect&nbsp;Payment
                </Button>
            );
        } else if (column.id === "status") {
            return (
                <Chip
                    label={value}
                    variant="outlined"
                    size="small"
                    color={value === "Pending" || value === "Bounced" || value === "Partial" ? "default" : "primary"}
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
            return <UpcomingInvoicesBtnWithDropdown onActionClick={(section) => onActionClick(TypeActions.SchoolDetails, row, section)} />;
        } else if (column.id === "actions-update-status") {
            return (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                        onActionClick(TypeActions.UpdateInvoiceStatus, row)
                    }
                >
                    Update&nbsp;status
                </Button>
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
                <TableContainer sx={{ maxHeight: 720, height: 720 }}>
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
                                                            onActionClick,
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
        </>
    );
};

export default DataTable;
