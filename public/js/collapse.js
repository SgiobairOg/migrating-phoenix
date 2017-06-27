/**
 *
 * migrating-phoenix-mern
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * A Project for David Aerne
 * 6/27/17.
 *
 * No license is granted for this project.
 */

// collapse
const
  collapsibles = document.querySelectorAll('.collapsible'),
  toggles = document.querySelectorAll('[x-toggle]');

const init = (collapsibles, toggles, callback) => {
  console.info("Initialising...");
  collapsibles.forEach((collapsible) => {
    collapsible.classList.toggle('collapsible--collapsed');
  });
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', callback);
  })
};

const toggleHandler = (e) => {
  e.currentTarget.parentNode.classList.toggle('collapsible--collapsed');
  e.preventDefault();
  return true;
};

init(collapsibles, toggles, toggleHandler);