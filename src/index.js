import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchImages';

const refs = {
  formEl: document.querySelector('.search-form'),
  searchInputEl: document.querySelector('.search-input'),
  galleryEl: document.querySelector('.gallery'),
  // searchBtnEl: document.querySelector('.search-btn'),
};

const onSubmit = async evt => {
  evt.preventDefault();
  refs.galleryEl.innerHTML = '';
  try {
    const data = await fetchImages(refs.searchInputEl.value);
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
    const galleryElements = data.hits
      .map(
        el => `<a href="${el.largeImageURL}"><div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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
</div></a>`
      )
      .join('');
    refs.galleryEl.innerHTML = galleryElements;
  } catch (error) {
    console.log(error);
  }
};

refs.formEl.addEventListener('submit', onSubmit);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});
