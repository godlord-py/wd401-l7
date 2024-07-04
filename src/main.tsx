import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'rsuite/dist/rsuite.min.css'
import * as Sentry from "@sentry/react";
import "/home/godlord/capstone301/sportnewsapp/src/i18n.ts"

Sentry.init({
  dsn: "https://2cffd16480c0b37b5cf5fae416535d6a@o4507533446283264.ingest.us.sentry.io/4507538538102784",
  integrations: [
    Sentry.browserTracingIntegration(),
  
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')).render(  
       <App />
)
