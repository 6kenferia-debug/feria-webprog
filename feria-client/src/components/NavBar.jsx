import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
];

const authLinks = [
    { label: 'Log In', to: '/auth/login' },
    { label: 'Sign Up', to: '/auth/signup' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full border-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
        isActive 
        ? 'border-white bg-white text-teal-700 shadow-lg shadow-white/25'
        : 'border-white/70 text-white hover:border-white hover:bg-white/10 hover:text-white hover:shadow-white/20',
    ].join(' ');

const authButtonClass = 
    'rounded-full border-2 border-white text-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-teal-700 hover:shadow-lg hover:shadow-white/25 transform hover:scale-105';

const NavBar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-teal-300/30 bg-teal-600 backdrop-blur-xl shadow-lg shadow-teal-900/20">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
                
                <NavLink to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105">
                    <div className="relative">
                        <img src={logo} width={100} height={75} alt="LOGO" className="drop-shadow-sm brightness-0 invert" />
                        <div className="absolute -inset-2 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                </NavLink>

                <div className="flex items-center gap-6">
                    
                    {/* Navigation Links */}
                    <nav className="hidden items-center gap-3 md:flex">
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
                    <div className="hidden items-center gap-3 md:flex">
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