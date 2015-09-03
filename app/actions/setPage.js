function setPage (pageName) {
  return function activePage (input, state, output, services) {
    console.log('Active: '+ pageName);
    document.title = pageName;
    state.set('currentPage', pageName);
  }
}

export default setPage;
