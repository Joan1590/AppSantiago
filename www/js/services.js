angular.module('app.services', [])

.factory('AppFactory', [function(){
	var jsonStates = [
    {
      id:0,
      name:'Antioquia'
    },
    {
      id:1,
      name:'Cundinamarca'
    }
  ]
	var jsonCities = [
		{
			idState:0,
			id:0,
			name:'Medellín'
		},
		{
			idState:0,
			id:1,
			name:'Sabaneta'
		},
		{
			idState:0,
			id:2,
			name:'La Estrella'
		},
		{
			idState:0,
			id:3,
			name:'Girardota'
		},
		{
			idState:0,
			id:4,
			name:'Envigado'
		},
		{
			idState:1,
			id:0,
			name:'Bogotá'
		},
		{
			idState:1,
			id:1,
			name:'Venecia'
		},
		{
			idState:1,
			id:2,
			name:'Soacha'
		},
		{
			idState:1,
			id:3,
			name:'Nariño'
		},
		{
			idState:1,
			id:4,
			name:'El Peñon'
		}
	]
	return{
		getStates: function(){
			return jsonStates;
		},
		getStateById: function(id){
			return jsonStates[id];
		},
		getCitiesByState: function(idState){
			citiesByState = [];
			for (j in jsonCities) {
				if(jsonCities[j].idState==idState){
					citiesByState.push(jsonCities[j]);
				}
			}
			return citiesByState;
		},
		getCitiesByStateById: function(idState, id){
			return getCitiesByState(idState)[id];
		}
	}
}])

.service('firebaseData', function(){
	this.config = {
		 apiKey: "AIzaSyC34l1PlBu8ySBSRv911pFKKXc2qRpjDcc",
		 authDomain: "appsantiagofirebase.firebaseapp.com",
		 databaseURL: "https://appsantiagofirebase.firebaseio.com",
		 storageBucket: "",
		 messagingSenderId: "1087293796787"
	 };
});
