import Slider from "react-slick";

const Category = props => {
	const settings = {
		infinite: true,
		slidesToShow: props.categories.length <= 1 ? 1 : 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		arrows: false,
		boxShadow: "0 5px 15px rgba(255, 0, 0, 0.1)",
	};
	return (
		<Slider {...settings}>
			{props.categories.map((item, index) => {
				const taskMatched = props.tasks.filter(
					task => task.category === item.categoryName
				);

				const tasks = taskMatched;
				const tasksIsCompleted = taskMatched.filter(item => item.isCompleted);
				const tasksIsNotCompleted = taskMatched.filter(
					item => !item.isCompleted
				);
				let lengthOfTasks;
				let calc;

				if (tasksIsCompleted.length < tasksIsNotCompleted.length) {
					let f = 100 / tasksIsNotCompleted.length;
					let first = f * tasksIsCompleted.length;
					let second = f * tasksIsNotCompleted.length;
					calc = (first / second) * 100;
					if (calc > 50) {
						lengthOfTasks = 100 - calc;
					} else {
						lengthOfTasks = calc;
					}
				} else if (tasksIsCompleted.length > tasksIsNotCompleted.length) {
					let f = 100 / tasksIsCompleted.length;
					let first = f * tasksIsCompleted.length;
					let second = f * tasksIsNotCompleted.length;
					calc = (second / first) * 100;
					if (calc > 50) {
						lengthOfTasks = calc;
					} else {
						lengthOfTasks = 100 - calc;
					}
				} else if (
					tasksIsCompleted.length === 0 ||
					tasksIsNotCompleted.length === 0
				) {
					lengthOfTasks = 0;
				} else if (tasksIsCompleted.length === tasksIsNotCompleted.length) {
					lengthOfTasks = 50;
				}

				return (
					<div className="category" key={index}>
						<button
							className="del-category"
							onClick={() => {
								props.value.delCategory(item.categoryName);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25"
								viewBox="0 0 20 20"
							>
								<path
									fill="#ed2525f4"
									d="M11.5 4a1.5 1.5 0 0 0-3 0h3Zm-4 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-.808 7H14.63l.808-7H4.561l1.18 10.23A2 2 0 0 0 7.728 17h2.357a1.497 1.497 0 0 0 0 1H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1h5Zm4 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Z"
								/>
							</svg>
						</button>
						<p>{tasks.length} tasks</p>
						<h2>{item.categoryName}</h2>
						<span
							style={{
								backgroundColor: item.color,
								boxShadow: `0 2px 10px ${item.color}`,
								width:
									lengthOfTasks < 0
										? `calc(100% + ${lengthOfTasks}%`
										: `calc(${lengthOfTasks}% - 1rem)`,
							}}
							className="line-fill"
						>
							<span
								style={{
									backgroundColor: item.color,
								}}
							></span>
						</span>
						<span className="line"></span>
					</div>
				);
			})}
		</Slider>
	);
};
export default Category;
