/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';

import { Tasks } from './tasks.js';
import { assert } from 'chai';

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;
            
            let text = "Meteor unit testing";
            
            before(() => {
                Meteor.users.remove({});
                const newUser = Accounts.createUser({ username: "test", email: "test@email.com", password: "password" });
            })

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });
            });

            // can insert task
            it('can insert task', () => {
                // internal implementation of task insert method
                const insertTask = Meteor.server.method_handlers['task.insert'];

                // set up fake method invocation
                const invocation = {};

                assert.throws(function () {
                    insertTask.apply(invocation, [text]);
                }, Meteor.Error, 'not-authorized');

                assert.equal(Tasks.find().count(), 1);
            });

            // cannot insert task if not logged in
            it('cannot insert task if not logged in', () => {
                // internal implementation of task insert method
                const insertTask = Meteor.server.method_handlers['task.insert'];

                const newUserId = Meteor.users.findOne({}, { username: 'test', email: 'test@email.com' })._id;

                // set up fake method invocation
                const invocation = { 'this.userId': newUserId };

                assert.throws(function () {
                    insertTask.apply(invocation, [text]);
                }, Meteor.Error, 'not-authorized');

                assert.equal(Tasks.find({checked : true}).count(), 0);
            });


            it('can delete task', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deleteTask = Meteor.server.method_handlers['task.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteTask.apply(invocation, [taskId]);

                // Verify that the method does what we expected
                assert.equal(Tasks.find().count(), 0);
            });

            it('cannot delete someone elses task', () => {
                // setting existing task private
                Tasks.update(taskId, { $set: { private: true } });

                // other user
                const otherUserId = Random.id();

                // isolate delete method
                const deleteTask = Meteor.server.method_handlers['task.remove'];

                // fake user object
                const fakeUserObject = { 'userId': otherUserId };
                
                assert.throws(function () {
                    deleteTask.apply(fakeUserObject, [taskId]);
                    
                }, Meteor.Error, 'not-authorized');
                
                assert.equal(Tasks.find().count(), 1);

            });

            it('can delete someone elses public task', () => {
                // setting existing task public
                Tasks.update(taskId, { $set: { private: false } });

                // other user
                const otherUserId = Random.id();

                // isolate delete method
                const deleteTask = Meteor.server.method_handlers['task.remove'];

                // fake user object
                const fakeUserObject = { 'userId': otherUserId };
                
                deleteTask.apply(fakeUserObject, [taskId]);
                    
                assert.equal(Tasks.find().count(), 0);
            });
            
            it('can set private', () => {
                const private = Meteor.server.method_handlers['task.setPrivate'];

                const invocation = {};

                assert.throws(function () {
                    private.apply(invocation, [taskId, true]);
                }, Meteor.Error, 'not-authorized');
            });

            it('cannot set someone elses task private', () => {
                const checked = Meteor.server.method_handlers['task.setPrivate'];

                const newUserId = Meteor.users.findOne({}, { username: 'test', email: 'test@email.com' })._id;

                const invocation = { 'this.userId': newUserId };


                assert.throws(function () {
                    checked.apply(invocation, [taskId, true]);
                }, Meteor.Error, 'not-authorized');
            });


            it('can set checked', () => {
                Tasks.update(taskId, { $set: { private: true } });

                const checked = Meteor.server.method_handlers['task.setChecked'];

                const invocation = { userId };

                // run test
                checked.apply(invocation, [taskId, true]);

                assert.equal(Tasks.find({checked : true}).count(), 1);
            });

            it('cannot set someone elses task checked', () => {
                Tasks.update(taskId, { $set: { private: true } });

                const checked = Meteor.server.method_handlers['task.setChecked'];

                const newUserId = Meteor.users.findOne({}, { username: 'test', email: 'test@email.com' })._id;

                const invocation = {'this.userId' : newUserId};

                assert.throws(function () {
                    checked.apply(invocation, [taskId, true]);
                }, Meteor.Error, 'not-authorized');

                assert.equal(Tasks.find({ checked: true }).count(), 0);
            });
        });
    });
}