import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col">
            <NavBar />

            <main className="pb-16 pt-20 flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
