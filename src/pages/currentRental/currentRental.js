import '@babel/polyfill'
import $ from 'jquery'
import ko from 'knockout'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import currentRentalDb from '../../js/db/current-rental-db';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import '../../components/client-selector/client-selector'
import * as moment from 'moment-timezone'
import rentalApiService from '../../js/services/rental-api-service'
import numericExtender from '../../js/extenders/numeric-extender'

class CurrentRentalViewModel {
    constructor() {
        this.films = ko.observableArray([])

        this.loadFilmsInCurrentRental()
    }

    loadFilmsInCurrentRental = async () => {
        let films = await currentRentalDb.getFilms()

        films = films.map(film => ko.observable({
            filmId: film.filmId,
            title: film.title,
            rentalRate: ko.observable(film.rentalRate).extend({numeric: {}}),
            rentalDuration: ko.observable(film.rentalDuration),
            editing: ko.observable(false)
        }))

        this.films(films)

    }

    edit = film => {
        if (film.editing()) {
            return
        }

        let selectedFilm = this.films()
        .find(f => f().filmId == film.filmId)

        selectedFilm().editing(true)
    }

    onKeyPressedInFilmInput = (film,event) => {
        if (event.keyCode == 13) {
            this.persistFilm(film)
        }
    }

    persistFilm = film => {
        currentRentalDb.putFilmInCurrentRental(
            ko.toJS(film)
        )
        let selectedFilm = this.films()
            .find(f => f().filmId == film.filmId)

        selectedFilm().editing(false)
    }

    saveRental = async () => {
        if (confirm('Confirm?')) {
            this.films().forEach(async film => {
                let rental = {
                    customerId: 
                        window.localStorage
                        .getItem('selectedClientId'),
                    returnDate: 
                        moment.tz(new Date(),
                            "America/Sao_Paulo")
                            .add(film().returnDate,'days')
                            .toDate()
                }

                await rentalApiService.saveRental(rental)


            })
        }
    }
}

$(document).ready(() => {
    ko.extenders.numeric = numericExtender
    ko.applyBindings(new CurrentRentalViewModel())
})