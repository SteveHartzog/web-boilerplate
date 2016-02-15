import router from './router';
import { config } from '../package.json';

document.addEventListener('DOMContentLoaded', function(event) {
  // Tie up the route to our handlebars templates
  router.addListener(function(transitionTo, transitionFrom) {
    let route = transitionTo.name === 'home' ? 'home' : transitionTo.params.section;
    setRouteView(route);
  });

  // Render header template
  document.getElementsByTagName('header')[0].innerHTML = Handlebars.templates['header']();

  // Render nav template
  document.getElementById('headNav').innerHTML = Handlebars.templates['nav'](config.navigation);

  // Render footer template
  var footer = config.footer;
  footer.currentYear = new Date().getFullYear().toString();
  document.getElementsByTagName('footer')[0].innerHTML = Handlebars.templates['footer'](config.footer);

  // start default route
  router.start(function (err, state) {
    let route = state.name === 'home' ? 'home' : state.params.section;
    setRouteView(route);
  });
});

function setRouteView(route) {
  let template = Handlebars.templates[route];
  document.getElementById('content').innerHTML = template();

  let elements = document.querySelectorAll('#navbar li a');
  let i;
  if (elements.length !== undefined && elements.length > 0) {
    for (i = 0; i < elements.length; ++i) {
      var a = elements[i];
      a.parentElement.className = (a.href.includes('#/' + route)) ? 'active' : '';
    }
  } else {
    elements.parentElement.className = (elements.href.includes('#/' + route)) ? 'active' : '';
  }
}
