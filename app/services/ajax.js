import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  dataType:"xml",
  headers: Ember.computed('session.authToken', {
    get() {
      let headers = {};
      headers['Access-Control-Allow-Origin'] = '*';
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
      return headers;
    }
  })
});