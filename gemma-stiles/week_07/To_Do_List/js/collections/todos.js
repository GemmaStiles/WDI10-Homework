// Todo Collection

// A Todo list collection is used to group the models. 
// The collection uses the Backbone LocalStorage to override Backbone defualt sync() operation.
// This is replaced with one that will persist the Todo records to HTML5 local storage.
// This means the items are saved between page requests.

var app = app || {};

var TodoList = Backbone.Collection.extend({

	// Reference to the Todo collection's model.
	model: app.Todo,

	// Save all of the todo items under the "todos-backbone" namespace.
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// Filter down the list of all of todo items that are marked as completed.
	completed: function() {
		return this.filter(function( todo ) { // this.filter is an underscore method.
			return todo.get('completed');
		});
	},

	// Filter for items on the todo list that are not marked as complete.
	remaining: function () {
		return this.without.apply( this, this.completed()); // this.without is an underscore method.
	},

	// This keeps the todo items in sequential order, despite being saves by unordered. 
	// Generates a globally unique identifier (GUID) in the database for new items.
	nextOrder: function () {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1; // this.last is an underscore method. 
	},

	// 
	comparator: function( todo ) {
		return todo.get('order');
	}	
});

 // Creates oa global collection of todos.
 app.Todos = new TodoList();

