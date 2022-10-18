import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from "./PixabayAPI";
import { createMarkup } from './createMarkup';
import { refs } from './refs';

const pixabay = new PixabayAPI();

const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0
}
const callback = async function (entries, observer) {
    entries.forEach(async entry => {
        if (entry.isIntersecting && entry.intersectionRect.bottom > 550) {
           
            pixabay.incrementPage();
            observer.unobserve(entry.target);


            try {
                const { hits } = await pixabay.getPhotos();
                const markup = createMarkup(hits);
   
                refs.list.insertAdjacentHTML('beforeend', markup);

                if (pixabay.isShowLoadMore) {
                    const target = document.querySelector('.photo-card:last-child');
                    io.observe(target);
            }

            } catch (error) {
                Notify.error('Something goes wrong');
                clearPage();
            }
        }
    })
}

const io = new IntersectionObserver(callback, options);

const handleSubmit = async (event) => {
  event.preventDefault()
    
    const {
        elements: { searchQuery },
    } = event.currentTarget;
    const search = searchQuery.value.trim().toLowerCase();

    if (!search) {
        Notify.failure(`Enter data to search!`);
        return;
    }
    
    pixabay.query = search;

    clearPage();

    try {
        const { hits, total } = await pixabay.getPhotos();
           
        if (hits.length === 0) {
            Notify.info(`No images found for your '${search}' request.`);
            return;
        }

        const markup = createMarkup(hits);
        refs.list.insertAdjacentHTML('beforeend', markup);
        
        pixabay.calculateTotalPages(total);

        Notify.success(`We found ${total} images by request '${search}'.`)
       
        if (pixabay.isShowLoadMore) {
            // refs.loadMoreBtn.classList.remove('is-hidden');
        const target = document.querySelector('.photo-card:last-child');
        io.observe(target);
        }

    } catch (error) {
        Notify.error('Something goes wrong');
        clearPage();
    }

    // pixabay
    //     .getPhotos(search)
    //     .then(({ hits, total }) => {

    //     if (hits.length === 0) {
    //         Notify.info(`No images found for your '${search}' request.`)
    //         return;
    //     }
            
    //     const markup = createMarkup(hits);
    //     refs.list.insertAdjacentHTML('beforeend', markup);
        
    //     pixabay.calculateTotalPages(total);

    //     Notify.success(`We found ${total} images by request '${search}'.`)
    //     if (pixabay.isShowLoadMore) {
    //         refs.loadMoreBtn.classList.remove('is-hidden');
    //     }
    // }).catch(error => {
    //     Notify.error('Something goes wrong');
    //     clearPage();
    // });
}

const onLoadMore = () => {
    pixabay.incrementPage();
    
    if (!pixabay.isShowLoadMore) {
        refs.loadMoreBtn.classList.add('is-hidden');
        }

    pixabay.getPhotos().then(({ hits, }) => {
        const markup = createMarkup(hits);
   
        refs.list.insertAdjacentHTML('beforeend', markup);
        
    }).catch(error => {
        Notify.error('Something goes wrong');
        clearPage();
    });
};

refs.form.addEventListener("submit", handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
    pixabay.resetPage()
    refs.list.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
}

