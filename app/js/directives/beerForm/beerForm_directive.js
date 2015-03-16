/**
 * Created by julioeduardo.vasquez on 20/01/2015.
 */
angular.module('myApp')
    .directive('beerFormDirective', function() {
        return {
            /* restrict: 'A',
             templateUrl: 'js/directives/beerForm/beerForm_view.html',
             scope: {}
             */


            restrict: 'AE',
            templateUrl: 'js/directives/beerForm/beerForm_view.html',
            scope: {}
        };
    });