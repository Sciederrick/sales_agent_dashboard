import { MdOutlineGroup } from "react-icons/md";
import { useContext, useEffect, useState } from "react";

import Card from "./Card";

import { AppContext } from "../contexts/AppContext";
import { API_BASE_URL } from "../constants";

type TypeSchool = {
  id: number;
  name: string;
  type: string;
  county: string;
  registration_date: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  products: string;
  balance: number;
};

type TypeStringNumberObject = {
    [key: string]: number;
};

type TypeProducts = {
  "Zeraki Analytics": null|number;
  "Zeraki Finance": null|number;
  "Zeraki Timetable": null|number;
};

const CardSignups = () => {
    const [numSchools, setNumSchools] = useState<number | null>(null);
    const [productCounts, setProductCounts] = useState<TypeProducts>({
        "Zeraki Analytics": null,
        "Zeraki Finance": null,
        "Zeraki Timetable": null,
    });

    const ctx = useContext(AppContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/schools`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const schools = await response.json();
                setNumSchools(schools?.length);

                const productCounts: TypeStringNumberObject = {}

                schools.forEach((school:TypeSchool) => {
                    const products = school.products.split(", ");
                    products.forEach((product) => {
                        if (productCounts[product] !== undefined) {
                            productCounts[product]++;
                        } else {
                            productCounts[product] = 1;
                        }
                    });
                });

                setProductCounts(productCounts as TypeProducts);
            } catch (error) {
                ctx?.onNotif(`Loading signups failed with error: ${error}`);
            }
        };

        fetchData();
    },[]);
    return (
        <Card
            title={"Sign ups"}
            icon={<MdOutlineGroup />}
            stats={numSchools}
            isDetails={true}
            isCurrency={false}
            details={productCounts}
        />
    );
};

export default CardSignups;
