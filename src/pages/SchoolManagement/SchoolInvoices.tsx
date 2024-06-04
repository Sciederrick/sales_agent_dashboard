import { useParams } from "react-router-dom";

const SchoolInvoices = () => {
    const { id } = useParams();
    return (
        <>
            School Invoices: {id}
        </>
    );
};

export default SchoolInvoices;

