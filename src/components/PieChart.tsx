// src/PieChart.js
import { ResponsivePie } from "@nivo/pie";

type TypeProps = {
    data: {
        id: string;
        label: string;
        value: number;
        color: string;
    }[];
};
const PieChart = ({ data }: TypeProps) => {
    return (
        <ResponsivePie
            // colors={{ datum: "data.color" }}
            data={data}
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemWidth: 100,
                    symbolShape: "square",
                    symbolSize: 18,
                    toggleSerie: true,
                    translateY: 20,
                },
            ]}
            margin={{
                bottom: 120,
                left: 120,
                right: 120,
                top: 10,
            }}
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
