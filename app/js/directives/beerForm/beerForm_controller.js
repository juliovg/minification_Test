/**
 * Created by julioeduardo.vasquez on 20/01/2015.
 */
angular.module('myApp')
    .controller('beerForm_controller', [
        '$scope',
        function($scope) {
            $scope.smsCgHijo = 'Texto desde el formulario';

            $scope.myBeerForm = {};


            $scope.submitFormBeer = function() {

                console.log("--> Submitting form");

            };
        }
    ]);