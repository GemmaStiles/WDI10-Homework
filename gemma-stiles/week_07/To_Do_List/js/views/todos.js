// Individual Todo View

var app = app || {};

app.TodoView = Backbone.View.extend({

	// The DOM element for a todo item is a list tag.
	tagName: 'li',

	// Cache the template function for a single item.
	template: _.template( $('#item-template').html() ),

	// DOM events for specific items.
	events: {
		'click .toggle': 'togglecompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .efit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// The TodoView is always listening for changes to the model.
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);        
      	this.listenTo(this.model, 'visible', this.toggleVisible); 
	},

	// Re-renders the titles of the todo items.
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		this.$el.toggleClass( 'completed', this.model.get('completed') );
		this.toggleVisible(); 
		this.$input = this.$('.edit');
		return this;
	},

	// Toggles the visibility of an item.
	toggleVisible : function () {
      	this.$el.toggleClass( 'hidden',  this.isHidden());
    },

    // Works out if an items should be hidden or not. 
    isHidden : function () {
      	var isCompleted = this.model.get('completed');
      	return ( // hidden cases only
        	(!isCompleted && app.TodoFilter === 'completed')
        	|| (isCompleted && app.TodoFilter === 'active')
      	);
    },

    // Allows the toggle status of the model to be changed to completed.
    togglecompleted: function() {
      	this.model.toggle();
    },

	// Allows the view to be switched into 'editing' mode.
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// Closes 'editing' mode and saves any changes.
	// Trims the value of the current text in the input field.
	close: function() {
		var value = this.$input.val().trim();

		if ( value ) {
			this.model.save({ title: value });
		this.$el.removeClass('editing');	
		}
	},

	// If the enter key is hit, then editing is finished by executing the close function.
	updateOnEnter: function ( e ) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	},

	// Removes the item by destroying the model in localStorage, also removes from the view.
	// This works by triggering a remove event on the collection.
	clear: function() {
      	this.model.destroy();
    }


});

