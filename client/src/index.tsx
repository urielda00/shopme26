import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from 'react-query';

// Import the store and the ALREADY created persistor
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