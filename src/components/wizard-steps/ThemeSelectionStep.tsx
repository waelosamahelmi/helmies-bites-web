import { useEffect, useState } from 'react';
import { Sparkles, Palette, Check } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

interface Theme {
  id: string;
  name: string;
  description: string;
  gradient: string;
  previewColors: string[];
  category: string;
}

export function ThemeSelectionStep({ data, onUpdate }: Props) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState(data.themeId || null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    setThemes([
      {
        id: 'modern-orange',
        name: 'Modern Orange',
        description: 'Bold and energetic',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        previewColors: ['#f97316', '#fb923c', '#fed7aa', '#fff7ed'],
        category: 'modern',
      },
      {
        id: 'elegant-dark',
        name: 'Elegant Dark',
        description: 'Sophisticated and refined',
        gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        previewColors: ['#1e293b', '#334155', '#475569', '#64748b'],
        category: 'elegant',
      },
      {
        id: 'fresh-green',
        name: 'Fresh Green',
        description: 'Natural and healthy',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        previewColors: ['#22c55e', '#4ade80', '#86efac', '#dcfce7'],
        category: 'fresh',
      },
      {
        id: 'ocean-blue',
        name: 'Ocean Blue',
        description: 'Calm and professional',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        previewColors: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
        category: 'modern',
      },
      {
        id: 'berry-blend',
        name: 'Berry Blend',
        description: 'Playful and vibrant',
        gradient: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
        previewColors: ['#d946ef', '#e879f9', '#f0abfc', '#fae8ff'],
        category: 'vibrant',
      },
      {
        id: 'rustic-warm',
        name: 'Rustic Warm',
        description: 'Cozy and inviting',
        gradient: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
        previewColors: ['#b45309', '#d97706', '#fbbf24', '#fef3c7'],
        category: 'rustic',
      },
      {
        id: 'royal-purple',
        name: 'Royal Purple',
        description: 'Luxurious and bold',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        previewColors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe'],
        category: 'elegant',
      },
      {
        id: 'sunset-coral',
        name: 'Sunset Coral',
        description: 'Warm and welcoming',
        gradient: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
        previewColors: ['#f472b6', '#fda4af', '#fb923c', '#fed7aa'],
        category: 'vibrant',
      },
    ]);
  };

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    onUpdate({ themeId, theme });
  };

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onUpdate({ theme: { aiGenerated: true }, themeId: 'ai-generated' });
    setSelectedTheme('ai-generated');
    setIsGeneratingAI(false);
  };

  const categories = Array.from(new Set(themes.map(t => t.category)));

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="feature-icon w-12 h-12">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Choose Your Theme</h3>
            <p className="text-sm text-gray-500">Select a design that matches your brand</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-4 py-2 rounded-full text-sm font-bold gradient-bg text-white">
            All Themes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-bold bg-white/80 border border-gray-200 text-gray-700 hover:border-orange-400 transition-colors capitalize"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={`relative group rounded-3xl overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-orange-500 shadow-xl scale-105'
                    : 'glass-card-hover glass-card'
                }`}
              >
                {/* Theme Preview Card */}
                <div className="aspect-square relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ background: theme.gradient }}
                  />
                  {/* Preview Colors */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-1">
                      {theme.previewColors.slice(0, 4).map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Selected Overlay */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  )}
                </div>

                {/* Theme Info */}
                <div className="p-4 bg-white">
                  <p className="font-bold text-gray-900">{theme.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{theme.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Theme Generation */}
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold gradient-text mb-2">Create a Unique AI Theme</h3>
          <p className="text-gray-600 mb-6">
            Let our AI design a one-of-a-kind theme based on your restaurant's personality and cuisine
          </p>
          <button
            onClick={handleAIGenerate}
            disabled={isGeneratingAI}
            className="btn-primary w-full sm:w-auto"
          >
            {isGeneratingAI ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating AI theme...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Unique Theme (€5)
              </>
            )}
          </button>
          {selectedTheme === 'ai-generated' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold">
              <Check className="h-5 w-5" />
              AI theme selected
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Palette className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Customize Later</h4>
            <p className="text-sm text-gray-600">
              Not sure? You can always change colors, fonts, and layouts from your admin dashboard after setup.
              Our themes are fully customizable!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loader2 component for AI generation
function Loader2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
