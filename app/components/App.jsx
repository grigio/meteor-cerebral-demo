import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import {Users, Posts} from 'app/collections';
import './App.css';

var ListData = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let query = {
      searchText: this.props.searchText,
      limit: this.props.limit
    };
    console.log(JSON.stringify(query));

    window.postsSub = Meteor.subscribe('posts', query, (err, data) => {
      if (err) console.log(err,data);
    });
    return {
      isReady: postsSub.ready() || false,
      posts: Posts.find({},{sort:{name:-1}}).fetch()
    };
  },

  render: function() {
    return (
      <div>
        <h2>I fetch data for my children, (ListData)</h2>

          <p>
            {(this.props.searchText) ? `filter:${this.props.searchText} `: ""}
            (posts: {this.data.posts.length})
            <ul>
            {
              this.data.posts.map((el) => {
                return <li key={el._id}>{el.name}</li>
              })
            }
          </ul>
          </p>
          <a onClick={() => {this.props.signals.loadMore() }}>Load more</a><br />
          <a onClick={() => {this.props.signals.searchText({filter:''}) }}>Reset filter</a>
          Set <a onClick={() => {this.props.signals.searchText({filter:'9'}) }}>filter 9</a>
        <a onClick={() => {this.props.signals.insertPost({name:`aTest ${(new Date()).getTime()}`}) }}>Insert Post random</a>


          Go to<a onClick={() => this.props.signals.homeOpened() }>Home</a>
      </div>
    );
  }

});

@Cerebral({
  currentPage: ['currentPage'],
  isLoading: ['isLoading'],
  searchText: ['searchText'],
  limit: ['limit']
})
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Cerebral + Meteor Header (App layout)</h1>
        {
          (this.props.searchText) ?
            `Active filter: ${this.props.searchText}` : ''
        }
        {(this.props.currentPage === 'Home' &&
        <div>
          Hi I'm Home, I don't need any subscription here.<br />
          Go to <a onClick={() => {this.props.signals.listOpened()} }>List</a>
          Set just <a onClick={() => {this.props.signals.searchText({filter:'5'}) } }>filter 5</a>
        </div>)}
        {(this.props.currentPage === 'List'
          && <ListData {...this.props} /> )}
      </div>
    );
  }
}

export default App;
