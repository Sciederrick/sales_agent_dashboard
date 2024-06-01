import { MdErrorOutline } from "react-icons/md";
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

const CardCollections = () => {
    const [numBouncedCheques, setNumBouncedCheques] = useState<number | null>(null);

    const ctx = useContext(AppContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/collections`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const collections = await response.json();
                const numBouncedCheques: number = collections.reduce(
                    (sum: number, collection: TypeCollection) => {
                        return sum + (collection.status === "Bounced" ? 1 : 0);
                    },
                    0
                );
                setNumBouncedCheques(numBouncedCheques);

            } catch (error) {
                ctx?.onNotif(
                    `Loading bounced cheques failed with error: ${error}`
                );
            }
        };

        fetchData();
    }, []);
    return (
        <Card
            title={"Bounced Cheques"}
            icon={<MdErrorOutline />}
            stats={numBouncedCheques}
            isDetails={false}
            isCurrency={false}
        />
    );
};

export default CardCollections;
