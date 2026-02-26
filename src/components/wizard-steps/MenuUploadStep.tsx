import { useState, useRef } from 'react';
import { Upload, Loader2, FileText, Image as ImageIcon, Sparkles, CheckCircle, Info } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function MenuUploadStep({ sessionId, onUpdate }: Props) {
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
      alert('Failed to parse menu. Please try again or upload a different file.');
    } finally {
      setIsParsing(false);
    }
  };

  const supportedFormats = [
    { name: 'PDF', icon: '📄' },
    { name: 'PNG', icon: 'image' },
    { name: 'JPG', icon: 'image' },
  ];

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div className="glass-card rounded-2xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Menu</h3>
          <p className="text-gray-600">
            Upload a PDF or image of your menu. Our AI will extract all items, prices, and create translations.
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
                Remove file
              </button>
            </div>
          ) : (
            <div>
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, PNG, JPG up to 10MB</p>
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
                  Parsing your menu with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Parse Menu with AI
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
              Choose Different File
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
              <h3 className="font-bold text-green-900 text-lg mb-2">Menu Parsed Successfully!</h3>
              <p className="text-green-700 mb-4">
                Our AI found {parsedMenu.items?.length || 0} items in {parsedMenu.categories?.length || 0} categories
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge bg-green-100 text-green-700 border-green-200">Finnish</span>
                <span className="badge bg-green-100 text-green-700 border-green-200">English</span>
                <span className="badge bg-green-100 text-green-700 border-green-200">Swedish</span>
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
            <h3 className="font-bold text-gray-900">Supported Formats</h3>
            <p className="text-sm text-gray-500">We accept these file types</p>
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
        <h3 className="font-bold gradient-text-warm mb-3">Tips for Best Results</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Upload a clear, high-resolution image or well-formatted PDF
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Ensure prices are clearly visible next to each item
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Keep categories (appetizers, mains, etc.) well organized
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Our AI will automatically translate to Finnish, English, and Swedish
          </li>
        </ul>
      </div>

      {/* Manual Option */}
      <div className="text-center">
        <p className="text-gray-600 mb-3">Don't have a digital menu?</p>
        <button className="btn-secondary">
          Create Menu Manually Instead
        </button>
      </div>
    </div>
  );
}
