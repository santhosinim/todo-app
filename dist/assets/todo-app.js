"use strict";



define('todo-app/adapters/application', ['exports', 'ember-data-fixture-adapter'], function (exports, _emberDataFixtureAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDataFixtureAdapter['default'];
    }
  });
});
define('todo-app/app', ['exports', 'ember', 'todo-app/resolver', 'ember-load-initializers', 'todo-app/config/environment'], function (exports, _ember, _todoAppResolver, _emberLoadInitializers, _todoAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _todoAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _todoAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _todoAppResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _todoAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('todo-app/components/todo-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['todo-list'],
    classNameBindings: ['completed:completed'],
    actions: {
      editTodo: function editTodo(todo) {
        this.sendAction('editTodo', todo);
      },

      saveTodo: function saveTodo(todo) {
        this.sendAction('saveTodo', todo);
      },

      deleteTodo: function deleteTodo(todo) {
        this.sendAction('deleteTodo', todo);
      }
    }
  });
});
define('todo-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define("todo-app/controllers/good-reads", ["exports", "ember"], function (exports, _ember) {

  var DEV_KEY = "";
  var URL = "https://www.goodreads.com/search/index.xml";

  exports["default"] = _ember["default"].Controller.extend({
    ajax: _ember["default"].inject.service(),
    searchText: '',
    books: [],
    actions: {
      search: function search() {
        var searchText = this.get('searchText');
        this.get('ajax').request(URL + "?key=" + DEV_KEY + "&search[field]=title&q=" + searchText).then(function () {
          //Xml request
        })["catch"](function () {
          //Cors
        });
      }
    }
  });
});
define('todo-app/controllers/todo', ['exports', 'ember'], function (exports, _ember) {
  var computed = _ember['default'].computed;
  exports['default'] = _ember['default'].Controller.extend({
    taskName: '',
    todos: computed.filterBy('model', 'isCompleted', false),
    completedTodos: computed.filterBy('model', 'isCompleted', true),
    actions: {
      addTodo: function addTodo() {
        var _this = this;

        var taskName = this.get('taskName');
        this.store.createRecord('todo', { taskName: taskName }).save().then(function () {
          _this.set('taskName', '');
        });
      },

      editTodo: function editTodo(todo) {
        todo.set('isEditing', true);
      },

      saveTodo: function saveTodo(todo) {
        todo.save().then(function () {
          todo.set('isEditing', false);
        });
      },

      deleteTodo: function deleteTodo(todo) {
        todo.destroyRecord();
      }
    }
  });
});
define('todo-app/helpers/app-version', ['exports', 'ember', 'todo-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _todoAppConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _todoAppConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('todo-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('todo-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('todo-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'todo-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _todoAppConfigEnvironment) {
  var _config$APP = _todoAppConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('todo-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('todo-app/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('todo-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('todo-app/initializers/export-application-global', ['exports', 'ember', 'todo-app/config/environment'], function (exports, _ember, _todoAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_todoAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _todoAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_todoAppConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('todo-app/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('todo-app/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('todo-app/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("todo-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _emberDataInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInitializeStoreService["default"]
  };
});
define('todo-app/models/todo', ['exports', 'ember-data'], function (exports, _emberData) {

  var Todo = _emberData['default'].Model.extend({
    taskName: _emberData['default'].attr('string'),
    isCompleted: _emberData['default'].attr('boolean', { defaultValue: false }),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false })
  });

  Todo.reopenClass({
    FIXTURES: [{
      id: 1,
      taskName: 'Pay Bills',
      isCompleted: false
    }, {
      id: 2,
      taskName: 'Go shopping',
      isCompleted: false
    }, {
      id: 3,
      taskName: 'See the doctor',
      isCompleted: true
    }]
  });

  exports['default'] = Todo;
});
define('todo-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('todo-app/router', ['exports', 'ember', 'todo-app/config/environment'], function (exports, _ember, _todoAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _todoAppConfigEnvironment['default'].locationType,
    rootURL: _todoAppConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('todo');
    this.route('good-reads');
  });

  exports['default'] = Router;
});
define('todo-app/routes/good-reads', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('todo-app/routes/todo', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('todo');
    }
  });
});
define('todo-app/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax'], function (exports, _ember, _emberAjaxServicesAjax) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    dataType: "xml",
    headers: _ember['default'].computed('session.authToken', {
      get: function get() {
        var headers = {};
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
        return headers;
      }
    })
  });
});
define("todo-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pNeNQoq9", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todo-app/templates/application.hbs" } });
});
define("todo-app/templates/components/todo-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9be87pJ0", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"todos\"]]],null,5]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"data-test-id\",\"edit\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editTodo\",[\"get\",[\"todo\"]]]],[\"flush-element\"],[\"text\",\"\\n          Edit\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"data-test-id\",\"save\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveTodo\",[\"get\",[\"todo\"]]]],[\"flush-element\"],[\"text\",\"\\n          Save\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"todo-name\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"unknown\",[\"todo\",\"taskName\"]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\"],[\"text\",[\"get\",[\"todo\",\"taskName\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"todo-item\"],[\"dynamic-attr\",\"data-test-id\",[\"unknown\",[\"todo\",\"id\"]],null],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",[\"get\",[\"todo\",\"id\"]],[\"get\",[\"todo\",\"isCompleted\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"todo\",\"isEditing\"]]],null,3,2],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"todo-actions\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"todo\",\"isEditing\"]]],null,1,0],[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"data-test-id\",\"delete\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteTodo\",[\"get\",[\"todo\"]]]],[\"flush-element\"],[\"text\",\"\\n          Delete\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"todo\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"title\"]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"todos\"]]],null,4]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "todo-app/templates/components/todo-list.hbs" } });
});
define("todo-app/templates/good-reads", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "c1jtY2Zq", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\"],[\"text\",[\"get\",[\"searchText\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"search\"]],[\"flush-element\"],[\"text\",\"\\n    Search\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todo-app/templates/good-reads.hbs" } });
});
define("todo-app/templates/todo", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "aVwTeoyz", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"todo-app\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"\\n    ADD ITEM\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[\"get\",[\"taskName\"]],\"add-todo\"]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"data-test-id\",\"add-todo-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addTodo\"]],[\"flush-element\"],[\"text\",\"\\n      Add\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"todo-list\"],null,[[\"title\",\"todos\",\"saveTodo\",\"editTodo\",\"deleteTodo\"],[\"TODO\",[\"get\",[\"todos\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"saveTodo\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"editTodo\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"deleteTodo\"],null]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"todo-list\"],null,[[\"title\",\"completed\",\"todos\",\"saveTodo\",\"editTodo\",\"deleteTodo\"],[\"COMPLETED\",true,[\"get\",[\"completedTodos\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"saveTodo\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"editTodo\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"deleteTodo\"],null]]]],false],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todo-app/templates/todo.hbs" } });
});


define('todo-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'todo-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("todo-app/app")["default"].create({"name":"todo-app","version":"0.0.0+921e814c"});
}
//# sourceMappingURL=todo-app.map
