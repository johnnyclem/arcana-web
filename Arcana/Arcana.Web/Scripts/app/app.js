(function () {
    'use strict';

    var app = angular.module('arcana', []);

    app.run(['$rootScope', 'authService', function ($rootScope, authService) {
        authService.getCurrentUser().then(function (response) {
            $rootScope.user = { name: response.data.name };
        }, function (error) {
            $rootScope.user = { name: '' };
        });        
    }]);
})();