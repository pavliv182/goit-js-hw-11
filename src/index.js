import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchImages';

import { Pagination } from 'tui-pagination';

import * as TUI from './js/tuiPagination';

// const Pagination = require('tui-pagination');

const refs = {
  formEl: document.querySelector('.search-form'),
  searchInputEl: document.querySelector('.search-field'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more__btn'),
  // searchBtnEl: document.querySelector('.search-btn'),
};

refs.loadMoreBtnEl.classList.add('is-hidden');

let page = 1;

const markup = data => {
  const galleryElements = data.hits
    .map(
      el => `<div class="photo-card"><a href="${el.largeImageURL}">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${el.downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  const gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
  });

  refs.galleryEl.insertAdjacentHTML('beforeend', galleryElements);

  refs.loadMoreBtnEl.classList.remove('is-hidden');

  gallery.refresh();
  // refs.galleryEl.insertAdjacentHTML(
  //   'beforeend',
  //   `<button class='load-more__btn'>Load more</button>`
  // );
};

const onSubmit = async evt => {
  evt.preventDefault();
  refs.galleryEl.innerHTML = '';
  try {
    const data = await fetchImages(refs.searchInputEl.value, page);
    console.log(data);
    if (!data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (refs.searchInputEl.value === '') {
      Notify.info('Enter something');
      return;
    }

    markup(data);
  } catch (error) {
    console.log(error);
  }
};

async function loadMore() {
  try {
    page += 1;
    const data = await fetchImages(refs.searchInputEl.value, page);
    markup(data);
  } catch (error) {
    console.log(error);
  }
}

refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreBtnEl.addEventListener('click', loadMore);
