import Backbone from 'backbone'
import API from '../../js/services/api'

const FilmModel = Backbone.Model.extend({
    idAttribute: "filmId",
    urlRoot: API + '/Films'
})

export default FilmModel