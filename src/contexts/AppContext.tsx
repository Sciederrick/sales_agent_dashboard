import { ReactNode, createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TypeSignupsPerProduct = { [key: string]: number };
type TypeAppContext = {
    showMobileNav: boolean;
    onToggleMobileNav: () => void;
    showProfileSideBar: boolean;
    onToggleProfileSideBar: () => void;
    onNotif: (msg: string) => void;
    signupsPerProduct: { [key: string]: number };
    onSetSignupsPerProduct: (signups: TypeSignupsPerProduct) => void;
    activeSchool: number|null,
    onSetActiveSchool: (id: number) => void;
    activeSchoolSection: string|null,
    onSetActiveSchoolSection: (route: string) => void;
};

export const AppContext = createContext<TypeAppContext | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [showMobileNav, toggleMobileNav] = useState(false);
    const handleToggleMobileNav = () => {
        toggleMobileNav(!showMobileNav);
    };

    const [showProfileSideBar, toggleProfileSideBar] = useState(false);
    const handleToggleProfileSideBar = () => {
        toggleProfileSideBar(!showProfileSideBar);
    };

    const handleNotif = (msg:string) => {
        toast(msg);
    }

    const [signupsPerProduct, setSignupsPerProduct] = useState({});

    const handleSetSignupsPerProduct = (signups: TypeSignupsPerProduct) => {
        setSignupsPerProduct(signups);
    };

    const [activeSchool, setActiveSchool] = useState<number|null>(null);

    const handleSetActiveSchool = (id: number) => {
        setActiveSchool(id);
    };

    const [activeSchoolSection, setActiveSchoolSection] = useState<string|null>(null);
    const handleSetActiveSchoolSection = (route: string) => {
        setActiveSchoolSection(route);
    };

    return (
        <AppContext.Provider
            value={{
                showMobileNav,
                showProfileSideBar,
                signupsPerProduct,
                activeSchool,
                activeSchoolSection,
                onToggleMobileNav: handleToggleMobileNav,
                onToggleProfileSideBar: handleToggleProfileSideBar,
                onNotif: handleNotif,
                onSetSignupsPerProduct: handleSetSignupsPerProduct,
                onSetActiveSchool: handleSetActiveSchool,
                onSetActiveSchoolSection: handleSetActiveSchoolSection
            }}
        >
            {children}
            <ToastContainer />
        </AppContext.Provider>
    );
};
