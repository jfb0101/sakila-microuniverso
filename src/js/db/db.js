const DB_VERSION = 2
const DB_NAME = 'sakila'

class Db {
    open = async () => {
        return new Promise(async (resolve,reject) => {
            let request = window.indexedDB.open(
                DB_NAME,DB_VERSION
            )

            request.onsuccess = () => resolve(request.result)

            request.onerror = error => reject(error)

            request.onupgradeneeded = event => {
                let db = event.target.result

                if (event.oldVersion < 1) {
                    db.createObjectStore('films',{
                        keyPath: 'filmId'
                    })
                }

                if (event.oldVersion < 2) {
                    db.createObjectStore('filmsInCurrentRental',{
                        keyPath: 'filmId'
                    })
                }

            }
        })


    }
}

export default new Db
