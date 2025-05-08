import { Github, Globe2, Linkedin } from 'lucide-react';
import GithubIcon from '../assets/icons/github.svg';
import Link from 'next/link';
// import PortfolioIcon from '../assets/icons/portfolio.svg';

export const Footer = () => {
  return (
    <footer className='py-5 bg-black text-white/60 border-t border-t-white/20'>
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">Developed by Parshav</div>
          <ul className="flex justify-center gap-2.5">
            <li><Link href="https://github.com/parshav92"><Github /></Link></li>
            <li><Link href="https://linkedin.com/iin/parshav-dedhia"><Linkedin /></Link></li>
            <li><Link href="https://parshav.me"><Globe2 /></Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
