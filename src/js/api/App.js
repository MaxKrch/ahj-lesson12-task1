import Render from '../ui/Render.js';

export default class App {
  constructor({ container, url }) {
    this.url = url;
    this.container = document.querySelector(container);
    this.render = new Render();
    this.page = {
      main: {
        container: null,
        headerUpdate: null,
        headerTitle: null,
        newsFeed: null,
      },
      modal: {
        container: null,
        networkError: {
          container: null,
          main: {
            container: null,
            title: null,
            descr: null,
          },
          buttons: {
            container: null,
            confirm: null,
            cancel: null,
          },
        },
      },
    };
    this.eventListeners = {
      update: {
        click: new Set(),
      },
    };
  }

  registerEventListeners() {
    this.page.modal.networkError.buttons.confirm.addEventListener(
      'click',
      (event) => {
        this.eventListeners.update.click.forEach((item) => item(event));
      },
    );
    this.page.main.headerUpdate.addEventListener('click', (event) => {
      this.eventListeners.update.click.forEach((item) => item(event));
    });
    this.page.modal.networkError.buttons.cancel.addEventListener(
      'click',
      () => {
        this.hideModalNetworkError();
      },
    );
    this.page.modal.container.addEventListener('click', () => {
      this.hideModalNetworkError();
    });
  }

  renderPage() {
    this.renderMain();
    this.renderModal();

    this.container.append(this.page.main.container, this.page.modal.container);
  }

  renderMain() {
    this.page.main.container = this.render.mainContainer();
    this.page.main.headerUpdate = this.render.mainHeaderUpdate();
    this.page.main.headerTitle = this.render.mainHeaderTitle();
    this.page.main.newsFeed = this.render.newsFeedContainer();

    this.page.main.container.append(
      this.page.main.headerUpdate,
      this.page.main.headerTitle,
      this.page.main.newsFeed,
    );
  }

  renderModal() {
    this.page.modal.container = this.render.modalContainer();

    this.renderModalNetworkError();

    this.page.modal.container.append(this.page.modal.networkError.container);
  }

  renderModalNetworkError() {
    this.page.modal.networkError.container =
      this.render.networkErrorContainer();

    this.renderModalNetworkErrorMain();
    this.renderModalNetworkErrorButtons();

    this.page.modal.networkError.container.append(
      this.page.modal.networkError.main.container,
      this.page.modal.networkError.buttons.container,
    );
  }

  renderModalNetworkErrorMain() {
    this.page.modal.networkError.main.container =
      this.render.networkErrorMainContainer();
    this.page.modal.networkError.main.title =
      this.render.networkErrorMainTitle();
    this.page.modal.networkError.main.descr =
      this.render.networkErrorMainDescr();
    this.page.modal.networkError.main.container.append(
      this.page.modal.networkError.main.title,
      this.page.modal.networkError.main.descr,
    );
  }

  renderModalNetworkErrorButtons() {
    this.page.modal.networkError.buttons.container =
      this.render.networkErrorButtonsContainer();
    this.page.modal.networkError.buttons.confirm =
      this.render.networkErrorButtonsConfirm();
    this.page.modal.networkError.buttons.cancel =
      this.render.networkErrorButtonsCancel();
    this.page.modal.networkError.buttons.container.append(
      this.page.modal.networkError.buttons.confirm,
      this.page.modal.networkError.buttons.cancel,
    );
  }

  renderBlankElements(count = 3) {
    const newsBlankArray = [];

    for (let i = 0; i < count; i += 1) {
      const news = this.render.newsBlank();
      newsBlankArray.push(news);
    }

    this.disableScrollBody();
    this.clearNewsFeed();
    this.page.main.newsFeed.append(...newsBlankArray);
  }

  addEventListener(target, event, callback) {
    try {
      this.eventListeners[target][event].add(callback.bind(this));
    } catch (err) {
      console.log(`Что-то пошло не так: ${err}`);
    }
  }

  clearNewsFeed() {
    this.page.main.newsFeed.innerHTML = '';
  }

  disableScrollBody() {
    document.body.classList.add(`no-scroll`);
  }

  enableScrollBody() {
    document.body.classList.remove(`no-scroll`);
  }

  async requestNewsFeed() {
    try {
      const response = await fetch(`${this.url}/news`);
      const data = await response.json();

      if (data.success === true) {
        const newsFeedJson = data.data;
        const newsFeed = JSON.parse(newsFeedJson);

        this.updateNewsFeed(newsFeed);
        return;
      }
    } catch (err) {
      this.showModalNetworkError();
    }
  }

  reRequestNewsFeed() {
    this.disableScrollBody();
    this.requestNewsFeed();
    this.hideModalNetworkError();
  }

  showModalNetworkError() {
    this.showModal();
    this.page.modal.networkError.container.classList.remove(`hidden-item`);
  }

  showModal() {
    this.page.modal.container.classList.remove(`hidden-item`);
    this.disableScrollBody();
  }

  hideModalNetworkError() {
    this.hideModal();
    this.page.modal.networkError.container.classList.add(`hidden-item`);
  }

  hideModal() {
    this.page.modal.container.classList.add(`hidden-item`);
    this.enableScrollBody();
  }

  updateNewsFeed(newsFeed) {
    const newsElementArray = new Set();

    this.enableScrollBody();
    this.clearNewsFeed();

    newsFeed.forEach((news) => {
      const newsElement = this.render.newsItem(news);
      newsElementArray.add(newsElement);
    });

    this.page.main.newsFeed.append(...newsElementArray);
  }
}
