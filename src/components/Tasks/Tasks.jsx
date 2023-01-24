import Task from "./Task";
import { TodoConsumer } from "../../context";

const Tasks = () => {
	return (
		<div className="tasks-container">
			<p>Today's Tasks</p>
			<div className="tasks">
				<TodoConsumer>
					{value => {
						return <Task tasks={value.tasks} value={value} />;
					}}
				</TodoConsumer>
			</div>
		</div>
	);
};
export default Tasks;
