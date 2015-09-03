function incrementLimit (num) {
  return function myCustomAction (input, state, output, services) {
    let newLimit;

    if (num) {
      newLimit = num;
    } else {
      newLimit = state.get('limit') +10;
    }
    
    state.set('limit', newLimit);
  }
}

export default incrementLimit;
