import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import HomePage from './pages/HomePage';
import CartPage from './pages/cart/CartPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/contact/ContactPage';
import RegisterPage from './pages/RegisterPage';
import Construction from './components/Construction';
import NotFoundPage from './pages/NotFound';
import ProductsPage from './pages/ProductsPage';
import AdminRoute from './utils/AuthPaths/AdminRoute';
import UserRoute from './utils/AuthPaths/UserRoute';
import CreateItem from './pages/AdminPages/CreateItem';
import Update from './pages/AdminPages/Update';
import AdminDashboardPage from './pages/AdminPages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminPages/AdminProductsPage';
import AdminUsersPage from './pages/AdminPages/AdminUsersPage';
import AdminOrdersPage from './pages/AdminPages/AdminOrdersPage';
import AdminInvoicesPage from './pages/AdminPages/AdminInvoicesPage';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const CheckOutPage = lazy(() => import('./pages/CheckoutPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const ResetPassPage = lazy(() => import('./pages/ResetPassPage'));
const ForgotPassPage = lazy(() => import('./pages/ForgotPassPage'));

const Router = () => {
    return (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>Loading...</div>}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/resetPass/:id/:token' element={<ResetPassPage />} />
                <Route path='/forgetPass' element={<ForgotPassPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/product/:productId' element={<ProductPage />} />
                <Route path='/productsList' element={<ProductsPage />} />

                <Route
                    path='/checkout'
                    element={
                        <UserRoute>
                            <CheckOutPage />
                        </UserRoute>
                    }
                />

                <Route
                    path='/thankYou'
                    element={
                        <UserRoute>
                            <ThankYouPage />
                        </UserRoute>
                    }
                />

                <Route
                    path='/admin/dashboard'
                    element={
                        <AdminRoute>
                            <AdminDashboardPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path='/admin/products'
                    element={
                        <AdminRoute>
                            <AdminProductsPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path='/admin/users'
                    element={
                        <AdminRoute>
                            <AdminUsersPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path='/admin/orders'
                    element={
                        <AdminRoute>
                            <AdminOrdersPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path='/admin/invoices'
                    element={
                        <AdminRoute>
                            <AdminInvoicesPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path='/admin/products/create'
                    element={
                        <AdminRoute>
                            <CreateItem />
                        </AdminRoute>
                    }
                />

                <Route
                    path='/admin/products/update'
                    element={
                        <AdminRoute>
                            <Update />
                        </AdminRoute>
                    }
                />

                <Route path='/underConstruction' element={<Construction />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
