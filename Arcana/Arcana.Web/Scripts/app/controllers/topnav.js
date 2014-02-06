(function () {
    'use strict';

    var controllerId = 'topnav';
    angular.module('arcana').controller(controllerId, ['$rootScope', 'authService', topnav]);

    function topnav($rootScope, authService) {
        var vm = this;
        vm.isLoggedIn = ($rootScope.user) ? true : false;
        vm.currentUsername = ($rootScope.user) ? $rootScope.user.name : '';
        vm.logout = logout;

        $rootScope.$watch('user', function () {
            vm.currentUsername = ($rootScope.user) ? $rootScope.user.name : '';
            vm.isLoggedIn = vm.currentUsername != '';
        });

        function logout() {
            authService.logout();
            vm.isLoggedIn = false;
            vm.currentUsername = '';
            window.location = '/';
        }
    }
})();