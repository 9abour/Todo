import { useSelector } from "react-redux";
import HomePage from "./components/Home/HomePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Router, Routes } from "react-router-dom";
import AddTask from "./components/Tasks/AddTask";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add-task" element={<AddTask />} />
			</Routes>
		</div>
	);
}

export default App;
