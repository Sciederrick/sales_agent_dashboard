// src/PieChart.js
import { ResponsivePie } from "@nivo/pie";
import { pieChartColors } from "../data/chartColors";
import { useMediaQuery } from "react-responsive";

type TypeProps = {
    data: {
        id: string;
        label: string;
        value: number;
        color: string;
    }[];
};
const PieChart = ({ data }: TypeProps) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    const isMediumScreen = useMediaQuery({
        query: "(min-width: 601px) and (max-width: 1024px)",
    });
    const isLargeScreen = useMediaQuery({ query: "(min-width: 1025px)" });

    let margin;
    if (isSmallScreen) {
        margin = { top: 10, right: 40, bottom: 120, left: 40 };
    } else if (isMediumScreen) {
        margin = { top: 10, right: 220, bottom: 100, left: 220 };
    } else if (isLargeScreen) {
        margin = { top: 10, right: 120, bottom: 120, left: 120 };
    }

    const legendDirection = isSmallScreen ? "column" : "row";

    return (
        <ResponsivePie
            colors={pieChartColors}
            data={data}
            legends={[
                {
                    anchor: "bottom",
                    direction: legendDirection,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                    itemHeight: 18,
                    itemsSpacing: 4,
                    itemTextColor: "#999",
                    itemWidth: 100,
                    symbolShape: "square",
                    symbolSize: 18,
                    toggleSerie: true,
                    translateY: 20,
                },
            ]}
            margin={margin}
            theme={{
                text: {
                    fontFamily:
                        "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
                },
            }}
            enableArcLinkLabels={false}
        />
    );
};

export default PieChart;
