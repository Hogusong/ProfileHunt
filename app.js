document.getElementsByTagName('input')[0].focus();

document.getElementById('process').addEventListener('click', function() {
  var username = document.getElementsByTagName('input')[0].value;
  console.log(username);
  getProfile(username)
});

document.addEventListener('keypress', function(e) {
  if (e.keyCode === 13 || e.which === 13) {
    var username = document.getElementsByTagName('input')[0].value;
    console.log(username);
    getProfile(username)
  }
});

function getProfile(username) {
  fetch("https://api.github.com/users/" + username)
    .then( res => res.json())
    .then( j => {
      console.log(j);
      showProfile(j);
      getFollowers(j.followers_url);
    })
}

function showProfile(res) {
  document.querySelector('.loader').style.display = 'none';

  document.getElementById('avata').src = res.avatar_url;
  document.getElementById('username').textContent = res.login;
  document.getElementById('realname').textContent = res.name;
  document.getElementById('location').textContent = res.location;
  document.getElementById('bio').textContent = res.bio;
  document.getElementById('count').textContent = res.followers + ' Followers';
}

function getFollowers(url) {
  fetch(url)
    .then( res => res.json() )
    .then( j => {
      showFollowers(j);
    })
}

function showFollowers(followers) {
  removeAllChildren('list')
  followers.forEach( (follower) => {
    let li = document.createElement('li');
    li.innerHTML = '<img src="' + follower.avatar_url + '" />';
    document.getElementById('list').appendChild(li) 
  })
}

function removeAllChildren(id) {
  let myNode = document.getElementById(id);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
