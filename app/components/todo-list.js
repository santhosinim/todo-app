import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['todo-list'],
  classNameBindings: ['completed:completed'],
  actions: {
    editTodo(todo) {
      this.sendAction('editTodo', todo);
    },

    saveTodo(todo) {
      this.sendAction('saveTodo', todo);
    },

    deleteTodo(todo) {
      this.sendAction('deleteTodo', todo);
    }
  }
});
