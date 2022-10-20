
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