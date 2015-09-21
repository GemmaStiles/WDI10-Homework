// Todo Model

// Has two attributes: title which stores an item's title and a completed status which indicates if it is completed or not. 

var app = app || {};

app.Todo = Backbone.Model.extend ({

	// This ensures that each item added to the todo list has defualt attributes and therefore 'title' and 'compelted' keys.
	defaults: {
		title: '',
		completed: false
	},

	// This allows the completed state of a todo item to be toggled.
	toggle: function() {
		this.save ({
			completed: !this.get('completed')
		});
	}
});

