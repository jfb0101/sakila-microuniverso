import Backbone from 'backbone'
import API from '../../js/services/api'

const LanguageCollection = Backbone.Collection.extend({
    url: API + '/Languages'
})

export default LanguageCollection