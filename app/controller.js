import Controller from 'cerebral';
import Model from 'cerebral-immutable-store';

const model = Model({
  currentPage: null,
  searchText: '',
  limit: 10,
});

const services = {};

export default Controller(model, services);
