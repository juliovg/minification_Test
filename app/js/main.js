/**
 * Created by jevazquez on 11/03/2015.
 */

var my_app = angular.module('myApp', ['templates.js']);


angular.module('myApp')
    .controller('personController', ['$scope', function($scope) {
        $scope.firstName = "John";
        $scope.lastName = "Doe";
    }]);