import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-zinc-50 border-t border-zinc-200/60 mt-16">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    
                    <div className="rounded-2xl bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                            Web Programming
                        </h3>
                        <p className="mt-3 text-sm text-zinc-600 leading-6">
                            A simple portfolio showcasing my journey in IT, coding,
                            and gaming experiences.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                            Contact
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                            <li>Email: feriamv@students.national-u.edu.ph</li>
                            <li>Phone: +639 XXX XXX XXXX</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                            Legal
                        </h3>
                        <div className="mt-3 flex flex-col gap-2 text-sm">
                            <NavLink to="/terms" className="text-teal-600 hover:text-teal-700 transition font-medium">
                                Terms of Service
                            </NavLink>

                            <NavLink to="/privacy" className="text-teal-600 hover:text-teal-700 transition font-medium">
                                Privacy Policy
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-zinc-200/60 pt-6 text-center">
                    <p className="text-xs text-zinc-500 font-medium">
                        © {new Date().getFullYear()} Web Programming. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
