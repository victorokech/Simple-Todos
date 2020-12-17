// Exposed group
const exposed = FlowRouter.group({
    prefix: '/',
    triggersEnter: [
        (context, redirect) => {
            if (!Meteor.userId()) {
                redirect('/login');
            }
        }
    ]
});


// Landing page
exposed.route('/', {
    name : 'App.Login',
    action : function () {
        BlazeLayout.render('App_body', { main: 'Login_Page' });
    }
});


// Login page
exposed.route('/login', {
    action: function () {
        BlazeLayout.render('App_body', { main: 'Login_Page' });
    }
});


// Not found
exposed.route('/notfound', {
    name: 'App.NotFound',
    action: function () {
        BlazeLayout.render('App_body', { main: 'Not_Found' });
    }
});


// Loggedin group
const loggedIn = FlowRouter.group({
    prefix: '/users',
    triggersEnter: [
        (context, redirect) => {
            if (!Meteor.userId()) {
                redirect('/login');
            }
        }
    ]
});

// Home page
loggedIn.route('/home', {
    name: 'App.Home',
    action: function () {
        BlazeLayout.render('App_body', { main: 'Home_Page' });
    }
});

// Task group
const taskGroup = FlowRouter.group({
    prefix: '/tasks',
    triggersEnter: [
        (context, redirect) => {
            if (!Meteor.userId()) {
                redirect('/login');
            }
        }
    ]
});

taskGroup.route('/edit/:taskId', {
    action: function (params, queryParams) {
        var taskId = FlowRouter.getParam('taskId');
        BlazeLayout.render('App_body', { main: 'Edit_Task', taskId: taskId });
    }
});