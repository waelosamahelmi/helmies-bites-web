import { Sparkles } from 'lucide-react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'center' | 'left';
  icon?: React.ReactNode;
  className?: string;
}

export function SectionTitle({
  subtitle,
  title,
  titleHighlight,
  description,
  align = 'center',
  icon,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <div className={`flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="badge">
            {icon || <Sparkles className="h-4 w-4" />}
            {subtitle}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
        {titleHighlight ? (
          <>
            <span className="gradient-text">{titleHighlight}</span>{' '}
            <span className="text-white">{title}</span>
          </>
        ) : (
          <span className="gradient-text">{title}</span>
        )}
      </h2>
      {description && (
        <p className={`text-xl text-white/50 leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
