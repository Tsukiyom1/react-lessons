import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Data from "./container/data/Data";
import Contact from "./components/contact/Contact";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='/contact' element={<Data />} />
						<Route index element={<Contact />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
