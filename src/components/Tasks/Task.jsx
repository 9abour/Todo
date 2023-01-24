import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";

const Task = props => {
	return props.tasks.map((task, index) => {
		const BpIcon = styled("span")(({ theme }) => ({
			borderRadius: 3,
			width: 18,
			height: 18,
			borderRadius: 50,
			boxShadow: `0 0 0 2px ${task.isCompleted ? "#858ea7" : task.color}`,
			backgroundColor: props.tasks.color,
			backgroundImage:
				theme.palette.mode === "dark"
					? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
					: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
			".Mui-focusVisible &": {
				outline: "2px auto rgba(19,124,189,.6)",
				outlineOffset: 2,
			},
			"input:hover ~ &": {
				backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
			},
			"input:disabled ~ &": {
				boxShadow: "none",
				background:
					theme.palette.mode === "dark"
						? "rgba(57,75,89,.5)"
						: "rgba(206,217,224,.5)",
			},
		}));

		const BpCheckedIcon = styled(BpIcon)({
			backgroundColor: "#858ea7",
			backgroundImage:
				"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
			"&:before": {
				display: "block",
				width: 18,
				height: 18,
				borderRadius: 50,
				boxShadow: `0 0 0 2px #858ea7`,
				backgroundImage:
					"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
					" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
					"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
				content: '""',
			},
			"input:hover ~ &": {
				backgroundColor: "#858ea7",
			},
		});
		return (
			<div className="task" key={index}>
				<Checkbox
					onClick={e => {
						props.value.handleCompletedTask(task.taskName, e.target.checked);
					}}
					sx={{
						"&:hover": { bgcolor: "transparent" },
					}}
					disableRipple
					color="default"
					checkedIcon={<BpCheckedIcon />}
					icon={<BpIcon />}
					checked={task.isCompleted ? true : false}
					inputProps={{ "aria-label": "Checkbox demo" }}
					{...props}
				/>
				<p
					className="task-name"
					style={{
						textDecoration: task.isCompleted ? "line-through" : "none",
					}}
				>
					{task.taskName}
				</p>
			</div>
		);
	});
};

export default Task;
