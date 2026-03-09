import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Loader2, FileText, Image as ImageIcon, Sparkles, CheckCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

export function MenuUploadParseStep({ data, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [file, setFile] = useState<File | null>(data._menuFile || null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedMenu, setParsedMenu] = useState<any>(data.parsedMenu || null);
  const [isDragging, setIsDragging] = useState(false);
  const [parseError, setParseError] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setParsedMenu(null);
    setParseError('');
    onUpdate({ _menuFile: selectedFile, parsedMenu: null });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (validTypes.includes(droppedFile.type) || droppedFile.type.startsWith('image/')) {
        handleFileSelect(droppedFile);
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleParseMenu = async () => {
    if (!file) return;

    setIsParsing(true);
    setParseError('');

    try {
      let menuData: string;
      let contentType: string;

      if (file.type.startsWith('image/')) {
        menuData = await fileToBase64(file);
        contentType = 'image';
      } else if (file.type === 'application/pdf') {
        // For PDFs, read as text if possible, otherwise as base64
        menuData = await fileToBase64(file);
        contentType = 'image';
      } else {
        // Text files
        menuData = await file.text();
        contentType = 'text';
      }

      const response = await fetch('/api/ai/parse-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuData, contentType }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse menu');
      }

      const result = await response.json();
      const menu = result.data || result.menu || result;
      setParsedMenu(menu);
      onUpdate({ parsedMenu: menu, _menuFile: file });
    } catch (error) {
      console.error('Menu parsing failed:', error);
      setParseError('Failed to parse menu. Please try again or upload a different file.');
    } finally {
      setIsParsing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setParsedMenu(null);
    setParseError('');
    onUpdate({ _menuFile: null, parsedMenu: null });
  };

  const totalItems = parsedMenu?.categories?.reduce(
    (sum: number, cat: any) => sum + (cat.items?.length || 0), 0
  ) || 0;
  const totalCategories = parsedMenu?.categories?.length || 0;

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black text-white mb-3">{t('getStarted.menuUpload.heading')}</h3>
        <p className="text-white/60 max-w-lg mx-auto">
          {t('getStarted.menuUpload.description')}
        </p>
      </div>

      {/* Upload Area */}
      <div className="glass-card rounded-2xl p-8">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-[#FF7A00] bg-[#FF7A00]/10 scale-[1.02]'
              : file
              ? 'border-[#FF7A00]/50 bg-[#FF7A00]/5'
              : 'border-white/20 hover:border-[#FF7A00]/40 hover:bg-[#FF7A00]/5'
          }`}
        >
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                {file.type.startsWith('image/') ? (
                  <ImageIcon className="h-10 w-10 text-white" />
                ) : (
                  <FileText className="h-10 w-10 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-white text-lg">{file.name}</p>
                <p className="text-sm text-white/50">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 font-semibold"
              >
                <X className="h-4 w-4" /> {t('getStarted.menuUpload.removeFile')}
              </button>
            </div>
          ) : (
            <div>
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-white/30" />
              </div>
              <p className="text-white font-semibold text-lg mb-1">{t('getStarted.menuUpload.clickToUpload')}</p>
              <p className="text-sm text-white/40">{t('getStarted.menuUpload.fileTypes')}</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Parse Button */}
        {file && !parsedMenu && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={handleParseMenu}
              disabled={isParsing}
              className="aivora-btn flex-1 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isParsing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('getStarted.menuUpload.parsing')}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    {t('getStarted.menuUpload.parseButton')}
                  </>
                )}
              </span>
              <span className="btn-bg-svg">
                <svg width="100%" height="100%" viewBox="0 0 484 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="484" height="60" fill="url(#parse_btn_grad)" />
                  <defs>
                    <radialGradient id="parse_btn_grad" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FF7A00" />
                      <stop offset="1" stopColor="#0D0907" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        )}

        {parseError && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{t('getStarted.menuUpload.parseError')}</p>
          </div>
        )}
      </div>

      {/* Parsed Result */}
      {parsedMenu && (
        <div className="glass-card rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-400 text-lg mb-2">{t('getStarted.menuUpload.successTitle')}</h3>
              <p className="text-white/60 mb-4">
                {t('getStarted.menuUpload.itemsFound', { items: totalItems, categories: totalCategories })}
              </p>

              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-sm text-[#FF7A00] font-semibold hover:underline"
              >
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {showDetails ? t('getStarted.menuUpload.hideDetails') : t('getStarted.menuUpload.viewParsed')}
              </button>

              {showDetails && parsedMenu.categories && (
                <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-2">
                  {parsedMenu.categories.map((cat: any, catIdx: number) => (
                    <div key={catIdx} className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">{cat.name || cat.name_en || `Category ${catIdx + 1}`}</h4>
                      <div className="space-y-2">
                        {cat.items?.map((item: any, itemIdx: number) => (
                          <div key={itemIdx} className="flex justify-between items-center text-sm">
                            <span className="text-white/70">{item.name || item.name_en}</span>
                            <span className="text-[#FF7A00] font-semibold">
                              {item.price ? `€${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}` : '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-sm text-white/40 hover:text-white/60 font-semibold"
                >
                  {t('getStarted.menuUpload.uploadDifferent')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skip Note */}
      <div className="text-center">
        <p className="text-sm text-white/40">
          {t('getStarted.menuUpload.skipNote')}
        </p>
      </div>
    </div>
  );
}
