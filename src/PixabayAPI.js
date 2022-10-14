export class PixabayAPI {

    #page = 1;
    #query = '';
    #totalPages = 0;
    #perPage = 40;

    getPhotos() {
        const url =
            `https://pixabay.com/api/?key=30573092-ee1d5b60b5a26f0dd8b37d65c&q=${this.#query}&image_type=photo&per_page=${this.#perPage}&orientation=horizontal&safesearch=true&page=${this.#page}`
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
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