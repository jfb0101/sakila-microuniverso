import dbService from './db'

class FilmDb {
    async saveFilm(film) {
        let db = await dbService.open()

        db.transaction(['films'],'readwrite')
        .objectStore('films').put(film)
    }

    async saveFilms(films) {
        return new Promise(async (resolve,reject) => {
            let db = await dbService.open()

            let filmsObjectStore = db.transaction('films',
            'readwrite').objectStore('films')

            saveNext(0)

            function saveNext(i) {
                if (i < films.length) {
                    let request = filmsObjectStore
                    .put(films[i])
                    request.onsuccess = () => saveNext(i+1)

                    request.onerror = reject
                    
                } else {
                    resolve()
                }
            }
        })
    }

    async loadAllFilms() {
        return new Promise(async (resolve,reject) => {
            let db = await dbService.open()
            let cursor = db
            .transaction('films','readonly')
            .objectStore('films')
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

    async deleteAllFilms() {

    }
}

export default new FilmDb