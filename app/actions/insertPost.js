import {Posts} from 'app/collections';

function insertPost (input, state) {
  console.log(JSON.stringify(input));
  Posts.insert({name: input.name});
}

export default insertPost;
