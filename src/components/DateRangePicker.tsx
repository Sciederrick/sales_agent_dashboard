import { useState } from "react";
import DatePicker from "react-datepicker";

// type TypeDateRange = string[]|null[];
// const DateRangePicker = () => {
//     const [dateRange, setDateRange] = useState<TypeDateRange>([null, null]);
//     const [startDate, endDate] = dateRange;
//     return (
//         <DatePicker
//             selectsRange={true}
//             startDate={startDate}
//             endDate={endDate}
//             onChange={(update: TypeDateRange) => {
//                 setDateRange(update);
//             }}
//             isClearable={true}
//         />
//     );
// };

// export default DateRangePicker;

const DateRangePicker = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);

    return (
        <div>
            <DatePicker
                // editableDateInputs={true}
                // onChange={(item) => setState([item.selection])}
                // moveRangeOnFirstSelection={false}
                // ranges={state}
            />
        </div>
    );
};

export default DateRangePicker;
