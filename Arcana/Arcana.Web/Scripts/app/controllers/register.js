(function () {
    'use strict';

    var controllerId = 'register';
    angular.module('arcana').controller(controllerId, ['authService', register]);

    function register(authService) {
        var vm = this;
        vm.errorMessage = '';
        vm.username = '';
        vm.password = '';
        vm.confirmPassword = '';
        vm.isProcessing = false;
        vm.registerAccount = registerAccount;

        function registerAccount() {
            if (vm.password != vm.confirmPassword) {
                vm.isProcessing = false;
                vm.errorMessage = 'Passwords do not match';
            } else {
                var registerModel = {
                    UserName: vm.username,
                    Password: vm.password,
                    ConfirmPassword: vm.confirmPassword
                };

                vm.isProcessing = true;
                authService.register(registerModel).then(function () {
                    window.location = '/';
                }, function (error) {
                    vm.isProcessing = false;
                    vm.errorMessage = error.data.Message;
                });
            }
        }
    }
})();