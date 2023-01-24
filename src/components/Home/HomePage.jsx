import Categories from "./Categories/Categories";
import Tasks from "../Tasks/Tasks";
import "../Styles/sass/_index.scss";
import "../Styles/HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<main className="home-page">
			<h1 className="main-title">What's up</h1>
			<Categories />
			<Tasks />
			<Link to="/add-task" className="add-task-btn main-btn btn-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
				>
					<path fill="#ffffff" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
				</svg>
			</Link>
		</main>
	);
};

export default HomePage;
