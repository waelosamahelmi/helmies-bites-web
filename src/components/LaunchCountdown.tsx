import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

const LAUNCH_DATE = new Date('2026-03-05T00:00:00+02:00'); // March 5, 2026 Helsinki time

function getTimeLeft() {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface LaunchCountdownProps {
  compact?: boolean;
  showRestaurants?: boolean;
  className?: string;
}

export function LaunchCountdown({ compact = false, showRestaurants = false, className = '' }: LaunchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Rocket className="h-4 w-4 text-[#FF7A00]" />
        <span className="text-sm font-bold text-white/70">
          Launching in{' '}
          <span className="text-[#FF7A00]">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="h-5 w-5 text-[#FF7A00]" />
        <span className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">
          Launching March 5th
        </span>
      </div>

      <div className="flex gap-3">
        {units.map((unit) => (
          <div key={unit.label} className="glass-card xb-border rounded-2xl px-4 py-3 text-center min-w-[70px]">
            <div className="text-2xl md:text-3xl font-black gradient-text leading-none">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {showRestaurants && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">
            Launching with
          </p>
          <div className="flex flex-wrap gap-2">
            {['ravintolababylon.fi', 'pizzeriaantonio.fi', 'tirvankahvila.fi'].map((domain) => (
              <span
                key={domain}
                className="px-3 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-xs font-semibold"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
