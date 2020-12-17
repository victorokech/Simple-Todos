import {
    Accounts
} from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogout(function () {
    FlowRouter.go('/login');
});

Accounts.onLogin(function () {
    FlowRouter.go('/users/home');
});