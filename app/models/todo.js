import DS from 'ember-data';

var Todo = DS.Model.extend({
  taskName: DS.attr('string'),
  isCompleted: DS.attr('boolean', { defaultValue: false }),
  isEditing: DS.attr('boolean', { defaultValue: false })
});


Todo.reopenClass({
  FIXTURES: [{
    id: 1,
    taskName: 'Pay Bills',
    isCompleted: false
  },{
    id: 2,
    taskName: 'Go shopping',
    isCompleted: false
  },{
    id: 3,
    taskName: 'See the doctor',
    isCompleted: true
  }]
});

export default Todo;