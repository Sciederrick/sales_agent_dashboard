import { Link } from "react-router-dom";
import logoIcon2 from "./../assets/logo-2.png";

type LayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <nav className="text-red-600 h-50 w-50">
                <Link to="/">
                    <img
                        src={logoIcon2}
                        alt="company logo"
                        className="h-10 mr-3"
                    />
                </Link>
            </nav>
            <main>{children}</main>
            <aside></aside>
        </div>
    );
};

export default DashboardLayout;
