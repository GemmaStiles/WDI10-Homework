// The Application

var app = app || {};

app.AppView = Backbone.View.extend({

	// Bind to the existing skeleton already present in the HTML - line 10.
	el: '#todoapp',	

	// Template for the line of statistics at the bottom of the app.
	// Relates to line 48 of the HTML. 
	statsTemplate: _.template( $('#stats-template').html() ),

	// Events for creating new items and clearning out old completed items. 
	// Declarative callbacks for DOM events.
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// At initialization changed or items added are bound to the relevant event on the todos.
	// Fetches the previously saved todos from localStorage. 
	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos,'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch();
	},

	// Re-rendering the app doesn't change the app, only the statistics down in the footer.
	render: function() {
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if ( app.Todos.length ) {
			this.$main.show();
			this.$footer.show();

		this.$footer.html(this.statsTemplate({
			completed: completed,
			remaining: remaining
		}));

		this.$('#filters li a')
			.removeClass('selected')
			.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
			.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

	this.allCheckbox.checked = !remaining;
	},

	// Adds a single todo item to the list by creating a view for it and appending it to the element <ul> in the html. 
	addOne: function ( todo ) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view.render().el );
	},

	// Add all items in the todos collection at once.
	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},

  	filterOne: function (todo) {
      	todo.trigger('visible');
    },	

 	filterAll: function() {
      	app.Todos.each(this.filterOne, this);
    },  

    // Generates the new attributes for a new todo item. 
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},  

	// Creates a new Todo model and persists it to LS if the return key is hit in the main input field.
	// Also resets the input field value ready for the next entry. 
	// The this in this function is referring to the view, not the DOM element, since the callback is bound using the evnts hash. 
	createOnEnter: function ( event ) {
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}
		app.Todos.create( this.newAttributes() );
		this.$input.val('');
	},

	// Clears all of the todo items that are marked completed and destroys associated models. 
	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},	

	// Allows the ability to mark all of the items in the todo liist as completed by clicking the toggle-all checkbox.
	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Todos.each(function ( todo ) {
			todo.save({
	  			'completed': completed
			});
		});
	}
});

