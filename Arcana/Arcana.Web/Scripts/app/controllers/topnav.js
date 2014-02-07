(function () {
    'use strict';

    var controllerId = 'topnav';
    angular.module('arcana').controller(controllerId, ['$rootScope', 'authService', topnav]);

    function topnav($rootScope, authService) {
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUsername = $rootScope.user.name;
        vm.logout = logout;

        $rootScope.$watch('user', function () {
            vm.currentUsername = $rootScope.user.name;
            vm.isLoggedIn = authService.isLoggedIn();
        });

        function logout() {
            authService.logout();
            vm.isLoggedIn = false;
            vm.currentUsername = '';
            window.location = '/';
        }
    }
})();