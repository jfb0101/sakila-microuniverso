import '@babel/polyfill'
import $ from 'jquery'
import ko from 'knockout'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'

import filmApiService from '../../js/services/film-api-service'
import languageApiService from '../../js/services/language-api-service'

class FilmsViewModel {
    
    constructor() {
        this.films = ko.observableArray([])
        this.languageList = ko.observableArray([])
        this.currentState = ko.observable('')
        this.film = ko.observable({})

        this.specialFeatures = ko.observableArray([])

        this.createFilmObservable()

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
       this.updateLanguageList()
       this.createFilmObservable()
       this.updateSpecialFeatures()

    }

    save = async () => {
        try {
            let filmToSave = ko.toJS(this.film)

            filmToSave.specialFeatures = 
                filmToSave.selectedSpecialFeatures.join()

            delete filmToSave.selectedSpecialFeatures
        
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

    updateLanguageList = async () => {
        this.languageList(
            (await languageApiService.listAll())
        )
    }

    createFilmObservable = () => {
        this.film({
            title: undefined,
            description: undefined,
            releaseYear: undefined,
            languageId: undefined,
            selectedSpecialFeatures: ko.observableArray([])
        })
    }

    updateSpecialFeatures = async () => {
        this.specialFeatures(
            (await filmApiService.listSpecialFeatures()))
    }

}

$(document).ready(() => {
    ko.applyBindings(new FilmsViewModel())
})