import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from "./PixabayAPI";
import { createMarkup } from './createMarkup';
import { refs } from './refs';

const pixabay = new PixabayAPI();

const handleSubmit = (event) => {
  event.preventDefault()
    
    const {
        elements: {searchQuery},
    } = event.currentTarget
    const search = searchQuery.value.trim().toLowerCase();
    console.log(search);
    if (!search) {
        Notify.failure (`Enter data to search!`)
        return;
        
    }
    
    pixabay.searchQuery = search;
    pixabay.getPhotos(search).then(({hits}) => {
        const markup = createMarkup(hits); 
        console.log(markup);
        refs.list.insertAdjacentHTML('beforeend',markup)
    });
   

}
const onLoadMore = () => {
    pixabay.incrementPage();

    pixabay.getPhotos().then(({ hits }) => {
        const markup = createMarkup(hits);
        console.log(markup);
        refs.list.insertAdjacentHTML('beforeend', markup)
    });
};

refs.form.addEventListener("submit", handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore)
