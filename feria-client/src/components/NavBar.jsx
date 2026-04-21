import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
];

const authLinks = [
    { label: 'Sign In', to: '/auth/signin' },
    { label: 'Sign Up', to: '/auth/signup' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200 shadow-sm',
        isActive 
        ? 'border-teal-700 bg-teal-600 text-white shadow-md'
        : 'border-transparent text-teal-700 hover:border-teal-500 hover:bg-teal-100 hover:text-teal-800 hover:shadow',
    ].join(' ');

const authButtonClass = 
    'rounded-full border-2 border-teal-600 text-teal-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:bg-teal-600 hover:text-white';

const NavBar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-teal-200 bg-teal-100/90 backdrop-blur-md shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                
                <NavLink to="/" className="flex items-center gap-3">
                    <img src={logo} width={100} height={75} alt="LOGO" />
                </NavLink>

                <div className="flex items-center gap-4">
                    
                    {/* Navigation Links */}
                    <nav className="hidden items-center gap-2 md:flex">
                        {links.map((link) => (
                            <NavLink 
                                key={link.to} 
                                to={link.to} 
                                end={link.to === '/'} 
                                className={navLinkClassName}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden items-center gap-2 md:flex">
                        {authLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={authButtonClass}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default NavBar;