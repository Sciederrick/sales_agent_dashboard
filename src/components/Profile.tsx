import { useContext } from "react";

import { FiChevronDown } from "react-icons/fi";
import { MdChevronLeft, MdOutlineCancel } from "react-icons/md";

import avatar from "./../assets/profile.webp";
import zerakiAnalyticsLogo from "./../assets/zeraki_analytics_logo.png";

import { AppContext } from "../contexts/AppContext";

const Profile = () => {
    const ctx = useContext(AppContext);
    return (
        <>
            <header className="pt-3 bg-[#FFF] px-4 pb-4 rounded-b-xl lg:rounded-none lg:rounded-l-3xl">
                <div className="flex justify-between items-start lg:bg-transparent">
                    <button
                        onClick={() => ctx?.onToggleProfileSideBar()}
                        className="lg:hidden"
                    >
                        <MdChevronLeft size={40} color="#2C3539" />
                        &nbsp;
                    </button>
                    <button
                        className="flex flex-col items-center gap-2 ml-2 lg:flex-row lg:ml-0 lg:gap-0 lg:mb-6"
                        onClick={() => ctx?.onToggleProfileSideBar()}
                    >
                        <div className="rounded-full border border-[#36893A] p-[2px] mt-2 lg:mt-0 lg:mr-1">
                            <img
                                src={avatar}
                                alt="user avatar"
                                className="h-20 w-20 rounded-full object-cover border border-[#36893A] lg:h-8 lg:w-8"
                            />
                        </div>
                        <div className="lg:flex lg:items-start">
                            <ul className="flex flex-col text-xs text-[#55626C] lg:items-start lg:pl-1">
                                <li>{"johndoe@example.com"}</li>
                                <li>{"John Doe"}</li>
                            </ul>
                            &nbsp;
                            <FiChevronDown className="hidden md:inline" />
                        </div>
                    </button>
                    <button className="invisible flex items-center text-sm lg:visible" onClick={() => ctx?.onToggleProfileSideBar()}>
                        Close&nbsp;<MdOutlineCancel />
                    </button>
                </div>
                <p className="text-xs text-center pb-6 text-[#55626C] underline mx-auto">
                    {"Joined 2023-11-01"}
                </p>
                <p className="text-center max-w-sm mx-auto">
                    John is a highly motivated and results-oriented sales agent
                    with a strong understanding of the education sector.
                </p>
            </header>
            <main className="mt-2">
                <div className="flex justify-center gap-2 px-2">
                    <div className="w-1/2 p-4 bg-white rounded-xl">
                        <div className="text-xs">signed up</div>
                        <div className="font-semibold text-xl py-3">{"15"}</div>
                        <div className="text-xs">schools</div>
                    </div>
                    <div className="w-1/2 p-4 bg-white rounded-xl">
                        <div className="text-xs">top selling</div>
                        <img
                            src={zerakiAnalyticsLogo}
                            alt="company logo"
                            className="h-6 my-3 object-fit"
                        />
                        <div className="text-xs">product</div>
                    </div>
                </div>
                <div className="px-4 flex flex-col gap-4 py-8">
                    <div className="flex justify-between gap-4 items-center text-sm">
                        <div className="w-[200px]">{"Monthly Target"}</div>
                        <div className="w-full h-[.5px] bg-gray-300">
                            &nbsp;
                        </div>
                        <div className="font-bold text-gray-500">{"03"}</div>
                    </div>
                    <div className="flex justify-between gap-4 items-center text-sm">
                        <div className="w-[200px]">{"Quarterly Target"}</div>
                        <div className="w-full h-[.5px] bg-gray-300">
                            &nbsp;
                        </div>
                        <div className="font-bold text-gray-500">{"12"}</div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;
