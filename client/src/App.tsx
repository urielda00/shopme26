import NavBar from './components/navBar/NavBar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
// import { ReactQueryDevtools } from 'react-query/devtools';
import AdminController from './components/AdminController';
import Router from './Router';

const App = () => {
    const { pathname } = useLocation();

    // In Vite, use import.meta.env instead of process.env
    // Ensure the variable in your .env starts with VITE_
    const backUrl = import.meta.env.VITE_BASE_BACK_URL;

    return (
        <>
            <NavBar />
            <AdminController />
            
            <main> {/* Recommended for SEO and layout structure */}
                <Router />
            </main>

            <ScrollToTop />
            {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
            
            {/* Cleaner conditional rendering */}
            {pathname !== '/productsList' && <Footer />}
        </>
    );
};

export default App;