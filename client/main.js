import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import '../imports/startup/accounts-config.js';

// include routing
import '../imports/startup/router.js';

// include pages
import '../imports/ui/pages/login.js';
import '../imports/ui/pages/home.js';

import './main.html';