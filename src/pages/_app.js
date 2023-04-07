import Header from '@/components/header';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
