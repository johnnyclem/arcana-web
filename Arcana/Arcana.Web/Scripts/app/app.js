(function () {
    'use strict';

    var app = angular.module('arcana', ['ivpusic.cookie']);

    app.run(['$rootScope', 'ipCookie', 'authService', function ($rootScope, ipCookie, authService) {
        if (ipCookie('user')) {
            var user = ipCookie('user');
            $rootScope.user = user;
        } else {
            $rootScope.user = {
                name: '',
                role: 'Anon'
            };
        }        
    }]);
})();