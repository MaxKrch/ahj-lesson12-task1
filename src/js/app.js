import App from './api/App.js';

window.addEventListener('load', async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register(`../service-worker.js`);
    }
  } catch (err) {
    console.log(err);
  }
});

const OPTIONS = {
  URL: 'http://localhost:7070',
  // URL: 'http://192.168.1.101:7070',
  CONTAINER: '[data-id="app"]',
};

const app = new App({
  container: OPTIONS.CONTAINER,
  url: OPTIONS.URL,
});

app.renderPage();
app.renderBlankElements();
app.addEventListener('update', 'click', app.reRequestNewsFeed);
app.registerEventListeners();

app.requestNewsFeed();
