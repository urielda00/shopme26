import NavBar from "./components/navBar/NavBar";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./Router";
import AuthBootstrap from "./components/AuthBootstrap";

const App = () => {
	const { pathname } = useLocation();

	return (
		<>
			<AuthBootstrap />
			<NavBar />

			<main>
				<Router />
			</main>

			<ScrollToTop />
		</>
	);
};

export default App;
