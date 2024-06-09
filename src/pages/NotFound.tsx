import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="flex items-center justify-center h-screen">
            <div className="px-8 max-w-lg">
                <h2 className="text-2xl">404 - PAGE NOT FOUND</h2>
                <p className="py-4">
                    The page you are looking for might not exist, has been
                    removed, had its name changed or its temporarily
                    unavailable.
                </p>
                <Link className="underline text-blue-500" to="/">
                    HOME PAGE
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
