import NavBar from "./components/navBar/NavBar";
import Router from "./Router";
import AuthBootstrap from "./components/AuthBootstrap";
import RenderWakeupNotice from "./components/RenderWakeupNotice";

const App = () => {
	return (
		<>
			<AuthBootstrap />
			<RenderWakeupNotice />
			<NavBar />

			<main>
				<Router />
			</main>
		</>
	);
};

export default App;