import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { RestaurantInfoStep } from '@/components/wizard-steps/RestaurantInfoStep';
import { MenuUploadStep } from '@/components/wizard-steps/MenuUploadStep';
import { ThemeSelectionStep } from '@/components/wizard-steps/ThemeSelectionStep';
import { DomainSetupStep } from '@/components/wizard-steps/DomainSetupStep';
import { ReviewConfirmStep } from '@/components/wizard-steps/ReviewConfirmStep';

const steps = [
  { id: 'restaurant-info', title: 'Restaurant Info', component: RestaurantInfoStep },
  { id: 'menu-upload', title: 'Menu', component: MenuUploadStep },
  { id: 'theme', title: 'Theme', component: ThemeSelectionStep },
  { id: 'domain', title: 'Domain', component: DomainSetupStep },
  { id: 'review', title: 'Review', component: ReviewConfirmStep },
];

export function StartWizard() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [wizardData, setWizardData] = useState<any>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CurrentStepComponent = steps[currentStepIndex].component;

  const updateData = (newData: any) => {
    setWizardData(prev => ({ ...prev, ...newData }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      // Submit to backend
      const result = await api.post('/api/wizard/complete', {
        sessionId,
        data: wizardData,
      });

      // Navigate to success page
      navigate('/success', { state: result });
    } catch (error) {
      console.error('Failed to complete wizard:', error);
      alert('Failed to complete setup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{steps[currentStepIndex].title}</h1>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <CurrentStepComponent
            data={wizardData}
            sessionId={sessionId}
            setSessionId={setSessionId}
            onUpdate={updateData}
          />
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {currentStepIndex === steps.length - 1 ? (
            <button
              onClick={handleComplete}
              disabled={isSubmitting}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  Complete Setup
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={goToNextStep}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
