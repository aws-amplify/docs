import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@aws-amplify/ui-react/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
