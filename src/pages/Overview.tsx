import { useContext, useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { AppContext } from "../contexts/AppContext";

import PieChart from "../components/PieChart";
import CardCollections from "../components/CardCollections";
import CardSignups from "../components/CardSignups";
import CardTotalRevenue from "../components/CardTotalRevenue";
import CardBouncedCheques from "../components/CardBouncedCheques";

import { API_BASE_URL } from "../constants";
import BarGraph from "../components/BarGraph";
import DataTableUpcomingInvoices from "../components/DataTableUpcomingInvoices";
import HeaderDesc from "../components/HeaderDesc";
import Header from "../components/TheHeader";

type TypePieData = {
    id: string;
    label: string;
    value: number;
    color: string;
};

type TypeProductPieData = {
    [key: string]: TypePieData[]
}

type TypeStringNumberObject = {
    [key: string]: number;
};

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

const Overview = () => {
    const ctx = useContext(AppContext);

    const handleClickToggleNav = () => {
        ctx?.onToggleMobileNav();
    }

    const handleClickToggleProfileSideBar = () => {
        ctx?.onToggleProfileSideBar();
    }

    const [pieData, setPieData] = useState<TypeProductPieData>({});

    useEffect(() => {
        const fetchPieData = async () => {
            try {
                // products signups achieved
                let response = await fetch(
                    `${API_BASE_URL}/schools`
                );
                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok"
                    );
                }
                const schools = await response.json();

                const productCounts: TypeStringNumberObject =
                    {};

                schools.forEach((school: TypeSchool) => {
                    const products =
                        school.products.split(", ");
                    products.forEach((product) => {
                        if (
                            productCounts[product] !== undefined
                        ) {
                            productCounts[product]++;
                        } else {
                            productCounts[product] = 1;
                        }
                    });
                });

                // products signups targets set
                response = await fetch(
                    `${API_BASE_URL}/target`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const target = await response.json();
                
                const pieData = {} as TypeProductPieData
                for (const product in target) {
                    if (!(product in pieData)) {
                        pieData[product] = []
                    }
                    pieData[product].push({
                        id: `${product} (target set)`,
                        label: "target set",
                        value: target[product].signup,
                        color: "hsl(210, 50%, 35%)",
                    });   
                    pieData[product].push({
                        id: `${product} (target achieved)`,
                        label: "target achieved",
                        value: productCounts[product] ?? 0,
                        color: "hsl(30, 100%, 50%)",
                    });
                }

                setPieData(pieData);

            } catch (error) {
                ctx?.onNotif(
                    `Loading collections failed with error: ${error}`
                );
            }
        };

        fetchPieData();
    }, []);
   
    return (
        <DashboardLayout>
            <Header
                title="Dashboard Overview"
                description="Top metrics, signups overview, upcoming invoices"
                onToggleProfileSidebar={handleClickToggleProfileSideBar}
                onToggleNav={handleClickToggleNav}
            />
            <main className="pb-32">
                <div className=" py-4 px-8 lg:pt-8 lg:px-12">
                    <HeaderDesc
                        title={"Top Card Metrics"}
                        desc={
                            "Overview of vital sales and collections performance indicators"
                        }
                    />
                    <div className="grid gap-4 md:grid-cols-2 lg:gap-x-8  lg:grid-cols-4">
                        <CardCollections />
                        <CardSignups />
                        <CardTotalRevenue />
                        <CardBouncedCheques />
                    </div>
                </div>

                <div className="px-8 flex flex-col gap-4 lg:py-4 lg:px-12">
                    <div className="flex flex-col flex-wrap mb-4 w-full overflow-hidden">
                        <HeaderDesc
                            title={"Signups Overview"}
                            desc={
                                "Breakdown of new user registrations per product"
                            }
                        />
                        <div className="bg-white rounded-xl shadow overflow-auto w-full">
                            <div className="min-w-[650px] h-[500px]">
                                <BarGraph />
                            </div>
                        </div>
                    </div>

                    <div>
                        <HeaderDesc
                            title={"Targets Visualization"}
                            desc={
                                "Progress towards signup targets for Zeraki's products: Zeraki Analytics, Zeraki Finance, and Zeraki Timetable"
                            }
                        />
                        <ul className="flex flex-col justify-between gap-4 mb-4 lg:flex-row">
                            {Object.keys(pieData).map((key) => {
                                return (
                                    <li
                                        className="block w-full h-[500px] bg-white rounded-xl shadow"
                                        key={key}
                                    >
                                        <div className="pt-4">
                                            <h2 className="text-center text-gray-500 font-semibold">
                                                {key}
                                            </h2>
                                        </div>
                                        <PieChart data={pieData[key]} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <HeaderDesc
                            title={"Upcoming Invoices"}
                            desc={
                                "Keep track of pending payments, due dates, and outstanding balances"
                            }
                        />
                        <DataTableUpcomingInvoices />
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );

};

export default Overview;
