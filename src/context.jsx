import { Component, createContext } from "react";

const TodoContext = createContext();

class TodoProvider extends Component {
	state = {
		categories: [],
		tasks: [],
	};

	componentDidMount() {
		this.setCategoriesFromLS();
		this.setTasksFromLS();
		this.resetSelectedCategories();
		this.updateCycleDay();
	}

	updateCycleDay = () => {
		const lastUpdateTime = new Date().getTime();
		var currentTime = new Date().getTime();
		if (currentTime - lastUpdateTime >= 24 * 60 * 60 * 1000) {
			// update cycleDay
			lastUpdateTime = currentTime;
			this.resetTasksForNextDay();
		}
	};

	// Reset Tasks For Next Day
	resetTasksForNextDay = () => {
		const tasksFromLS = JSON.parse(localStorage.getItem("tasks"));
		if (tasksFromLS !== null) {
			tasksFromLS.map(item => {
				item.isCompleted = false;
			});
		}

		localStorage.setItem("tasks", JSON.stringify(tasksFromLS));
	};

	// Get Category
	getCategory = name => {
		const category = this.state.categories.find(
			item => item.categoryName === name
		);
		return category;
	};

	// Get Task
	getTask = name => {
		const task = this.state.tasks.find(item => item.taskName === name);
		return task;
	};

	// Add Task (LocalStorage)
	addTaskToLS = tasks => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	// Add Task
	handleAddTask = task => {
		this.addTaskToLS(task);
		this.setState(() => {
			return {
				tasks: task,
			};
		});
	};

	addTask = (taskName, color, category) => {
		const isDuplicated = this.getTask(taskName);
		const newTask = {
			taskName: taskName,
			isCompleted: false,
			color: color,
			category: category,
		};
		const task = [...this.state.tasks, newTask];

		if (this.state.tasks.length <= 0) {
			this.handleAddTask(task);
		} else {
			if (isDuplicated === undefined) {
				this.handleAddTask(task);
			}
		}
	};

	// Add Category (LocalStorage)
	addCategoriesToLS = categories => {
		localStorage.setItem("categories", JSON.stringify(categories));
	};

	// Add Category
	handleAddCategory = category => {
		// Add Categories (LocalStorage)
		this.addCategoriesToLS(category);
		this.setState(() => {
			return {
				categories: category,
			};
		});
	};

	addCategory = (categoryName, color) => {
		const isDuplicated = this.getCategory(categoryName);
		const newCategory = {
			categoryName: categoryName,
			color: color,
			selected: false,
		};
		const category = [...this.state.categories, newCategory];

		if (this.state.categories.length <= 0) {
			this.handleAddCategory(category);
		} else {
			if (isDuplicated === undefined) {
				this.handleAddCategory(category);
			}
		}
	};

	handleCompletedTask = (name, state) => {
		const task = this.getTask(name);
		const tasks = JSON.parse(localStorage.getItem("tasks"));

		if (state) {
			this.state.tasks.map(item => {
				if (item.taskName === task.taskName) {
					item.isCompleted = true;
				}
			});
			tasks.map(item => {
				if (item.taskName === task.taskName) {
					item.isCompleted = true;
				}
			});
		} else {
			this.state.tasks.map(item => {
				if (item.taskName === task.taskName) {
					item.isCompleted = false;
				}
				tasks.map(item => {
					if (item.taskName === task.taskName) {
						item.isCompleted = false;
					}
				});
			});
		}
		localStorage.setItem("tasks", JSON.stringify(tasks));

		this.setState(tasks => {
			return tasks;
		});
	};

	// Set Categories From LocalStorage
	setCategoriesFromLS = () => {
		const categoriesFromLS = JSON.parse(localStorage.getItem("categories"));
		if (categoriesFromLS !== null) {
			this.setState(() => {
				return {
					categories: [...categoriesFromLS],
				};
			});
		}
	};

	// Set Tasks From LocalStorage
	setTasksFromLS = () => {
		const tasks = JSON.parse(localStorage.getItem("tasks"));
		if (tasks !== null) {
			this.setState(() => {
				return {
					tasks: [...tasks],
				};
			});
		}
	};

	// Handle CheckBox
	handleCategoryCheckBox = catName => {
		const category = this.getCategory(catName);
		const categoriesFromLS = JSON.parse(localStorage.getItem("categories"));

		categoriesFromLS.map(item => {
			if (item.categoryName === category.categoryName) {
				item.selected = !item.selected;
			}
		});

		localStorage.setItem("categories", JSON.stringify(categoriesFromLS));

		this.setState(() => {
			return {
				categories: [...categoriesFromLS],
			};
		});
	};

	// Reset Selected Categories
	resetSelectedCategories = () => {
		const categories = JSON.parse(localStorage.getItem("categories"));

		if (categories !== null) {
			// Remove Selected
			categories.map(cat => {
				cat.selected = false;
			});

			// Update Selected Categories in Local Storage
			localStorage.setItem("categories", JSON.stringify(categories));

			// Update Selected Categories in State
			this.setState(() => {
				return {
					categories: [...categories],
				};
			});
		}
	};

	// Delete Category
	delCategory = categoryName => {
		const categoriesFromLS = JSON.parse(localStorage.getItem("categories"));

		const filteredCategories = categoriesFromLS.filter(
			item => item.categoryName !== categoryName
		);

		localStorage.setItem("categories", JSON.stringify(filteredCategories));

		this.setState(() => {
			return {
				categories: [...filteredCategories],
			};
		});
	};

	// Delete Task
	delTask = taskName => {
		const tasksFromLS = JSON.parse(localStorage.getItem("tasks"));

		const filteredTasks = tasksFromLS.filter(
			item => item.taskName !== taskName
		);

		localStorage.setItem("tasks", JSON.stringify(filteredTasks));

		this.setState(() => {
			return {
				tasks: [...filteredTasks],
			};
		});
	};

	render() {
		return (
			<TodoContext.Provider
				value={{
					...this.state,
					addTask: this.addTask,
					getCategory: this.getCategory,
					addCategory: this.addCategory,
					getTask: this.getTask,
					handleCompletedTask: this.handleCompletedTask,
					handleCategoryCheckBox: this.handleCategoryCheckBox,
					resetSelectedCategories: this.resetSelectedCategories,
					delCategory: this.delCategory,
					delTask: this.delTask,
				}}
			>
				{this.props.children}
			</TodoContext.Provider>
		);
	}
}

const TodoConsumer = TodoContext.Consumer;

export { TodoProvider, TodoConsumer };
