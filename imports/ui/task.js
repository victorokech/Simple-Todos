import {
    Template
} from 'meteor/templating';

import {
    Tasks
} from '../api/tasks.js';

import './task.html';

Template.task.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Meteor.call('task.setChecked', this._id, !this.checked);
    },
    'click .delete'() {
        Meteor.call('task.remove', this._id);
    },
});