import { MdOutlineMoney } from "react-icons/md";
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
    const [numCollections, setNumCollections] = useState<number | null>(null);
    const ctx = useContext(AppContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/collections`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const collections = await response.json();
                setNumCollections(collections?.length);
            } catch (error) {
                ctx?.onNotif(`Loading collections failed with error: ${error}`);
            }
        };

        fetchData();
    }, []);
    return (
        <Card
            title={"Collections"}
            icon={<MdOutlineMoney />}
            stats={numCollections}
            isDetails={false}
            isCurrency={false}
        />
    );
};

export default CardCollections;
