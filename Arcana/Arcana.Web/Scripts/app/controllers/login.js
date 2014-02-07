(function () {
    'use strict';

    var controllerId = 'login';
    angular.module('arcana').controller(controllerId, ['$rootScope', '$scope', 'authService', login]);

    function login($rootScope, $scope, authService) {
        var vm = this;
        vm.errorMessage = '';
        vm.username = '';
        vm.password = '';
        vm.isProcessing = false;
        vm.login = login;

        function login() {
            vm.isProcessing = true;
            vm.errorMessage = '';

            var model = {
                Username: vm.username,
                Password: vm.password
            };

            authService.login(model).then(function () {
                window.location = '/';
            }, function (error) {
                vm.isProcessing = false;
                vm.errorMessage = error.data.Message;
            });
        }
    }
})();