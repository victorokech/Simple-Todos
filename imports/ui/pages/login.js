
import { Meteor } from 'meteor/meteor';

import './login.html';

if (Meteor.userId()) {
    Meteor.setTimeout(() => {
        FlowRouter.go('/home');
    });
}
