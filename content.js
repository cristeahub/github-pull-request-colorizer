const me = document.querySelector('summary[aria-label="View profile and more"] img.avatar').alt.slice(1);

[].forEach.call(document.querySelectorAll('.js-issue-row'), row => {
  const reviewRequired = !!row.querySelector('[aria-label="Review required before merging"]');
  const changesRequested = row.querySelector('a.muted-link.tooltipped').innerText === 'Changes requested';
  const assignee = (row.querySelector('.from-avatar') || {alt: ''}).alt.slice(1);
  const author = row.querySelector('.opened-by .muted-link').innerText;
  const title = row.querySelector('.link-gray-dark.h4').innerText;
  const failsTravis = !!row.querySelector('.commit-build-statuses .text-red');
  const priorityLowLabel = row.querySelector('.labels a[title="Label: Priority: Low"]');

  let highlight = false;
  if(failsTravis && author === me) {
    highlight = true;
  }

  if(changesRequested && author === me) {
    highlight = true;
  }

  if(reviewRequired && author !== me && (assignee === me || assignee === '')) {
    highlight = true;
  }

  if(title.slice(0, 3) === 'WIP' && author != me) {
    highlight = false;
  }

  if(priorityLowLabel) {
    highlight = false;
  }

  if(highlight) {
    row.style.background = '#f8efc5';
    row.style.borderColor = "#f2df92";
  }
});
