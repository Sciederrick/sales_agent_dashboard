// src/PieChart.js
import { ResponsivePie } from "@nivo/pie";

type TypeProps = {
    data: {
        id: string;
        label: string;
        value: number;
        color: string;
    }[]
}
const PieChart = ({ data }: TypeProps) => {
    return (
        <ResponsivePie
            data={data}
            // height={500}
            legends={[]}
            margin={{
                bottom: 80,
                left: 120,
                right: 120,
                top: 80,
            }}
            theme={{
                text: {
                    fontFamily:
                        "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
                },
            }}
            // width={900}
        />
    );
};

export default PieChart;
