import { useLocation } from 'react-router-dom';
import { CheckCircle2, Globe, Mail, ArrowRight } from 'lucide-react';

export function Success() {
  const location = useLocation();
  const result = location.state as any;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No setup data found. Please complete the wizard first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Helmies Bites!
          </h1>
          <p className="text-gray-600">
            Your restaurant website is now live and ready to take orders
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Your Website is Live</h2>

          <div className="space-y-4">
            <a
              href={result.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Your Website</p>
                  <p className="text-sm text-gray-500">{result.siteUrl}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </a>

            <a
              href={result.adminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Admin Dashboard</p>
                  <p className="text-sm text-gray-500">{result.adminUrl}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </a>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-900">
              <strong>Login credentials have been sent to your email.</strong> Check your inbox
              for your username and password.
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Questions? Contact us at support@helmiesbites.fi</p>
        </div>
      </div>
    </div>
  );
}
