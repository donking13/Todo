require.config({
	paths:{
		'angularjs':['http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min','../bower_components/angular/angular.min'],
		'firebase':['https://cdn.firebase.com/js/client/2.2.4/firebase','../bower_components/firebase/firebase'],
		'angularfire':['https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min','../bower_components/angularfire/dist/angularfire.min'],
		'app':'app/app'
	},
	shim: {
		'app':{
			deps:['angularjs','firebase','angularfire'],
		}
	}
});




require(['app']);
