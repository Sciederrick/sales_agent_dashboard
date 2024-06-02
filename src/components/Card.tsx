type TypeLayoutProps = {
    title: string;
    icon: React.ReactNode;
    stats: number|null;
    isDetails: boolean;
    isCurrency: boolean;
    details?: object;
};

const Card: React.FC<TypeLayoutProps> = ({
    title,
    icon,
    stats,
    isDetails,
    isCurrency,
    details,
}) => {
    return (
        <div className="bg-[#FFF] rounded-xl p-4 w-full shadow lg:p-6">
            <div className="flex justify-between pb-4">
                <div>
                    <h2 className="text-xs pb-2 text-gray-500">{title}&nbsp;</h2>
                    <p className="text-xl font-medium h-[32px]">
                        {stats ? (
                            <>
                                {isCurrency
                                    ? new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "KES",
                                    }).format(stats)
                                    : new Intl.NumberFormat("en-US", {
                                        style: "decimal",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(stats)}
                            </>
                        ):(null)}&nbsp;
                    </p>
                </div>
                <div className="text-gray-400">{icon}</div>
            </div>
            <div className="flex justify-between">
                {isDetails && details && (
                    <ul className="text-sm w-full">
                        {Object.entries(details).map(([key, stat]) => (
                            <li
                                key={key}
                                className="py-3 w-full flex justify-between border-b text-gray-500"
                            >
                                <strong>{key}</strong>
                                <p>
                                    {isCurrency
                                        ? new Intl.NumberFormat("en-US", {
                                              style: "currency",
                                              currency: "KES",
                                          }).format(stat)
                                        : new Intl.NumberFormat("en-US", {
                                              style: "decimal",
                                              minimumFractionDigits: 0,
                                              maximumFractionDigits: 0,
                                          }).format(stat)}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Card;
