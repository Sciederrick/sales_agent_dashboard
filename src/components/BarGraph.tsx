import { ResponsiveBar } from "@nivo/bar";
import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import { AppContext } from "../contexts/AppContext";
import { barGraphAccents, barGraphColors } from "../data/chartColors";

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

type TypeSchoolSignupDistribution = {
    product: string;
    Primary: number;
    Secondary: number;
    IGCSE: number;
};

const BarGraph = () => {
    const ctx = useContext(AppContext);

    const [data, setData] = useState<TypeSchoolSignupDistribution[]>([]);

    const generateBarData = (schools: TypeSchool[]) => {
        const zerakiAnalytics: TypeSchoolSignupDistribution = {
            product: "Zeraki Analytics",
            Primary: 0,
            Secondary: 0,
            IGCSE: 0,
        };

        const zerakiFinance: TypeSchoolSignupDistribution = {
            product: "Zeraki Finance",
            Primary: 0,
            Secondary: 0,
            IGCSE: 0,
        };

        const zerakiTimetable: TypeSchoolSignupDistribution = {
            product: "Zeraki Timetable",
            Primary: 0,
            Secondary: 0,
            IGCSE: 0,
        };

        type TypeSchool = "Primary" | "Secondary" | "IGCSE";
        schools.forEach((school) => {
            const productsArr = school.products
                .split(",")
                .map((product) => product.trim());
            productsArr.forEach((product) => {
                if (product === "Zeraki Analytics") {
                    zerakiAnalytics[school.type as TypeSchool]++;
                } else if (product === "Zeraki Finance") {
                    zerakiFinance[school.type as TypeSchool]++;
                } else if (product === "Zeraki Timetable") {
                    zerakiTimetable[school.type as TypeSchool]++;
                }
            });
        });

        return [zerakiAnalytics, zerakiFinance, zerakiTimetable];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/schools`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const schools = await response.json();
                const data = generateBarData(schools);
                setData(data as TypeSchoolSignupDistribution[]);
            } catch (error) {
                ctx?.onNotif(`Loading signups failed with error: ${error}`);
            }
        };

        fetchData();
    }, []);
    return (
        <ResponsiveBar
            groupMode="grouped"
            data={data}
            keys={["Primary", "Secondary", "IGCSE"]}
            indexBy="product"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            // colors={{ scheme: "nivo" }}
            colors={barGraphColors}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: barGraphAccents[0],
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: barGraphAccents[1],
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
                {
                    id: "squares",
                    type: "patternSquares",
                    background: "inherit",
                    color: barGraphAccents[2],
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: "Primary",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "Secondary",
                    },
                    id: "lines",
                },
                {
                    match: {
                        id: "IGCSE",
                    },
                    id: "squares",
                },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "products",
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "signups",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            animate={true}
        />
    );
};

export default BarGraph;
