import { Link} from 'react-router-dom';

const variantClasses = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200',
};

const Button = ({
    children,
    to,
    type = 'button',
    variant = 'secondary',
    className = '',
    ...rest
}) => {
    const classes = [
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition',
        variantClasses[variant] ?? variantClasses.secondary,
        className,
    ]
        .join(' ')
        .trim();

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    );
};
export default Button;
