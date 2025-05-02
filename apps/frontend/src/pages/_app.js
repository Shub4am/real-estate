import Header from '@/components/header';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Wrap the app with necessary information for development
function AppContent({ Component, pageProps }) {
  const { authInitialized } = useAuth();
  const router = useRouter();
  const [backendStatus, setBackendStatus] = useState('checking');
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Display a development notice if Firebase is not configured
  useEffect(() => {
    if (isDevelopment && !authInitialized) {
      toast.info(
        'Firebase not configured. Create .env.local with Firebase credentials to enable authentication.',
        { autoClose: false }
      );
    }
  }, [authInitialized, isDevelopment]);

  // Check backend status only in development
  useEffect(() => {
    const checkBackendStatus = async () => {
      if (!isDevelopment) return;
      
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
          toast.warning('Backend service is not available. Some features might not work properly.', 
            { autoClose: false });
        }
      } catch (error) {
        setBackendStatus('offline');
        toast.warning('Backend service is not available. Some features might not work properly.', 
          { autoClose: false });
      }
    };

    checkBackendStatus();
  }, [isDevelopment]);

  return (
    <>
      <Header />
      <Component {...pageProps} backendStatus={backendStatus} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AuthProvider>
        <PropertyProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </PropertyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
