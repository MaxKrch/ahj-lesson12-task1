import moment from 'moment';
const TEXT = {
  HEADER_UPDATE: `Обновить`,
  HEADER_TITLE: `Новости кино`,
  ERRORNETWORK_TITLE: `Не удалось загрузить новости`,
  ERRORNETWORK_DESCR: `Проверьте подключение к интернету и попробуйте обновить страницу`,
  ERRORNETWORK_CONFIRM: `Обновить`,
  ERRORNETWORK_CANCEL: `Закрыть`,
};

export default class Render {
  mainContainer() {
    const container = document.createElement(`main`);
    container.classList.add(`container`, `main-container`);

    return container;
  }

  mainHeaderUpdate() {
    const headerUpdate = document.createElement(`div`);
    headerUpdate.classList.add(`button`, `news-feed-update`);
    headerUpdate.dataset.id = `newsUpdate`;
    headerUpdate.textContent = TEXT.HEADER_UPDATE;

    return headerUpdate;
  }

  mainHeaderTitle() {
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add(`news-feed-title`);
    headerTitle.textContent = TEXT.HEADER_TITLE;

    return headerTitle;
  }

  newsFeedContainer() {
    const newsFeed = document.createElement(`ul`);
    newsFeed.classList.add(`news-feed-list`);
    newsFeed.dataset.id = `newsFeed`;

    return newsFeed;
  }

  modalContainer() {
    const container = document.createElement(`aside`);
    container.classList.add(`modal`, `modal-container`, `hidden-item`);

    return container;
  }

  networkErrorContainer() {
    const networkError = document.createElement(`article`);
    networkError.classList.add(
      `modal-body`,
      `modal-network-error`,
      `hidden-item`,
    );
    networkError.dataset.id = `modalNetworkError`;

    return networkError;
  }

  networkErrorMainContainer() {
    const networkErrorMain = document.createElement(`main`);
    networkErrorMain.classList.add(`modal-main`, `modal-network-error-main`);

    return networkErrorMain;
  }

  networkErrorMainTitle() {
    const networkErrorTitle = document.createElement(`h2`);
    networkErrorTitle.classList.add(`modal-title`, `modal-network-error-title`);
    networkErrorTitle.dataset.id = `ModalNetworkErrorTitle`;
    networkErrorTitle.textContent = TEXT.ERRORNETWORK_TITLE;

    return networkErrorTitle;
  }

  networkErrorMainDescr() {
    const networkErrorDescr = document.createElement(`p`);
    networkErrorDescr.classList.add(`modal-descr`, `modal-network-error-descr`);
    networkErrorDescr.dataset.id = `ModalNetworkErrorDescr`;
    networkErrorDescr.textContent = TEXT.ERRORNETWORK_DESCR;

    return networkErrorDescr;
  }

  networkErrorButtonsContainer() {
    const buttons = document.createElement(`div`);
    buttons.classList.add(`modal-buttons`, `modal-network-error-buttons`);

    return buttons;
  }

  networkErrorButtonsConfirm() {
    const confirm = document.createElement(`button`);
    confirm.classList.add(
      `button`,
      `modal-button`,
      `modal-network-error-button`,
      `modal-network-error-button-confirm`,
    );
    confirm.dataset.id = `modalNetworkErrorConfirm`;
    confirm.textContent = TEXT.ERRORNETWORK_CONFIRM;

    return confirm;
  }

  networkErrorButtonsCancel() {
    const cancel = document.createElement(`button`);
    cancel.classList.add(
      `button`,
      `modal-button`,
      `modal-network-error-button`,
      `modal-network-error-button-cancel`,
    );
    cancel.dataset.id = `modalNetworkErrorCancel`;
    cancel.textContent = TEXT.ERRORNETWORK_CANCEL;

    return cancel;
  }

  newsBlank() {
    const newsBlank = document.createElement(`li`);
    newsBlank.classList.add(`news-item`, `news-item_blank`);
    newsBlank.innerHTML = `
			<div class="blank news-date news-date_blank"></div>
			<div class="news-preview news-preview_blank">
				<div class="blank news-preview-img news-preview-img_blank"></div>
					<div class="news-preview-teaser news-preview-teaser_blank">
						<p class="blank news-preview-teaser_blank-p news-preview-teaser_blank-p_1"></p>
						<p class="blank news-preview-teaser_blank-p news-preview-teaser_blank-p_2"></p>
						<p class="blank news-preview-teaser_blank-p news-preview-teaser_blank-p_3"></p>
					</div>
				</div>
			</li>
		`;
    return newsBlank;
  }

  newsItem(news) {
    const newsEl = document.createElement(`li`);
    newsEl.classList.add(`news-item`);
    newsEl.dataset.name = `newsItem`;
    newsEl.dataset.id = news.id;

    const newsDate = this.createNewsDate(news);
    const newsPreview = this.createNewsPreview(news);

    newsEl.append(newsDate, newsPreview);

    return newsEl;
  }

  createNewsDate(news) {
    const date = moment(news.date).locale('ru').format('DD.MM.yy HH:MM');
    const dateEl = document.createElement(`div`);
    dateEl.classList.add(`news-date`);
    dateEl.dataset.name = `newsDate`;
    dateEl.dataset.id = news.id;
    dateEl.textContent = date;

    return dateEl;
  }
  createNewsPreview(news) {
    const poster = this.createNewsPreviewPoster(news);
    const teaser = this.createNewsPreviewTeaser(news);
    const newsPreview = document.createElement(`div`);

    newsPreview.classList.add(`news-preview`);
    newsPreview.dataset.name = `newsPreview`;
    newsPreview.dataset.id = news.id;
    newsPreview.append(poster, teaser);

    return newsPreview;
  }

  createNewsPreviewPoster(news) {
    const poster = document.createElement(`div`);
    poster.classList.add(`news-preview-img`);
    poster.dataset.name = `newsPreviewImg`;
    poster.dataset.id = news.id;

    const altText = news.teaser.slice(0, 12);
    poster.innerHTML = `
			<img 
				src="${news.poster}" 
				alt="${altText}"
				class="news-preview-img-img"
			>
		`;

    return poster;
  }

  createNewsPreviewTeaser(news) {
    const teaser = document.createElement(`div`);
    teaser.classList.add(`news-preview-teaser`);
    teaser.dataset.name = `newsPreviewTeaser`;
    teaser.dataset.id = news.id;
    teaser.textContent = news.teaser;

    return teaser;
  }
}
