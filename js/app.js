var myApp = angular.module('myApp', ['ngAutocomplete','ngRoute']);

myApp.controller('mainController',function($scope,$rootScope,$http){
  $rootScope.formSended = false;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        var lat = position.coords.latitude
        var long = position.coords.longitude
        $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=9a1485c35b226f0560dd001a61d90c53&units=metric")
        .then(function(response){
          console.log(response);
          $scope.temp=response.data.main.temp;
        })
        console.log(position.coords);
        $scope.position = position;
      });
    });

  }
})

myApp.controller('FormValidateController',function FormValidateController($scope,$rootScope){
  $scope.errorForms = false;
  $scope.errors = []

  $scope.submitForm = function(isValid) {
		if (isValid) {
      $rootScope.email = $scope.user.email;
      $rootScope.name = $scope.user.name;
      $rootScope.location = $scope.autocomplete;
      $rootScope.formSended = true;
		} else {

      $scope.errorForms = true;
      $scope.errors = []
      if ($scope.userForm.name.$untouched) {
        angular.element(document.getElementById('input-name')).css('background','#eb4d4b');
        $scope.errors.push("nombre requerido")
      } else {
        angular.element(document.getElementById('input-name')).css('background','white');
      }
      if ($scope.userForm.email.$invalid) {
        angular.element(document.getElementById('input-email')).css('background','#eb4d4b');
        $scope.errors.push("correo invalido")
      } else {
        angular.element(document.getElementById('input-email')).css('background','white');
      }
      if ($scope.userForm.phone.$untouched) {
        angular.element(document.getElementById('input-phone')).css('background','#eb4d4b');
        $scope.errors.push("Telefono invalido")
      } else {
        angular.element(document.getElementById('input-phone')).css('background','white');
      }
      if (!$scope.datepicker) {
        angular.element(document.getElementById('input-date')).css('background','#eb4d4b');
        $scope.errors.push("Fecha requerida")
      } else {
        angular.element(document.getElementById('input-date')).css('background','white');
      }
      

    }

	};
})

myApp.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "d-M-y",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});
