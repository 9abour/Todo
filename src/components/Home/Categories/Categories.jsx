import { TodoConsumer } from "../../../context";
import Category from "./Category";

const Categories = () => {
	return (
		<>
			<p>Categories</p>
			<div className="categories">
				<TodoConsumer>
					{value => {
						return (
							<Category categories={value.categories} tasks={value.tasks} />
						);
					}}
				</TodoConsumer>
			</div>
		</>
	);
};
export default Categories;
