import $ from 'jquery'
import API from './api'
import * as _ from 'lodash'

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
        return new Promise(async (resolve,reject) => {
            let filter = {
                fields: ['specialFeatures']
            }

            let specialFeatures = []

            $.ajax(`${API}/Films?filter=${JSON.stringify(filter)}`)
            .done(response => {
                specialFeatures = 
                    response.reduce((array,currentItem) => {
                        let currentSpecialFeaturesArray = 
                        currentItem.specialFeatures ?
                        currentItem.specialFeatures.split(",") :
                        []

                        array.push(...currentSpecialFeaturesArray)

                        return array
                    },[])


                resolve(_.uniq(specialFeatures))
            }).fail(reject)
        })
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