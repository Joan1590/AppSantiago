angular.module('app.controllers', [])

.controller('formCtrl', function($scope, $state, AppFactory, $cordovaCamera,
  firebaseData, $cordovaGeolocation, $http ,$ionicPopup){

  firebase.initializeApp(firebaseData.config);
  $scope.color = "white";
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
     .getCurrentPosition(posOptions)
     .then(function (position) {
       var lat  = position.coords.latitude;
       var long = position.coords.longitude;
       $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true")
       .then(function(response) {
         console.log(response.data.results[0].formatted_address);
         if(response.data.results[0].formatted_address.indexOf("Medellín")>-1){
           $scope.color = "green";
           $ionicPopup.alert({
             title:"Mensaje",
             template:"Se encuentra en Medellín"
           });
         }
         if(response.data.results[0].formatted_address.indexOf("Envigado")>-1){
           $ionicPopup.alert({
             title:"Mensaje",
             template:"Se encuentra en Envigado"
           });
           $scope.color = "yellow";
         }

       });
     }, function(err) {
       // error
     });

  $scope.selectState = function(id){
    $scope.model.state = id;
    $scope.model.city = 0;
    $scope.jsonCities = AppFactory.getCitiesByState(id);
  }
  $scope.selectCity = function(id){
    $scope.model.city = id;
  }
  $scope.model = {};
  $scope.model.name="";
  $scope.model.email="";
  $scope.model.liveColombia = false;
  $scope.model.imgURI = "";
  $scope.jsonStates = AppFactory.getStates();
  $scope.jsonCities = AppFactory.getCitiesByState(0);
  $scope.model.state = 0;
  $scope.model.city = 0;
  $scope.changeCity = true;
  $scope.showError = false;

  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.model.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  }

  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.model.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  }

  $scope.send = function(form) {
    $scope.showError = true;
    if(form.$valid){

      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      var colombia = {};
      console.log($scope.liveColombia);
      if($scope.liveColombia){
        colombia = {
          state: $scope.state,
          city: $scope.city
        }
      }
      firebase.database().ref('users/1').set({
        model: $scope.model
      });
      $state.go("show");
    }
  }
})

.controller('showCtrl', function($scope, $state, AppFactory){
  $scope.model = {};
  firebase.database().ref('users/1').on('value', function(object){
    $scope.model = object.val().model;
    $scope.jsonStates = AppFactory.getStates();
    $scope.jsonCities = AppFactory.getCitiesByState($scope.model.state);
	});
});
