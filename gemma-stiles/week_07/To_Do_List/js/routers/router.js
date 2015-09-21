//Todo Router

// The router uses a *splat to set up a default which passes the string after '#/' in the URL to setFilter() which then sets app.TodoFilter to that string.
// 

var app = app || {};

var Workspace = Backbone.Router.extend({
	routes:{
  		'*filter': 'setFilter'
},

setFilter: function( param ) {
  	// Sets the current filter to be used
  	if (param) {
    param = param.trim();
  	}
  	app.TodoFilter = param || '';

  // Triggers a collection filter event, causing hiding/unhiding of Todo view items
  // Once the filter has been set this triggers which items are visible and which are hidden.
  	app.Todos.trigger('filter');
	}
});

// Routes the initial URL during a page load. 
app.TodoRouter = new Workspace();
Backbone.history.start();