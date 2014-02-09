(function () {
    'use strict';

    var controllerId = 'sidebar';
    angular.module('arcana').controller(controllerId, ['$rootScope', 'authService', sidebar]);

    function sidebar($rootScope, authService) {
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.isAdmin = authService.isAdmin();

        $rootScope.$watch('user', function () {
            vm.isLoggedIn = authService.isLoggedIn();
            vm.isAdmin = authService.isAdmin();
        });
    };
})();