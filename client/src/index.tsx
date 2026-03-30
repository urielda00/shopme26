import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { store, persistor } from './app/store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename='/'>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);