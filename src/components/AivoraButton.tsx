import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface AivoraButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function AivoraButton({ to, children, className = '', external }: AivoraButtonProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="arrow-icon">
        <ArrowUpRight className="h-5 w-5 text-white" />
        <ArrowUpRight className="h-5 w-5 text-white" />
      </span>
      <span className="btn-bg-svg">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 484 60"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="484" height="60" fill="url(#aivora_btn_grad)" />
          <defs>
            <radialGradient
              id="aivora_btn_grad"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FF7A00" />
              <stop offset="1" stopColor="#0D0907" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={to} className={`aivora-btn ${className}`} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={`aivora-btn ${className}`}>
      {content}
    </Link>
  );
}
