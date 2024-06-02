import { MdOutlineWallet } from "react-icons/md";
import { useContext, useEffect, useState } from "react";

import Card from "./Card";
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

type TypeInvoice = {
    id: number;
    school_id: number;
    invoice_number: string;
    item: string;
    creation_date: string;
    due_date: string;
    amount: number;
    paid_amount: number;
    balance: number;
    status: string;
    days_until_due: number;
};

type TypeStringNumberObject = {
    [key: string]: number;
};

type TypeProducts = {
    "Zeraki Analytics": null | number;
    "Zeraki Finance": null | number;
    "Zeraki Timetable": null | number;
};


const CardCollections = () => {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const [productCounts, setProductCounts] = useState<TypeProducts>({
        "Zeraki Analytics": null,
        "Zeraki Finance": null,
        "Zeraki Timetable": null,
    });
    const ctx = useContext(AppContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`${API_BASE_URL}/collections`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const collections = await response.json();
                const totalAmount: number = collections.reduce(
                    (sum: number, collection: TypeCollection) => {
                        if (collection.status === "Valid") {
                            return sum + collection.amount;
                        }
                        return sum;
                    },
                    0
                );
                setTotalAmount(totalAmount);

                const filteredCollections = collections.filter(
                    (collection: TypeCollection) => {
                        return collection.status == 'Valid';
                    }
                );
                const invoiceIds: number[] = filteredCollections.map((collection: TypeCollection) => {
                    return collection['invoice_id'];
                });

                response = await fetch(
                    `${API_BASE_URL}/invoices`
                );
                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok"
                    );
                }
                const invoices = await response.json();

                const productCounts: TypeStringNumberObject = {};
                invoices.forEach((invoice: TypeInvoice) => {
                    if (invoiceIds.includes(invoice.id)) {
                        const product = invoice.item;
                        if (productCounts[product] !== undefined) {
                            productCounts[product] += invoice['paid_amount'];
                        } else {
                            productCounts[product] = invoice['paid_amount'];
                        }
                    }
                });
                setProductCounts(productCounts as TypeProducts)
            } catch (error) {
                ctx?.onNotif(`Loading total revenue failed with error: ${error}`);
            }
        };

        fetchData();
    }, []);
    return (
        <Card
            title={"Total Revenue"}
            icon={<MdOutlineWallet />}
            stats={totalAmount}
            isDetails={true}
            isCurrency={true}
            details={productCounts}
        />
    );
};

export default CardCollections;
