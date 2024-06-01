import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

import DashboardLayout from "../layouts/DashboardLayout";

import { AppContext } from "../contexts/AppContext";

import logoIcon1 from "./../assets/logo-1.png";
import avatar from "./../assets/profile.webp";

import PieChart from "../components/PieChart";
import CardCollections from "../components/CardCollections";
import CardSignups from "../components/CardSignups";
import CardTotalRevenue from "../components/CardTotalRevenue";
import CardBouncedCheques from "../components/CardBouncedCheques";

import data from "../data/index.json";


const Overview = () => {
    const ctx = useContext(AppContext);

    const handleClickToggleNav = () => {
        ctx?.onToggleMobileNav();
    }

    const handleClickToggleProfileSideBar = () => {
        ctx?.onToggleProfileSideBar();
    }
   
    return (
        <DashboardLayout>
            <header className="flex justify-between items-start pt-3 bg-[#FFF] px-4 lg:bg-transparent lg:justify-end">
                <Link to="/" className="pb-6 lg:hidden">
                    <img src={logoIcon1} alt="company logo" className="h-8" />
                </Link>
                <button
                    className={`flex items-center lg:pr-8 ${
                        ctx?.showProfileSideBar ? "hidden" : "block"
                    }`}
                    onClick={() => handleClickToggleProfileSideBar()}
                >
                    <div className="rounded-full border border-[#36893A] p-[2px] lg:mr-1">
                        <img
                            src={avatar}
                            alt="user avatar"
                            className="h-9 w-9 rounded-full object-cover border border-[#36893A] lg:h-8 lg:w-8"
                        />
                    </div>
                    <div className="hidden lg:flex lg:items-center">
                        &nbsp;
                        {"Derrick Mbarani"}
                        &nbsp;
                        <FiChevronDown />
                    </div>
                </button>
                <button
                    onClick={() => handleClickToggleNav()}
                    className="lg:hidden"
                >
                    <MdMenu size={40} color="#2C3539" />
                </button>
            </header>
            <main>
                <div className="grid gap-4 py-4 px-8 md:grid-cols-2 lg:gap-x-8 lg:pt-8 lg:px-12 lg:grid-cols-4">
                    <CardCollections />
                    <CardSignups />
                    <CardTotalRevenue />
                    <CardBouncedCheques />
                </div>
                <div className="px-8 lg:py-4 lg:px-12">
                    <div className="flex flex-col justify-between gap-4 bg-white rounded-xl shadow lg:flex-row">
                        <div className="w-full h-[500px] relative">
                            <PieChart data={data} />
                            <div className="absolute inset-x-0 bottom-2">
                                <h2 className="text-center font-semibold">Zeraki Analytics</h2>
                                <ul className="flex justify-center gap-2 text-gray-500">
                                    <li className="px-1">Primary: 10</li>|
                                    <li className="px-1">Secondary: 5</li>|
                                    <li className="px-1">IGCSE: 5</li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full h-[500px] relative">
                            <PieChart data={data} />
                            <div className="absolute inset-x-0 bottom-2">
                                <h2 className="text-center font-semibold">
                                    Zeraki Finance
                                </h2>
                                <ul className="flex justify-center gap-2 text-gray-500">
                                    <li className="px-1">Primary: 10</li>|
                                    <li className="px-1">Secondary: 5</li>|
                                    <li className="px-1">IGCSE: 5</li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full h-[500px] relative">
                            <PieChart data={data} />
                            <div className="absolute inset-x-0 bottom-2">
                                <h2 className="text-center font-semibold">
                                    Zeraki Timetable
                                </h2>
                                <ul className="flex justify-center gap-2 text-gray-500">
                                    <li className="px-1">Primary: 10</li>|
                                    <li className="px-1">Secondary: 5</li>|
                                    <li className="px-1">IGCSE: 5</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );

};

export default Overview;
