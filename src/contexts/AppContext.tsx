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

    return (
        <AppContext.Provider
            value={{
                showMobileNav,
                showProfileSideBar,
                signupsPerProduct,
                onToggleMobileNav: handleToggleMobileNav,
                onToggleProfileSideBar: handleToggleProfileSideBar,
                onNotif: handleNotif,
                onSetSignupsPerProduct: handleSetSignupsPerProduct

            }}
        >
            {children}
            <ToastContainer />
        </AppContext.Provider>
    );
};
