import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowRight } from 'lucide-react';

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

export function EmailStep({ data, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [email, setEmail] = useState(data.email || '');
  const [error, setError] = useState('');

  const handleChange = (value: string) => {
    setEmail(value);
    setError('');
    onUpdate({ email: value });
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center">
          <Mail className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3">{t('getStarted.email.heading')}</h3>
        <p className="text-white/60 max-w-md mx-auto">
          {t('getStarted.email.description')}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="glass-card rounded-2xl p-6">
          <label className="block text-sm font-bold text-white mb-2">{t('getStarted.email.label')}</label>
          <p className="text-xs text-white/50 mb-4">{t('getStarted.email.hint')}</p>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t('getStarted.email.placeholder')}
            className="input-modern w-full"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {email && !isValidEmail && (
            <p className="text-yellow-400 text-sm mt-2">{t('getStarted.email.invalidEmail')}</p>
          )}
          {email && isValidEmail && (
            <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
              <ArrowRight className="h-4 w-4" />
              <span>{t('getStarted.email.looksGood')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
