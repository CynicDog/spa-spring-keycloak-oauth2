import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "../Context.jsx";
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </QueryClientProvider>
);
