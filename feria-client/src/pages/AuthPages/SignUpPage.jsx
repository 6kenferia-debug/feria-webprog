//SIGN IN PAGE
import { Link } from 'react-router-dom'; 
import Button from '../../components/Button';
import EmailLogo from '../../assets/images/email_logo.png';
import PasswordLogo from '../../assets/images/password_logo.png';
import GoogleLogo from '../../assets/images/google_logo.png';
import AppleLogo from '../../assets/images/apple_logo.png';

const inputNameClasses =
  'mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 shadow-sm focus:border-[#35408E] focus:ring-2 focus:ring-[#35408E]/20';

const inputClasses =
  'w-full rounded-2xl bg-white px-4 py-1 text-sm text-zinc-900 ';

const inputBorderClasses =
  'mt-2 flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-3 shadow-sm focus-within:border-[#35408E] focus-within:ring-2 focus-within:ring-[#35408E]/20';

const actionButtonClassName = 'w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  return (
    <div className="rounded-[2rem] border border-[#35408E]/15 bg-[#F7F6FF] p-8 shadow-[0_25px_80px_-40px_rgba(53,64,142,0.65)] sm:p-10">
      <h1 className="text-3xl font-bold tracking-tight text-[#35408E] sm:text-4xl">
        Create Account
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700">
        Create an account to unlock full access to articles, personalized content, and features designed to enhance your experience.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-[#35408E]">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputNameClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-[#35408E]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputNameClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-[#35408E]">
            Email Address
          </label>

          <div className={inputBorderClasses}>
            <img src={EmailLogo} alt ="Email icon" className="h-5 w-5 opacity-70" />
            <input
              id="signin-email"
              type="email"
              placeholder="name@students.national-u.edu.ph"
              autoComplete="email"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-semibold text-[#35408E]">
            Enter your password
          </label>

          <div className={inputBorderClasses}>
            <img src={PasswordLogo} alt="Password icon" className="h-5 w-5 opacity-70" />
            <input
              id="signin-password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className={inputClasses}
            />
          </div>
          <p className="mt-2 text-xs leading-5 text-zinc-600">
            Use at least 8 characters with a mix of letters, numbers, and symbols for secure access.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} !border-0 !text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transition`}
        >
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={`${actionButtonClassName} flex items-center justify-center gap-3 border-[#35408E] bg-white text-[#35408E] hover:border-[#FFDC56] hover:text-[#35408E]`}
          >
            <img src={GoogleLogo} alt="Google" className="h-5 w-5" />
            <span>Sign Up with Google</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={`${actionButtonClassName} flex items-center justify-center gap-3 border-[#35408E] bg-white text-[#35408E] hover:border-[#FFDC56] hover:text-[#35408E]`}
          >
            <img src={AppleLogo} alt="Apple" className="h-5 w-5" />
            <span>Sign Up with Apple</span>
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#35408E]/15 pt-6 text-sm text-zinc-700">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#35408E] transition hover:text-[#2B3474]"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
