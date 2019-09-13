import filmApiService from '../services/film-api-service'
import filmDb from '../db/film-db'
import { Subject } from 'rxjs';
import io from 'socket.io-client'

const subject = new Subject()

export function startSyncFilms() {

    const socket = io.connect(
        'http://adamantio.com.br:4041'
    )

    socket.on('lastFilmsUpdate',async (lastUpdate) => {
        const currentLastUpdate = 
            window.localStorage.getItem('lastFilmsUpdate')

        if (!currentLastUpdate || 
                currentLastUpdate < lastUpdate) {
                await updateFilms()
                window.localStorage.setItem('lastFilmsUpdate',
                lastUpdate)
        }
        
    })
    socket.on('filmModified', updateFilms)

    updateFilms()

    return subject

    async function updateFilms() {
        let films = await filmApiService.listAll()

        await filmDb.saveFilms(films)

        subject.next()
    }
}