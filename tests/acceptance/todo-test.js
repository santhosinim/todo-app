import { test } from 'qunit';
import moduleForAcceptance from 'todo-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo');

test('visiting /todo', function(assert) {
  visit('/todo');

  andThen(function() {
    assert.equal(currentURL(), '/todo');
  });
});

test('Display todo', function(assert) {
  visit('/todo');
  andThen(function() {
    assert.equal(find('.todo-item').length, 3);
  });
});

test('Add todo', function(assert) {
  visit('/todo');
  fillIn('input.add-todo', 'New todo');
  click('[data-test-id="add-todo-button"]');
  andThen(function() {
    assert.equal(find('.todo-item').length, 4);
  });
});

test('Add completed todo below', function(assert) {
  visit('/todo');
  click('input[name="1"]');
  andThen(function() {
    assert.equal(find('.completed .todo-item').length, 2);
  });
});

test('Delete todo', function(assert) {
  visit('/todo');
  click('[data-test-id="1"] [data-test-id="delete"]');
  click('[data-test-id="3"] [data-test-id="delete"]');
  andThen(function() {
    assert.equal(find('.todo-item').length, 2);
  });
});

test('Edit todo', function(assert) {
  visit('/todo');
  click('[data-test-id="2"] [data-test-id="edit"]');
  fillIn('[data-test-id="2"] input[type="text"]', ' tomorrow');
  click('[data-test-id="2"] [data-test-id="save"]');
  andThen(function() {
    assert.equal(find('[data-test-id="2"] .todo-name').text().trim(), 'tomorrow');
  });
});
