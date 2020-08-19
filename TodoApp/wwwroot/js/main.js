

var activeItem = null
var list_snapshot = []
buildList()


/**
 * Building all task list
 *
 **/
function buildList() {
	var wrapper = document.getElementById('list-wrapper')
	//wrapper.innerHTML = ''
	var url = '/api/ToDoModels/';

	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			//console.log('Data:', data)

			var list = data
			for (var i in list) {
				try {
					document.getElementById(`data-row-${i}`).remove()
				}
				catch (err) {

				}
				var title = `<span class="title">${list[i].title}</span>`
				if (list[i].completed == true) {
					title = `<strike class="title">${list[i].title}</strike>`
				}

				var item = `
						<div id="data-row-${i}" class="task-wrapper flex-wrapper">
								<div style="flex:15">	
									${title}
								</div>
								<div style="flex:2">
									<button class="btn btn-sm btn-outline-info edit">Edit </button>
								</div>
								<div style="flex:2">
									<button class="btn btn-sm btn-outline-danger delete">Delete</button>
								</div>
						</div>
					`
				wrapper.innerHTML += item

			}

			if (list_snapshot.length > list.length) {
				for (var i = list.length; i < list_snapshot.length; i++) {
					document.getElementById(`data-row-${i}`).remove()
				}
			}

			list_snapshot = list


			for (var i in list) {
				var editBtn = document.getElementsByClassName('edit')[i]
				var deleteBtn = document.getElementsByClassName('delete')[i]
				var title = document.getElementsByClassName('title')[i]

				editBtn.addEventListener('click', (function (item) {
					return function () {
						editItem(item)
					}
				})(list[i]))


				deleteBtn.addEventListener('click', (function (item) {
					return function () {
						deleteItem(item)
					}
				})(list[i]))


				title.addEventListener('click', (function (item) {
					return function () {
						strikeUnstrike(item)
					}
				})(list[i]))

			}


		})
}

/**
 * render task in to form.
 * */

var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function (e) {
	e.preventDefault()
	//console.log('Form submitted')
	var urlpost = '/api/ToDoModels';
	var title = document.getElementById('title').value
	const myBody = { 'id': 0, 'title': title, 'completed': false };
	if (activeItem != null) {
		var urlput = `/api/ToDoModels/${activeItem.id}`;
		myBody.id = activeItem.id;
		myBody.completed = activeItem.completed;
		putTodo(urlput, JSON.stringify(myBody));
		activeItem = null
	}
	else {
		postTodo(urlpost, JSON.stringify(myBody));
	}

})

/**
 * create task and build task list
 * @param {any} url
 * @param {any} myBody
 */
function postTodo(url, myBody) {
	//console.log('postTodo', url, myBody);
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: myBody,
	}
	).then(function (response) {
		buildList()
		document.getElementById('form').reset()
	})
}

/**
 * build task list 
 * @param {any} url
 * @param {any} myBody
 */
function putTodo(url, myBody) {
	//console.log('putTodo', url, myBody);
	fetch(url, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
		},
		body: myBody,
	}
	).then(function (response) {
		buildList()
		document.getElementById('form').reset()
	})
}


/**
 * edit task using edit button
 * @param {any} item
 */
function editItem(item) {
	//console.log('Item clicked:', item)
	activeItem = item
	document.getElementById('title').value = activeItem.title
}

/**
 * Delete task using delete button
 * @param {any} item
 */
function deleteItem(item) {
	//console.log('Delete clicked')
	fetch(`/api/ToDoModels/${item.id}/`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
		},
	}).then((response) => {
		buildList()
	})
}

/**
 * you can mark/unmark task completed by click on task 
 * @param {any} item
 */
function strikeUnstrike(item) {
	//console.log('Strike clicked');
	item.completed = !item.completed;
	const myBody = JSON.stringify({ 'id': item.id, 'title': item.title, 'completed': item.completed });
	const myUrl = `/api/ToDoModels/${item.id}`;
	//console.log(myBody);
	fetch(myUrl, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
		},
		body: myBody,
	}).then((response) => {
		buildList()
	})
}


