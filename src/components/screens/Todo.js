import React from "react";

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1,
			items: [],
			done: [],
			revert: [],
			input: "",
		};
	}

	removeItem = (id) => {
		let deleted_items = this.state.items.filter((item) => item.id !== id);
		this.setState({ items: deleted_items });

		let deleted_items1 = this.state.revert.filter((item) => item.id !== id);
		this.setState({ revert: deleted_items1 });
	};
	finished = (id, title) => {
		let deleted_items = this.state.items.filter((item) => item.id !== id);
		this.setState({ items: deleted_items });

		let deleted_items1 = this.state.revert.filter((item) => item.id !== id);
		this.setState({ revert: deleted_items1 });

		let new_item = {
			id: id,
			title: title,
		};
		this.setState({
			done: [...this.state.done, new_item],
		});
	};
	removeItemFinal = (id) => {
		let removed_items = this.state.done.filter((item) => item.id !== id);
		this.setState({ done: removed_items });
	};
	reverted = (id, title) => {
		let deleted_items = this.state.done.filter((item) => item.id !== id);
		this.setState({ done: deleted_items });
		let new_item = {
			id: id,
			title: title,
		};
		this.setState({
			revert: [...this.state.revert, new_item],
		});
	};
	revertItem = () => {
		return this.state.revert.map((item) => (
			<li key={item.id}>
				<h4>
					<input
						type="radio"
						onClick={() => this.finished(item.id, item.title)}
					/>{" "}
					{item.id}, {item.title}
				</h4>
				<a
					className="delete"
					href="#"
					onClick={() => this.removeItem(item.id)}
				>
					<img
						src={require("../assets/delete.svg").default}
						alt="Delete sign"
					/>
				</a>
			</li>
		));
	};
	finishedItems = () => {
		return this.state.done.map((item) => (
			<li key={item.id}>
				<h4>
					<a href="#" className="tick">
						<img
							src={require("../assets/tick-green.svg").default}
							alt="success"
						/>
					</a>
					{item.id}, {item.title}
				</h4>
				<div className="back">
					<a
						className="revert"
						href="#"
						onClick={() => this.reverted(item.id, item.title)}
					>
						<img
							src={require("../assets/revert.svg").default}
							alt="Revert sign"
						/>
					</a>
					<a
						className="delete"
						href="#"
						onClick={() => this.removeItemFinal(item.id)}
					>
						<img
							src={require("../assets/delete.svg").default}
							alt="Delete sign"
						/>
					</a>
				</div>
			</li>
		));
	};
	renderItems = () => {
		return this.state.items.map((item) => (
			<li key={item.id}>
				<h4>
					<input
						type="radio"
						onClick={() => this.finished(item.id, item.title)}
					/>
					{item.id}, {item.title}
				</h4>
				<a
					className="delete"
					href="#"
					onClick={() => this.removeItem(item.id)}
				>
					<img
						src={require("../assets/delete.svg").default}
						alt="Delete sign"
					/>
				</a>
			</li>
		));
	};
	updateItem = (e) => {
		e.preventDefault();
		let new_item = {
			id: this.state.count,
			title: this.state.input,
		};
		if (this.state.input) {
			this.setState({
				items: [...this.state.items, new_item],
				input: "",
				count: this.state.count + 1,
			});
		}
	};

	render() {
		return (
			<>
				<div className="container">
					<h1>To Do List</h1>
					<h3>Things to be done.</h3>
					<ul className="unFinished">{this.revertItem()}</ul>
					<ul className="todo">{this.renderItems()}</ul>
					<form>
						<div className="img-box">
							<img
								src={require("../assets/plus.svg").default}
								alt="Plus sign"
							/>
						</div>
						<input
							className="add"
							placeholder="Type new task"
							value={this.state.input}
							onChange={(e) =>
								this.setState({ input: e.target.value })
							}
						/>
						<button onClick={this.updateItem}>Add New</button>
					</form>
					<h3>Completed.</h3>
					<ul className="done">{this.finishedItems()}</ul>
				</div>
			</>
		);
	}
}

export default Todo;
