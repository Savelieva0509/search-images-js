<<<<<<< HEAD
=======
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
>>>>>>> 05b4b256943acb4d7325acd546995d4efbda0936

export function createMarkup(photos) {
    return photos.map(({webformatURL ,largeImageURL, tags,likes,views,comments,downloads}) => {
      return `
      <div class="photo-card"> 
  <a class='card-link' href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes} Likes</b>
    </p>
    <p class="info-item">
      <b>${views} Views</b>
    </p>
    <p class="info-item">
      <b>${comments} Comments</b>
    </p>
    <p class="info-item">
      <b>${downloads} Downloads</b>
    </p>
  </div>
  </a>
</div>
 `
    }).join("")
}
 

export function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery', {
    captionsData: "alt",
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}