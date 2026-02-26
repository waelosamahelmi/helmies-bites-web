import { useEffect, useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function ThemeSelectionStep({ data, sessionId, onUpdate }: Props) {
  const [themes, setThemes] = useState<any[]>([]);
  const [selectedTheme, setSelectedTheme] = useState(data.themeId || null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    // For now, use hardcoded themes
    setThemes([
      { id: 'modern-orange', name: 'Modern Orange', preview: '#FF8C00', category: 'modern' },
      { id: 'elegant-dark', name: 'Elegant Dark', preview: '#1a1a1a', category: 'elegant' },
      { id: 'fresh-green', name: 'Fresh Green', preview: '#22c55e', category: 'fresh' },
      { id: 'ocean-blue', name: 'Ocean Blue', preview: '#3b82f6', category: 'modern' },
      { id: 'rustic-warm', name: 'Rustic Warm', preview: '#b45309', category: 'rustic' },
    ]);
  };

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    onUpdate({ themeId, theme });
  };

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    onUpdate({ theme: { aiGenerated: true } });
    setIsGeneratingAI(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Choose Your Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSelectTheme(theme.id)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedTheme === theme.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-full h-20 rounded mb-3"
                style={{ backgroundColor: theme.preview }}
              />
              <p className="font-medium text-gray-900">{theme.name}</p>
              <p className="text-xs text-gray-500 capitalize">{theme.category}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Or Create with AI</h3>
        <button
          onClick={handleAIGenerate}
          disabled={isGeneratingAI}
          className="w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors flex items-center justify-center gap-2 text-gray-700 hover:text-orange-600"
        >
          {isGeneratingAI ? (
            <>Generating AI theme...</>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Unique AI Theme (€5)
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong>Need something different?</strong> After setup, you can customize colors, fonts,
          and layouts in your admin dashboard.
        </p>
      </div>
    </div>
  );
}
