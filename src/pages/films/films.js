import '@babel/polyfill'
import $ from 'jquery'
import ko from 'knockout'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'

import filmApiService from '../../js/services/film-api-service'

class FilmsViewModel {
    
    constructor() {
        this.films = ko.observableArray([])
        this.currentState = ko.observable('')
        this.film = ko.observable({
            title:undefined,
            description:undefined,
            releaseYear:undefined
        })

        this.viewFilms()
    }

    viewFilms = async () => {
        this.currentState('LIST')

        let films = await filmApiService.listAll()

        this.films(films)

        // sem usar o await (usando then)
        // filmApiService.listAll().then(films => {
        //     this.films(films)
        // })

    }

    createNewFilm = () => {
       this.currentState('CREATE')
       this.film({
        title: undefined,
        description: undefined,
        releaseYear: undefined
       })

    }

    save = async () => {
        try {
            let filmToSave = ko.toJS(this.film)
        
            await filmApiService.save(filmToSave)
            
            this.viewFilms()
        } catch (error) {
            console.error(`Failed`)
            console.error(error)
        }
    }

    cancel = () => {
        this.viewFilms()
    }

}

$(document).ready(() => {
    ko.applyBindings(new FilmsViewModel())
})