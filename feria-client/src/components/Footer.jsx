import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-green-200 bg-green-100/90 backdrop-blur-md shadow-inner mt-12">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="grid gap-8 md:grid-cols-3">
                    
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-green-800">
                            Web Programming
                        </h3>
                        <p className="mt-3 text-sm text-green-700 leading-6">
                            A simple portfolio showcasing my journey in IT, coding,
                            and gaming experiences.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-green-800">
                            Contact
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-green-700">
                            <li>Email: feriamv@students.national-u.edu.ph</li>
                            <li>Phone: +639 XXX XXX XXXX</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-green-800">
                            Legal
                        </h3>
                        <div className="mt-3 flex flex-col gap-2 text-sm">
                            <NavLink to="/terms" className="text-green-700 hover:text-green-900 transition">
                                Terms of Service
                            </NavLink>

                            <NavLink to="/privacy" className="text-green-700 hover:text-green-900 transition">
                                Privacy Policy
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-green-200 pt-6 text-center">
                    <p className="text-xs text-green-700">
                        © {new Date().getFullYear()} Web Programming. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;