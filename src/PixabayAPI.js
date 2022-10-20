import axios from 'axios';

<<<<<<< HEAD
const BASE_URL = 'https://pixabay.com/api/';
=======
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = '30573092-ee1d5b60b5a26f0dd8b37d65c';

// const BASE_URL = 'https://pixabay.com/api/';
>>>>>>> 05b4b256943acb4d7325acd546995d4efbda0936
const API_KEY = '30573092-ee1d5b60b5a26f0dd8b37d65c';

export class PixabayAPI {

    #page = 1;
    #query = '';
    #totalPages = 0;
    #perPage = 40;
    #params = {
        params: {
<<<<<<< HEAD
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
=======
            key: API_KEY,   
            // q: this.query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: this.perPage,
  },
    }

    async getPhotos () {
         const url =
            `?q=${this.#query}`
        const {data} = await axios.get(url,this.#params);
        return data;      
>>>>>>> 05b4b256943acb4d7325acd546995d4efbda0936
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