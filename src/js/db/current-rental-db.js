import dbService from './db'

class CurrentRentalDb {
    putFilmInCurrentRental = async film => {
        const db = await dbService.open()

        db.transaction('filmsInCurrentRental','readwrite')
        .objectStore('filmsInCurrentRental')
        .put(film)
    }

    getFilms = async () => {
        return new Promise(async (resolve,reject) => {
            let db = await dbService.open()
            let cursor = db
            .transaction('filmsInCurrentRental','readonly')
            .objectStore('filmsInCurrentRental')
            .openCursor()

            cursor.onerror = reject

            let films = []

            cursor.onsuccess = event => {
                let cursor = event.target.result

                if (cursor) {
                    films.push(cursor.value)
                    cursor.continue()
                } else {
                    resolve(films)
                }
            }
        })
    }
}

export default new CurrentRentalDb