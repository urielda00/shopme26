import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import HomePage from './pages/HomePage';
import AdminRoute from './utils/AuthPaths/AdminRoute';
import UserRoute from './utils/AuthPaths/UserRoute';
import Construction from './components/Construction';
import NotFoundPage from './pages/NotFound';

// Lazy load user pages
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CheckOutPage = lazy(() => import('./pages/CheckoutPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const ResetPassPage = lazy(() => import('./pages/ResetPassPage'));
const ForgotPassPage = lazy(() => import('./pages/ForgotPassPage'));
const CartPage = lazy(() => import('./pages/cart/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));

// Lazy load admin pages
const CreateItem = lazy(() => import('./pages/AdminPages/CreateItem'));
const Update = lazy(() => import('./pages/AdminPages/Update'));
const AdminDashboardPage = lazy(() => import('./pages/AdminPages/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/AdminPages/AdminProductsPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminPages/AdminUsersPage'));
const AdminOrdersPage = lazy(() => import('./pages/AdminPages/AdminOrdersPage'));
const AdminInvoicesPage = lazy(() => import('./pages/AdminPages/AdminInvoicesPage'));

const Router = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/product/:productId' element={<ProductPage />} />
                <Route path='/productsList' element={<ProductsPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/forgetPass' element={<ForgotPassPage />} />
                <Route path='/resetPass/reset/:id/:token' element={<ResetPassPage />} />

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
                    path='/user'
                    element={
                        <UserRoute>
                            <UserDashboardPage />
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