DOMinput = document.getElementsByTagName('input')[0];
DOMoption = document.getElementById('option');
DOMinput.focus();
DOMoption.style.display = 'none';

document.getElementById('process').addEventListener('click', function() {
  var username = DOMinput.value;
  console.log(username);
  getProfile(username)
});

document.addEventListener('keypress', function(e) {
  if (e.keyCode === 13 || e.which === 13) {
    var username = DOMinput.value;
    console.log(username);
    getProfile(username)
  }
});

function getProfile(username) {
  document.querySelector('.profile').style.display = 'none'
  removeAllChildren('list');
  fetch("https://api.github.com/users/" + username)
    .then( res => res.json())
    .then( j => {
      console.log(j);
      showProfile(j);
      getFollowers(j.followers_url);
    })
}

function removeAllChildren(id) {
  let myNode = document.getElementById(id);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function showProfile(res) {
  document.querySelector('.loader').style.display = 'none';

  document.getElementById('avata').src = res.avatar_url;
  document.getElementById('username').textContent = res.login;
  document.getElementById('realname').textContent = res.name;
  document.getElementById('location').textContent = res.location;
  document.getElementById('bio').textContent = res.bio;
  document.getElementById('count').textContent = res.followers + ' Followers';

  document.querySelector('.profile').style.display = 'block'
}

function getFollowers(url) {
  fetch(url)
    .then( res => res.json() )
    .then( j => {
      showFollowers(j);
    })
}

function showFollowers(followers) {
  followers.forEach( (follower) => {
    let li = document.createElement('li');
    li.innerHTML = '<img src="' + follower.avatar_url + '" />';
    li.addEventListener('click', function() {
      DOMinput.value = follower.login;
      getProfile(follower.login)
    });
    document.getElementById('list').appendChild(li); 
  })
  DOMoption.style.display = 'block';
}
