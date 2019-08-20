import $ from 'jquery'
import API from './api'

class FilmApiService {
    listAll() {
        return new Promise((resolve,reject) => {
            let filter = {
                order: 'filmId desc'
            }

            $.ajax(`${API}/Films?filter=${JSON.stringify(filter)}`).done(resolve)
            .fail(reject)
        })
    }

    listSpecialFeatures() {

    }

    save(film) {
        return new Promise((resolve,reject) => {
            $.ajax({
                method: 'POST',
                url: `${API}/Films`,
                data: film
            }).done(resolve).fail(reject)
        })
    }
}

const filmApiService = new FilmApiService()

export default filmApiService