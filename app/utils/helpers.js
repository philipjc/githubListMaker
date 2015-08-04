import axios from 'axios';

// Promise with axios
function getRepos(username) {
  return axios.get(`http://api.github.com/users/${username}/repos`);
};

// Promise with axios

function getUserInfo(username) {
  return axios.get(`http://api.github.com/users/${username}`);
};

// helper to call the Promises

let helpers = {
  getGithubInfo(username) {
    return axios.all([getRepos(username), getUserInfo(username)])
    .then((arr) => {
      return {
        repos: arr[0].data,
        bio: arr[1].data
      }
    });
  }

};

export default helpers;

/*
  axios is a Promise lib
  Promises are a way to run a cb func after the Promise resolves the initial request.

  axios.all is away to runmultiple promises. It takes an array of functions.
  Waits for all Promises to be resolved, and then returns an array of data from both.
  Then makes an object with data stored in array in order of passed promises.

  var promisObj = getRepos('philipjc');
  promisObj.then(function (data) {
    console.log(data);
  });

  STRING LITERALS ES6
  Using the backtick `
  And interpolate your variables with $ and {}

*/
