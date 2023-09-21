class TaskList {
	constructor() {
		this.todoList = document.querySelector('#todoList');
		this.doneList = document.querySelector('#doneList');
	}

	addTask(text) {
		this.task = new Task(text, this);
		this.todoList.appendChild(this.task.getWrapper());

		console.log("Adding new task \"" + text + "\" to todo list");
	}

	// Need to move this to the Task class
	moveTask(task) {
		let taskWrapper = task.getWrapper();

		console.log("Task: \"" + task.getText() + "\" is marked done: " + task.isDone);

		if (task.isDone) {
			this.todoList.removeChild(taskWrapper);
			this.doneList.appendChild(taskWrapper);
		} else {
			this.doneList.removeChild(taskWrapper);
			this.todoList.appendChild(taskWrapper);
		}
	}

	deleteTask(task) {
		let taskWrapper = task.getWrapper();

		if (task.isDone) {
			this.doneList.removeChild(taskWrapper);
		} else {
			this.todoList.removeChild(taskWrapper);
		}
	}

}


class Task {

	isDone = false;

	#taskList;
	#taskWrapper;
	#item;
	#checkBox;
	#deleteBtn;

	constructor(text, taskList) {

		this.#taskList = taskList;

		this.#item = document.createElement('p');
		this.#item.setAttribute('class', 'todo-item');
		this.setText(text);

		this.#checkBox = document.createElement('input');
		this.#checkBox.setAttribute('type', 'checkbox');
		this.#checkBox.setAttribute('class', 'todo-checkbox');
		this.#checkBox.addEventListener('click', () => this.#todoChecked(this.#checkBox.checked));

		this.#deleteBtn = document.createElement('button');
		this.#deleteBtn.setAttribute('type', 'button');
		this.#deleteBtn.setAttribute('class', 'task-delete-button');
		this.#deleteBtn.textContent = "Delete";
		this.#deleteBtn.addEventListener('click', () => this.#deleteClicked());

		this.#taskWrapper = document.createElement('div');
		this.#taskWrapper.setAttribute('class', 'todo-wrapper');
		this.#taskWrapper.appendChild(this.#checkBox);
		this.#taskWrapper.appendChild(this.#item);
		this.#taskWrapper.appendChild(this.#deleteBtn);

	}

	setText(text) {
		this.#item.textContent = text;
	}

	getText() {
		return this.#item.textContent;
	}

	getWrapper(){
		return this.#taskWrapper;
	}

	#todoChecked(done) {
		this.isDone = done;
		this.#taskList.moveTask(this);

		// Change Styling?? Or should CSS take care of this when the task is moved to the other list?
	}

	#deleteClicked() {
		this.#taskList.deleteTask(this);
	}

}

window.onload = (event) => {
	console.log("Page is fully loaded.");

	const list = new TaskList();

	const taskButton = document.querySelector('button#todoButton');
	console.log(taskButton);


	taskButton.addEventListener("click", function addTodo() {
		const input = document.querySelector("#todoInput");
		console.log("Input set to: " + input.value);
		if (input.value) {
			list.addTask(input.value);

			input.value = "";
		}

	});
};
