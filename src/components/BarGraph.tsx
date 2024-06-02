import { ResponsiveBar } from "@nivo/bar";
import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import { AppContext } from "../contexts/AppContext";

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
    month: string; 
    Primary: number; 
    Secondary: number; 
    IGCSE: number; 
}

type TypeStringNumObj = { [key: string]: number };

const BarGraph = () => {
    const ctx = useContext(AppContext);

    const [data, setData] = useState<TypeSchoolSignupDistribution[]>([]);

    const generateBarData = (schools:TypeSchool[]) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const groupedData: {[key:string]:TypeStringNumObj} = {};

        // Initialize groupedData with default values for the current year
        schools.forEach((school) => {
            const registrationYear = new Date(school.registration_date).getFullYear();
            if (registrationYear === currentYear) {
                const month = new Date(school.registration_date).toLocaleString(
                    "default",
                    { month: "long" }
                );
                if (!groupedData[month]) {
                    groupedData[month] = {
                        Primary: 0,
                        Secondary: 0,
                        IGCSE: 0,
                    };
                }
            }
        });

        // Group data by month and type for the current year
        schools.forEach((school) => {
            const registrationYear = new Date(school.registration_date).getFullYear();
            if (registrationYear === currentYear) {
                const month = new Date(school.registration_date).toLocaleString(
                    "default",
                    { month: "long" }
                );
                groupedData[month][school.type] += 1;
            }
        });

        // Convert to array of objects
        return Object.entries(groupedData).map(([month, types]) => ({
            month,
            ...types,
        }));
    }
    
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
            data={data}
            keys={["Primary", "Secondary", "IGCSE"]}
            indexBy="month"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
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
                    id: "lines",
                },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "month",
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
}

export default BarGraph;
