import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Loader2, FileText, Image as ImageIcon, CheckCircle, X } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setParsedMenu(null);
    setParseError('');
    onUpdate({ _menuFile: selectedFile, parsedMenu: null });
    
    // Auto-start parsing
    setIsParsing(true);
    
    try {
      let menuData: string;

      if (selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf') {
        menuData = await fileToBase64(selectedFile);
      } else {
        menuData = await selectedFile.text();
      }

      // For now, store the file and mark as "pending manual processing"
      // The actual AI parsing will be done server-side after submission
      // Show a simulated success for UX
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      const mockParsedMenu = {
        status: 'pending',
        message: 'Menu uploaded successfully. Our team will process it within 24 hours.',
        categories: []
      };
      
      setParsedMenu(mockParsedMenu);
      onUpdate({ parsedMenu: mockParsedMenu, _menuFile: selectedFile, menuBase64: menuData });
    } catch (error) {
      console.error('Menu processing failed:', error);
      setParseError('Failed to process menu. Please try again.');
    } finally {
      setIsParsing(false);
    }
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

  const removeFile = () => {
    setFile(null);
    setParsedMenu(null);
    setParseError('');
    onUpdate({ _menuFile: null, parsedMenu: null });
  };

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
              {isParsing ? (
                <>
                  <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                    <Loader2 className="h-10 w-10 text-white animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white text-lg">{t('getStarted.menuUpload.parsing')}</p>
                    <p className="text-sm text-white/50">{file.name}</p>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
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

        {/* Auto-parsing happens on file select */}

        {parseError && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{t('getStarted.menuUpload.parseError')}</p>
          </div>
        )}
      </div>

      {/* Upload Success */}
      {parsedMenu && (
        <div className="glass-card rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-400 text-lg mb-2">{t('getStarted.menuUpload.successTitle')}</h3>
              <p className="text-white/60 mb-4">
                {t('getStarted.menuUpload.successDescription')}
              </p>

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
