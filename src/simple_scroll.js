import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

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