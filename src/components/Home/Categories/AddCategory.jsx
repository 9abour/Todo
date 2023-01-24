import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { TodoConsumer } from "../../../context";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const AddCategory = () => {
	const [addCategory, setAddCategory] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [color, setColor] = useState("#1d5eff");

	const handleSubmit = value => {
		if (categoryName !== "") {
			value.addCategory(categoryName, color);
			const isDuplicated = value.getCategory(categoryName);
			if (isDuplicated === undefined) {
				setAddCategory(false);
			} else {
				Swal.fire({
					title: "Error!",
					text: "This category is duplicated",
					icon: "error",
					confirmButtonText: "Ok",
				});
			}
		} else {
			Swal.fire({
				title: "Error!",
				text: "Please add category name",
				icon: "error",
				confirmButtonText: "Ok",
			});
		}
	};

	return (
		<TodoConsumer>
			{value => {
				return (
					<div className="add-category">
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setAddCategory(!addCategory);
							}}
						>
							{addCategory ? "Close" : "+ Add Category"}
						</Button>
						{addCategory && (
							<Paper
								onSubmit={e => {
									e.preventDefault();
									handleSubmit(value);
								}}
								component="form"
								sx={{
									p: "2px 4px",
									display: "flex",
									alignItems: "center",
									width: 350,
								}}
							>
								<IconButton
									type="button"
									sx={{ p: "10px" }}
									aria-label="search"
								>
									<input
										type="color"
										className="input-color"
										defaultValue="#1d5eff"
										onChange={e => {
											setColor(e.target.value);
										}}
									/>
								</IconButton>
								<InputBase
									onChange={e => {
										setCategoryName(e.target.value);
									}}
									sx={{ ml: 1, flex: 1 }}
									placeholder="Add Category"
								/>
								<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
								<IconButton
									onClick={() => {
										handleSubmit(value);
									}}
									color="primary"
									sx={{ p: "10px" }}
									aria-label="directions"
								>
									<AddIcon />
								</IconButton>
							</Paper>
						)}
					</div>
				);
			}}
		</TodoConsumer>
	);
};

export default AddCategory;
