import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodoProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<TodoProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</TodoProvider>
	</React.StrictMode>
);
