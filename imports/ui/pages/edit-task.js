import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tasks } from '../../api/tasks.js';

import './edit-task.html';

let taskId;

Template.Edit_Task.onCreated(function bodyOnCreated() {
    taskId = this.data.taskId();
    Meteor.subscribe('tasks');
});

Template.Edit_Task.helpers({ 
    task() {
        if (taskId) {
            let task = Tasks.findOne(taskId);
            return task.text;
        } else {
            return "";
        }
    }
}); 

Template.Edit_Task.events({ 
    'submit .new-task'(event) { 
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;
        Meteor.call('tasks.update', taskId, text);
        FlowRouter.go('/users/home');
    }
}); 
