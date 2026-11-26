const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const searchForm = document.querySelector('#search-form');
const issueSelect = document.querySelector('#legal-issue');
const locationInput = document.querySelector('#location');
const cards = document.querySelectorAll('.card');
const filters = document.querySelectorAll('.filter');
const noResults = document.querySelector('#no-results');
const dialog = document.querySelector('#match-dialog');
const matchButton = document.querySelector('#match-button');
const dialogClose = document.querySelector('.dialog-close');
const matchForm = document.querySelector('#match-form');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

function filterCards(type = 'All', issue = '') {
  let visibleCount = 0;

  cards.forEach((card) => {
    const typeMatches = type === 'All' || card.dataset.type === type;
    const issueMatches = !issue || card.dataset.issue.includes(issue);
    const isVisible = typeMatches && issueMatches;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  noResults.hidden = visibleCount !== 0;
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    filterCards(button.dataset.filter, issueSelect.value);
  });
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const issue = issueSelect.value;
  const location = locationInput.value.trim();

  document.querySelector('#resources').scrollIntoView({ behavior: 'smooth' });
  filterCards('All', issue);

  if (!issue && location) {
    filterCards('All', '');
  }
});

matchButton.addEventListener('click', () => dialog.showModal());
dialogClose.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

matchForm.addEventListener('submit', (event) => {
  event.preventEvent?.();
  event.preventDefault();
  const name = new FormData(matchForm).get('name');
  dialog.close();
  matchForm.reset();
  alert(`Thank you${name ? `, ${name}` : ''}. A legal aid representative will contact you about next steps.`);
});
