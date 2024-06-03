import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import HeaderDesc from "../components/HeaderDesc";
import avatar from "./../assets/profile.webp";
import logoIcon1 from "./../assets/logo-1.png";

type HeaderProps = {
    title: string;
    description: string;
    onToggleProfileSidebar: () => void;
    onToggleNav: () => void;
};

const Header = ({
    title,
    description,
    onToggleProfileSidebar,
    onToggleNav,
}: HeaderProps) => {
    return (
        <header className="relative flex justify-between items-start pt-3 bg-[#FFF] px-4 lg:bg-transparent lg:justify-end lg:border-b lg:pb-4">
            <Link to="/" className="pb-6 lg:hidden">
                <img src={logoIcon1} alt="company logo" className="h-8" />
            </Link>
            <div className="hidden lg:block lg:absolute lg:left-0 lg:pl-10">
                <HeaderDesc title={title} desc={description} />
            </div>
            <button
                className={`flex items-center lg:pr-8`}
                onClick={onToggleProfileSidebar}
            >
                <div className="rounded-full border border-[#36893A] p-[2px] lg:mr-1">
                    <img
                        src={avatar}
                        alt="user avatar"
                        className="h-9 w-9 rounded-full object-cover border border-[#36893A] lg:h-8 lg:w-8"
                    />
                </div>
                <div className="hidden lg:flex lg:items-center">
                    &nbsp; {"Derrick Mbarani"} &nbsp;
                </div>
            </button>
            <button onClick={onToggleNav} className="lg:hidden">
                <MdMenu size={40} color="#2C3539" />
            </button>
        </header>
    );
};

export default Header;
