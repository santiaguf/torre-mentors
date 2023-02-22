// initial offset
let offset = 10;

// Get the modal
const modal = document.getElementById('myModal');

function LoadingText(action) {
  if (action) {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

function showMentorsTitle() {
  const mentorsTitle = document.getElementById('mentor-title');
  mentorsTitle.style.display = 'block';
}

function showClearButton() {
  const clearButton = document.getElementById('clear-button');
  clearButton.style.display = 'block';
}

function showLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more-button');
  loadMoreButton.style.display = 'block';
}

function createDiv(user, count) {
  const div = document.createElement('div');
  div.setAttribute('id', `card-${count}`);
  div.setAttribute('class', 'card col-sm-3 cardh');
  document.getElementsByTagName('body')[0].appendChild(div);

  const link = document.createElement('a');
  link.setAttribute('id', `link-${count}`);
  link.setAttribute('href', `https://bio.torre.co/${user.username}`);
  link.setAttribute('target', '_blank');
  div.appendChild(link);

  const img = document.createElement('img');
  img.setAttribute('id', `img-${count}`);
  img.setAttribute('src', `${user.picture}`);
  img.setAttribute('class', 'card-img-top');
  link.appendChild(img);

  const desc = document.createElement('div');
  desc.setAttribute('id', `card-text-${count}`);
  desc.setAttribute('class', 'card-body');
  link.appendChild(desc);

  const mentorName = document.createElement('h5');
  mentorName.setAttribute('id', `name-${count}`);
  mentorName.setAttribute('class', 'card-title');
  mentorName.textContent = `${user.name}`;
  desc.appendChild(mentorName);

  const mentorHeadline = document.createElement('p');
  mentorHeadline.setAttribute('id', `headline-${count}`);
  mentorHeadline.setAttribute('class', 'card-text');
  mentorHeadline.textContent = `${user.professionalHeadline}`;
  desc.appendChild(mentorHeadline);

  return div;
}

function showMentors(result) {
  LoadingText(false);
  showMentorsTitle();

  const mentorsDiv = document.querySelector('#mentors');
  Object.keys(result.results)
    .forEach((k) => mentorsDiv.appendChild(createDiv(result.results[k], k)));
  showClearButton();
  showLoadMoreButton();
  offset += 10;
}

function showErrorMessage(error) {
  LoadingText(false);

  const mentorsDiv = document.querySelector('#mentors');
  const div = document.createElement('div');
  div.setAttribute('id', 'error-card');
  div.setAttribute('class', 'card col-sm-2 alert alert-danger');
  div.style.width = '18rem';
  div.textContent = `Sorry, we can't load mentors list, error: ${error}`;
  mentorsDiv.appendChild(div);
  showClearButton();
}

function search(params) {
  LoadingText(true);

  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({ and: [{ opento: { term: 'mentoring' } }, { skill: { term: params, experience: 'potential-to-develop' } }] });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  const url = `https://search.torre.co/people/_search/?&offset=${offset}`;
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => showMentors(result))
    .catch((error) => showErrorMessage(error));
}

// eslint-disable-next-line no-unused-vars
function clearList() {
  const mentors = document.getElementById('mentors');
  mentors.innerHTML = '';
  offset = 10;

  const clearButton = document.getElementById('clear-button');
  clearButton.style.display = 'none';

  const loadMoreButton = document.getElementById('load-more-button');
  loadMoreButton.style.display = 'none';

  const mentorsTitle = document.getElementById('mentor-title');
  mentorsTitle.style.display = 'none';
}

const node = document.getElementById('searchTerm');
node.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    search(document.getElementById('searchTerm').value);
  }
});

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// clear list
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  clearList();
});

const searchButton = document.getElementsByClassName('search');

Array.from(searchButton).forEach((el) => {
  el.addEventListener('click', () => {
    search(document.getElementById('searchTerm').value);
  });
});
