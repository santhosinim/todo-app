'use strict';

define('todo-app/tests/acceptance/todo-test', ['exports', 'qunit', 'todo-app/tests/helpers/module-for-acceptance'], function (exports, _qunit, _todoAppTestsHelpersModuleForAcceptance) {

  (0, _todoAppTestsHelpersModuleForAcceptance['default'])('Acceptance | todo');

  (0, _qunit.test)('visiting /todo', function (assert) {
    visit('/todo');

    andThen(function () {
      assert.equal(currentURL(), '/todo');
    });
  });

  (0, _qunit.test)('Display todo', function (assert) {
    visit('/todo');
    andThen(function () {
      assert.equal(find('.todo-item').length, 3);
    });
  });

  (0, _qunit.test)('Add todo', function (assert) {
    visit('/todo');
    fillIn('input.add-todo', 'New todo');
    click('[data-test-id="add-todo-button"]');
    andThen(function () {
      assert.equal(find('.todo-item').length, 4);
    });
  });

  (0, _qunit.test)('Add completed todo below', function (assert) {
    visit('/todo');
    click('input[name="1"]');
    andThen(function () {
      assert.equal(find('.completed .todo-item').length, 2);
    });
  });

  (0, _qunit.test)('Delete todo', function (assert) {
    visit('/todo');
    click('[data-test-id="1"] [data-test-id="delete"]');
    click('[data-test-id="3"] [data-test-id="delete"]');
    andThen(function () {
      assert.equal(find('.todo-item').length, 2);
    });
  });

  (0, _qunit.test)('Edit todo', function (assert) {
    visit('/todo');
    click('[data-test-id="2"] [data-test-id="edit"]');
    fillIn('[data-test-id="2"] input[type="text"]', ' tomorrow');
    click('[data-test-id="2"] [data-test-id="save"]');
    andThen(function () {
      assert.equal(find('[data-test-id="2"] .todo-name').text().trim(), 'tomorrow');
    });
  });
});
define('todo-app/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/todo-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/todo-list.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/good-reads.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/good-reads.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/todo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/todo.js should pass ESLint\n\n');
  });

  QUnit.test('models/todo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/todo.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/good-reads.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/good-reads.js should pass ESLint\n\n');
  });

  QUnit.test('routes/todo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/todo.js should pass ESLint\n\n');
  });

  QUnit.test('services/ajax.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/ajax.js should pass ESLint\n\n');
  });
});
define('todo-app/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('todo-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'todo-app/tests/helpers/start-app', 'todo-app/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _todoAppTestsHelpersStartApp, _todoAppTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _todoAppTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _todoAppTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('todo-app/tests/helpers/resolver', ['exports', 'todo-app/resolver', 'todo-app/config/environment'], function (exports, _todoAppResolver, _todoAppConfigEnvironment) {

  var resolver = _todoAppResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _todoAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _todoAppConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('todo-app/tests/helpers/start-app', ['exports', 'ember', 'todo-app/app', 'todo-app/config/environment'], function (exports, _ember, _todoAppApp, _todoAppConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _todoAppConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _todoAppApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('todo-app/tests/test-helper', ['exports', 'todo-app/tests/helpers/resolver', 'ember-qunit'], function (exports, _todoAppTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_todoAppTestsHelpersResolver['default']);
});
define('todo-app/tests/tests.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/todo-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/todo-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/todo-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/good-reads-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/good-reads-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/todo-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/ajax-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/ajax-test.js should pass ESLint\n\n');
  });
});
define('todo-app/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('todo-app/tests/unit/controllers/todo-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:todo', 'Unit | Controller | todo', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('todo-app/tests/unit/models/todo-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('todo', 'Unit | Model | todo', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('todo-app/tests/unit/routes/good-reads-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:good-reads', 'Unit | Route | good reads', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('todo-app/tests/unit/routes/todo-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:todo', 'Unit | Route | todo', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('todo-app/tests/unit/services/ajax-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:ajax', 'Unit | Service | ajax', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
require('todo-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
