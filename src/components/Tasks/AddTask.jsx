import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import React, { useState } from "react";
import { TodoConsumer } from "../../context";
import AddCategory from "../Home/Categories/AddCategory";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";

const AddTask = () => {
	const [openMenu, setOpenMenu] = React.useState(true);
	const [menu, setMenu] = useState(true);
	const [taskName, setTaskName] = useState("");
	const [color, setColor] = useState("#1d5eff");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	const FireNav = styled(List)({
		"& .MuiListItemButton-root": {
			paddingLeft: 24,
			paddingRight: 24,
		},
		"& .MuiListItemIcon-root": {
			minWidth: 0,
			marginRight: 16,
		},
		"& .MuiSvgIcon-root": {
			fontSize: 20,
		},
	});

	const handleSubmit = value => {
		if (taskName !== "") {
			value.addTask(taskName, color, category);
			value.resetSelectedCategories();
			const isDuplicated = value.getTask(taskName);
			if (isDuplicated !== undefined) {
				Swal.fire({
					title: "Error!",
					text: "This task is duplicated",
					icon: "error",
					confirmButtonText: "Ok",
				});
			}
		} else {
			Swal.fire({
				title: "Error!",
				text: "Please add task name",
				icon: "error",
				confirmButtonText: "Ok",
			});
		}
	};

	return (
		<TodoConsumer>
			{value => {
				return (
					<div className="add-task-container">
						{menu && (
							<div className="menu">
								<Box sx={{ display: "flex" }}>
									<ThemeProvider
										theme={createTheme({
											components: {
												MuiListItemButton: {
													defaultProps: {
														disableTouchRipple: true,
													},
												},
											},
											palette: {
												mode: "dark",
												primary: { main: "rgb(102, 157, 246)" },
												background: { paper: "rgb(5, 30, 52)" },
											},
										})}
									>
										<Paper elevation={0} sx={{ maxWidth: 256 }}>
											<FireNav component="nav" disablePadding>
												<Divider />
												<ListItem component="div" disablePadding>
													<Link to="/">
														<ListItemButton sx={{ height: 56 }}>
															<ListItemIcon>
																<Home color="primary" />
															</ListItemIcon>
															<ListItemText
																primary="Home"
																primaryTypographyProps={{
																	color: "primary",
																	fontWeight: "medium",
																	variant: "body2",
																}}
															/>
														</ListItemButton>
													</Link>
													<Tooltip title="Hide">
														<IconButton
															onClick={() => {
																setMenu(!menu);
															}}
															size="large"
															sx={{
																"& svg": {
																	color: "rgba(255,255,255,0.8)",
																	transition: "0.2s",
																	transform: "translateX(0) rotate(0)",
																},
																"&:hover, &:focus": {
																	bgcolor: "unset",
																	"& svg:first-of-type": {
																		transform:
																			"translateX(-4px) rotate(-20deg)",
																	},
																	"& svg:last-of-type": {
																		right: 0,
																		opacity: 1,
																	},
																},
																"&:after": {
																	content: '""',
																	position: "absolute",
																	height: "80%",
																	display: "block",
																	left: 0,
																	width: "1px",
																	bgcolor: "divider",
																},
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="32"
																height="32"
																viewBox="0 0 20 20"
															>
																<g fill="none">
																	<path
																		d="M2.854 2.146a.5.5 0 1 0-.708.708l3.5 3.498a8.097 8.097 0 0 0-3.366 5.046a.5.5 0 1 0 .98.204a7.09 7.09 0 0 1 3.107-4.528L7.953 8.66a3.5 3.5 0 1 0 4.886 4.886l4.307 4.308a.5.5 0 0 0 .708-.708l-15-15zm9.265 10.68A2.5 2.5 0 1 1 8.673 9.38l3.446 3.447z"
																		fill="#ffffff"
																	/>
																	<path
																		d="M10.123 8.002l3.375 3.374a3.5 3.5 0 0 0-3.374-3.374z"
																		fill="currentColor"
																	/>
																	<path
																		d="M10 6c-.57 0-1.129.074-1.666.213l-.803-.803A7.648 7.648 0 0 1 10 5c3.693 0 6.942 2.673 7.72 6.398a.5.5 0 0 1-.98.204C16.058 8.327 13.207 6 10 6z"
																		fill="currentColor"
																	/>
																</g>
															</svg>
															<ArrowRight
																sx={{
																	position: "absolute",
																	right: 4,
																	opacity: 0,
																}}
															/>
														</IconButton>
													</Tooltip>
												</ListItem>
												<Divider />
												<Box
													sx={{
														bgcolor: openMenu ? "rgba(71, 98, 130, 0.2)" : null,
														pb: openMenu ? 2 : 0,
													}}
												>
													<ListItemButton
														alignItems="flex-start"
														onClick={() => setOpenMenu(!openMenu)}
														sx={{
															px: 3,
															pt: 2.5,
															pb: openMenu ? 0 : 2.5,
															"&:hover, &:focus": {
																"& svg": { opacity: openMenu ? 1 : 0 },
															},
														}}
													>
														<ListItemText
															primary="Categories"
															primaryTypographyProps={{
																fontSize: 15,
																fontWeight: "medium",
																lineHeight: "20px",
																mb: "2px",
															}}
															secondary={value.categories.map(item => {
																return `${item.categoryName}..`;
															})}
															secondaryTypographyProps={{
																noWrap: true,
																fontSize: 12,
																lineHeight: "16px",
																color: openMenu
																	? "rgba(0,0,0,0)"
																	: "rgba(255,255,255,0.5)",
															}}
															sx={{ my: 0 }}
														/>
														<KeyboardArrowDown
															sx={{
																mr: -1,
																opacity: 0,
																transform: openMenu
																	? "rotate(-180deg)"
																	: "rotate(0)",
																transition: "0.2s",
															}}
														/>
													</ListItemButton>
													{openMenu && (
														<div className="categories-list">
															{value.categories.map((item, index) => {
																return (
																	<span
																		key={index}
																		className="category"
																		onClick={e => {
																			setCategory(item.categoryName);
																			setCategories([
																				...categories,
																				e.target.textContent,
																			]);
																			value.handleCategoryCheckBox(
																				item.categoryName
																			);
																		}}
																	>
																		{<Checkbox checked={item.selected} />}
																		{item.categoryName}
																	</span>
																);
															})}
														</div>
													)}
												</Box>
											</FireNav>
										</Paper>
									</ThemeProvider>
								</Box>
							</div>
						)}
						<div className="add-task-input">
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
									onClick={() => {
										setMenu(!menu);
									}}
								>
									<MenuIcon />
								</IconButton>
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
										setTaskName(e.target.value);
									}}
									sx={{ ml: 1, flex: 1 }}
									placeholder="Add task"
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
							<AddCategory />
						</div>
					</div>
				);
			}}
		</TodoConsumer>
	);
};

export default AddTask;
