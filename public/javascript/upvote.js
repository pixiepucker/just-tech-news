async function upvoteClickHandler(event) {
  event.preventDefault();

  console.log('button clicked, bitch');
}

document
  .querySelector('.upvote-btn')
  .addEventListener('click', upvoteClickHandler);
