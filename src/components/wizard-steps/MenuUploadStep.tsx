import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Loader2, FileText, Image as ImageIcon, Sparkles, CheckCircle, Info } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function MenuUploadStep({ sessionId, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedMenu, setParsedMenu] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setParsedMenu(null);
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
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
      handleFileSelect(droppedFile);
    }
  };

  const handleParseMenu = async () => {
    if (!file || !sessionId) return;

    setIsParsing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/wizard/parse-menu', {
        method: 'POST',
        headers: {
          'X-Session-ID': sessionId,
        },
        body: formData,
      });

      const result = await response.json();
      setParsedMenu(result.menu);
      onUpdate({ menu: result.menu });
    } catch (error) {
      console.error('Menu parsing failed:', error);
      alert(t('menuUpload.errors.parseFailed'));
    } finally {
      setIsParsing(false);
    }
  };

  const supportedFormats = [
    { name: 'PDF', icon: '\u{1F4C4}' },
    { name: 'PNG', icon: 'image' },
    { name: 'JPG', icon: 'image' },
  ];

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div className="glass-card rounded-2xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('menuUpload.title')}</h3>
          <p className="text-gray-600">
            {t('menuUpload.description')}
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-orange-500 bg-orange-50/50 scale-[1.02]'
              : file
              ? 'border-orange-400 bg-orange-50/30'
              : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/20'
          }`}
        >
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                {file.type.includes('image') ? (
                  <ImageIcon className="h-10 w-10 text-white" />
                ) : (
                  <FileText className="h-10 w-10 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setParsedMenu(null);
                }}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                {t('menuUpload.dropZone.removeFile')}
              </button>
            </div>
          ) : (
            <div>
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-1">{t('menuUpload.dropZone.clickToUpload')}</p>
              <p className="text-sm text-gray-500">{t('menuUpload.dropZone.fileTypes')}</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Action Buttons */}
        {file && !parsedMenu && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleParseMenu}
              disabled={isParsing}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isParsing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t('menuUpload.parsing.inProgress')}
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  {t('menuUpload.parsing.button')}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setParsedMenu(null);
              }}
              className="btn-secondary"
            >
              {t('menuUpload.parsing.chooseDifferent')}
            </button>
          </div>
        )}
      </div>

      {/* Success State */}
      {parsedMenu && (
        <div className="glass-card rounded-2xl p-6 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 text-lg mb-2">{t('menuUpload.success.title')}</h3>
              <p className="text-green-700 mb-4">
                {t('menuUpload.success.itemsFound', { items: parsedMenu.items?.length || 0, categories: parsedMenu.categories?.length || 0 })}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge bg-green-100 text-green-700 border-green-200">{t('menuUpload.success.languages.finnish')}</span>
                <span className="badge bg-green-100 text-green-700 border-green-200">{t('menuUpload.success.languages.english')}</span>
                <span className="badge bg-green-100 text-green-700 border-green-200">{t('menuUpload.success.languages.swedish')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{t('menuUpload.supportedFormats.title')}</h3>
            <p className="text-sm text-gray-500">{t('menuUpload.supportedFormats.description')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {supportedFormats.map((format) => (
            <div
              key={format.name}
              className="text-center p-4 rounded-xl bg-white/50 border border-gray-200"
            >
              <span className="text-2xl">{format.icon === 'image' ? 'image' : format.icon}</span>
              <p className="text-sm font-semibold text-gray-700 mt-2">{format.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-orange-50 to-pink-50">
        <h3 className="font-bold gradient-text-warm mb-3">{t('menuUpload.tips.title')}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">&bull;</span>
            {t('menuUpload.tips.tip1')}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">&bull;</span>
            {t('menuUpload.tips.tip2')}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">&bull;</span>
            {t('menuUpload.tips.tip3')}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">&bull;</span>
            {t('menuUpload.tips.tip4')}
          </li>
        </ul>
      </div>

      {/* Manual Option */}
      <div className="text-center">
        <p className="text-gray-600 mb-3">{t('menuUpload.manual.prompt')}</p>
        <button className="btn-secondary">
          {t('menuUpload.manual.button')}
        </button>
      </div>
    </div>
  );
}
