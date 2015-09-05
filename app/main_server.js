import {Posts} from 'app/collections';
import {createPosts} from './fixtures';

if (!Posts.find().fetch().length) {
  createPosts();
}

console.log('\n\nRunning on server only');
console.log('There are # posts:', Posts.find().fetch().length);

// publications
Meteor.publish('posts', function(query) {
  check(query,{
    searchText: String,
    limit: Number
  });

  let {searchText,limit} = query;

  console.log(query);
  let filter;
  (searchText !=='') ?
    filter={name: {$regex: searchText, $options: 'i'}} : filter={};

  let cursor = Posts.find(filter,{ limit:limit, sort: {name: -1} });
  return cursor;
});

Posts.allow({
  insert: function (userId, doc) {
    return true;
  }
});
