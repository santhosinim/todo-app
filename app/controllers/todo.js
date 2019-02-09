import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  taskName: '',
  todos: computed.filterBy('model', 'isCompleted', false),
  completedTodos: computed.filterBy('model', 'isCompleted', true),
  actions: {
    addTodo() {
      let taskName = this.get('taskName');
      this.store
      .createRecord('todo', { taskName })
      .save()
      .then(() => {
        this.set('taskName', '');
      });
    },

    editTodo(todo) {
      todo.set('isEditing', true);
    },

    saveTodo(todo) {
      todo
      .save()
      .then(() => {
        todo.set('isEditing', false);
      })
    },

    deleteTodo(todo) {
      todo.destroyRecord();
    }
  }
});
