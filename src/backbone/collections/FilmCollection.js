import Backbone from 'backbone'
import FilmModel from '../models/FilmModel'
import API from '../../js/services/api'

const FilmCollection = Backbone.Collection.extend({
    url: API + '/Films',
    model: FilmModel
})

export default FilmCollection