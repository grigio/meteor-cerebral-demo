function setSearchText (input, state) {
  let filter = input.filter;
  state.set('searchText', filter);
  state.set('limit', 10);
  
  let path = '/list';
  if (filter) path+=`/${filter}`;
  // from cerebral-router
  state.set('url', path);
}

export default setSearchText;
