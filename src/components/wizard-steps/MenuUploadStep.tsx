import { useState, useRef } from 'react';
import { Upload, Loader2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function MenuUploadStep({ sessionId, onUpdate }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedMenu, setParsedMenu] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setParsedMenu(null);
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

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Your Menu <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Upload a PDF or image of your menu. Our AI will extract all items, prices, and create translations.
        </p>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors"
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              {file.type.includes('image') ? (
                <ImageIcon className="h-8 w-8 text-orange-600" />
              ) : (
                <FileText className="h-8 w-8 text-orange-600" />
              )}
              <span className="font-medium text-gray-900">{file.name}</span>
            </div>
          ) : (
            <div>
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
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
      </div>

      {file && !parsedMenu && (
        <div className="flex gap-3">
          <button
            onClick={handleParseMenu}
            disabled={isParsing}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isParsing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Parsing menu...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Parse with AI
              </>
            )}
          </button>
          <button
            onClick={() => {
              setFile(null);
              setParsedMenu(null);
            }}
            className="px-6 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      )}

      {parsedMenu && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">Menu Parsed Successfully!</h3>
          <p className="text-sm text-green-700 mb-3">
            Found {parsedMenu.items?.length || 0} items in {parsedMenu.categories?.length || 0} categories
          </p>
          <div className="text-xs text-green-600">
            Translated to: Finnish, English, Swedish
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> For best results, upload a clear, high-resolution image or a well-formatted PDF.
          Our AI works best with menus that clearly show prices and categories.
        </p>
      </div>
    </div>
  );
}
