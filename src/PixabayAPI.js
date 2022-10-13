export class PixabayAPI {

    #page = 1;
    #searchQuery = '';

    getPhotos() {
        const url =
            `https://pixabay.com/api/?key=30573092-ee1d5b60b5a26f0dd8b37d65c&q=${this.#searchQuery}&image_type=photo&per_page=40&orientation=horizontal&safesearch=true&page=${this.#page}`
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }

    set search (newSearch) {
        this.#searchQuery = newSearch;
    }

     get search () {
         return this.#searchQuery;
    }

    incrementPage() {
        this.#page +=1
    }
}