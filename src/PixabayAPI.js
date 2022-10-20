import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30573092-ee1d5b60b5a26f0dd8b37d65c';

export class PixabayAPI {

    #page = 1;
    #query = '';
    #totalPages = 0;
    #perPage = 40;
    #params = {
        params: {
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    }

   async getPhotos() {
        const url =
            `${BASE_URL}?${API_KEY}&q=${this.#query}&per_page=${this.#perPage}&page=${this.#page}`
        const {data} = await axios.get(url,this.#params);
        return data;
  }
   
    set query (newQuery) {
        this.#query = newQuery;
    }

     get query () {
         return this.#query;
    }

    incrementPage() {
        this.#page +=1
    }

    resetPage() {
        this.#page = 1;
    }

    calculateTotalPages(total) {
        this.#totalPages = Math.ceil(total / this.#perPage);
    }

    get isShowLoadMore() {
        return this.#page < this.#totalPages;
    }
}