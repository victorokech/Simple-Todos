// Landing page
FlowRouter.route('/', {
    name : 'App.Login',
    action : function () {
        BlazeLayout.render('App_body', { main: 'Login_Page' });
    }
});


// Login page
FlowRouter.route('/login', {
    action: function () {
        BlazeLayout.render('App_body', { main: 'Login_Page' });
    }
});


// Not found
FlowRouter.route('/notfound', {
    name: 'App.NotFound',
    action: function () {
        BlazeLayout.render('App_body', { main: 'Not_Found' });
    }
});

// Home page
FlowRouter.route('/home', {
    name: 'App.Home',
    action: function () {
        BlazeLayout.render('App_body', { main: 'Home_Page' });
    }
});