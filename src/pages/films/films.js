import '@babel/polyfill'
import $ from 'jquery'
import ko from 'knockout'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'

import '../../../node_modules/font-awesome/css/font-awesome.min.css'

import filmApiService from '../../js/services/film-api-service'
import languageApiService from '../../js/services/language-api-service'
import filmDb from '../../js/db/film-db'
import {startSyncFilms} from '../../js/sync/synchronizer'
import currentRentalDb from '../../js/db/current-rental-db';
import '../../components/client-selector/client-selector'

class FilmsViewModel {
    
    constructor() {
        this.films = ko.observableArray([])
        this.languageList = ko.observableArray([])
        this.currentState = ko.observable('')
        this.film = ko.observable({})

        this.specialFeatures = ko.observableArray([])

        this.createFilmObservable()

        this.viewFilms()

        startSyncFilms().subscribe(() => {
            this.updateFilms()
        })

    }

    viewFilms = async () => {
        this.currentState('LIST')
        this.updateFilms()
    }

    updateFilms = async () => {
        let films = await filmDb.loadAllFilms()

        this.films(films)
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

    putFilmInCurrentRental = async film => {
        const filmToSave = {
            filmId: film.filmId,
            title: film.title,
            rentalRate: film.rentalRate,
            rentalDuration: film.rentalDuration
        }

        await currentRentalDb
            .putFilmInCurrentRental(filmToSave)
        
        window.location.href = "/currentRental.html"
    }

}

$(document).ready(() => {
    ko.applyBindings(new FilmsViewModel())
})