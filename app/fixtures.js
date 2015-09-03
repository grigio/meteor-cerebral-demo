/* global Accounts */
import {Posts} from './collections';

export function createPosts() {
  console.log('Creating fake posts');
  for (let i=0; i<100; i++){
    Posts.insert({
      name: 'Test post # ' + i,
      desc: 'How now brown cow',
    });
  };
}

export function createUsers() {
  console.log('Creating fake users');
  ['Bob', 'Jane', 'Max'].forEach(function(name) {
    Accounts.createUser({
      username: name,
      password: 'password',
      profile: {},
    });
  });
}
