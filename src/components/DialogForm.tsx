import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery, useTheme } from "@mui/material";

type TypeProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    desc: string;
    btnText: string;
    children: React.ReactNode;
    onFormSubmit: () => void;
};

const FormDialog = ({
    open,
    onClose,
    title,
    desc,
    btnText: ctaBtnText,
    children,
    onFormSubmit
}: TypeProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onFormSubmit();
        onClose(); 
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
            }}
            fullScreen={fullScreen}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent
                className="-mt-5"
                sx={isDesktop ? { width: "600px" } : {}}
            >
                <DialogContentText>{desc}</DialogContentText>
                <div className="flex flex-col gap-4 py-16">{children}</div>
            </DialogContent>
            <DialogActions className="mb-20 md:mb-32 lg:m-4">
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" type="submit">
                    {ctaBtnText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
