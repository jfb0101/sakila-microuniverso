import '@babel/polyfill'
import FilmCollection from '../../backbone/collections/FilmCollection'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import LanguageCollection from '../../backbone/collections/LanguageCollection';
import $ from 'jquery'
import FilmModel from '../../backbone/models/FilmModel';

const languageCollection = new LanguageCollection()

const FilmView = Backbone.View.extend({
    el: "#container",

    events: {
        'submit form' : 'save'
    },

    initialize: async function() {
        this.languages = await languageCollection.fetch()

        this.render()
    },

    render: function() {
        
        for (const language of this.languages) {
            $("#languageSelect").append(
                $("<option/>")
                .val(language.languageId)
                .text(language.name)
            )
        }
    },

    save: function(e) {
        const film = new FilmModel({
            title: $("#title").val(),
            languageId: $("#languageSelect").val()
        })

        film.save()

        e.preventDefault()
    }
})

var filmView = new FilmView()