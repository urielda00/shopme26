import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Regular imports for core and frequently accessed pages
import HomePage from './pages/HomePage';
import CartPage from './pages/cart/CartPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/contact/ContactPage';
import RegisterPage from './pages/RegisterPage';
import Construction from './components/Construction';
// import NotFoundPage from './pages/NotFoundPage';
// import ProductsListPage from './pages/ProductsListPage';

// Lazy imports for other pages
// const ProductPage = lazy(() => import('./pages/ProductPage'));
// const CheckOutPage = lazy(() => import('./pages/CheckOutPage'));
// const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
// const ResetPassPage = lazy(() => import('./pages/ResetPassPage'));
// const ForgotPassPage = lazy(() => import('./pages/ForgotPassPage'));
// const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));

// Admin Pages
// const UpdatePage = lazy(() => import('./pages/AdminPages/UpdatePage'));
// const CreateItemPage = lazy(() => import('./pages/AdminPages/CreateItemPage'));
// const DeleteItemPage = lazy(() => import('./pages/AdminPages/DeleteItemPage'));

// // Auth guards
// import UserAuth from './utils/AuthPaths/UserAuth';
// import AdminAuth from './utils/AuthPaths/AdminAuth';

const Router = () => {
	return (
		<Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>Loading...</div>}>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/contact' element={<ContactPage />} />
				{/* <Route path='/checkout' element={<CheckOutPage />} /> */}
				<Route path='/register' element={<RegisterPage />} />
				{/* <Route path='/thankYou' element={<ThankYouPage />} />
				<Route path='/forgetPass' element={<ForgotPassPage />} />
				<Route path='/productsList' element={<ProductsListPage />} />
				<Route path='/product/:productId' element={<ProductPage />} />
				<Route path='/resetPass/:id/:token' element={<ResetPassPage />} /> */}

				{/* <Route
					path='/user'
					element={
						<UserAuth>
							<UserDashboardPage />
						</UserAuth>
					}
				/>

				<Route
					path='/createItem'
					element={
						<AdminAuth>
							<CreateItemPage />
						</AdminAuth>
					}
				/>

				<Route
					path='/updateItem'
					element={
						<AdminAuth>
							<UpdatePage />
						</AdminAuth>
					}
				/>

				<Route
					path='/deleteItem'
					element={
						<AdminAuth>
							<DeleteItemPage />
						</AdminAuth>
					}
				/> */}
				<Route path='underConstruction' element={<Construction />} />
				<Route path='*' element={<Construction />} />{/*<NotFoundPage />*/}
			</Routes>
		</Suspense>
	);
};

export default Router;