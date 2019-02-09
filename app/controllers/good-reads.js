import Ember from 'ember';

const DEV_KEY = "";
const URL = "https://www.goodreads.com/search/index.xml"

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  searchText: '',
  books: [],
  actions: {
    search() {
      let searchText = this.get('searchText');
      this.get('ajax').request(`${URL}?key=${DEV_KEY}&search[field]=title&q=${searchText}`)
      .then(() => {
        //Xml request
      }).catch(() => {
        //Cors
      })
    }
  }
});
