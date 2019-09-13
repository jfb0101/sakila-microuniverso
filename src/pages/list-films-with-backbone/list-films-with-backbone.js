import '@babel/polyfill'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import LanguageCollection from '../../backbone/collections/LanguageCollection';
import $ from 'jquery'
import FilmModel from '../../backbone/models/FilmModel';
import FilmCollection from '../../backbone/collections/FilmCollection'

const FilmTableView = Backbone.View.extend({
    el: "#filmsTable",

    initialize: async function() {
        this.filmCollection = new FilmCollection()
        await this.filmCollection.fetch()
        this.render()
    },

    render: function() {
        $(this.el).empty()

        $(this.el).append(`
            <thead>
                <th>Title</th>
                <th></th>
            </thead>
        `)

        for (const film of this.filmCollection.models) {
            const filmRowView = new FilmRowView({
                model: film
            })

            $(this.el).append('<tbody>').append(
                filmRowView.render().el
            )
        }
    }
})

var FilmRowView = Backbone.View.extend({
    tagName: "tr",

    events: {
        'click .edit-button': 'edit',
        'keypress .title-input': 'save'
    },

    render: function() {
        $(this.el).empty()

        if (this.model.editing) {
            $(this.el).append(`
                <td>
                    <input type="text" class="form-control title-input" value="${this.model.attributes.title}"/> 
                </td>
            `)
        } else {
            $(this.el).append(`
                <td>${this.model.attributes.title}</td>
            `)
        }

        if (!this.model.editing) {
            $(this.el).append(`
                <td>
                    <button class="btn btn-primary edit-button">
                        Edit
                    </button>
                </td>
            `)
        }

        return this
    },

    edit: function() {
        this.model.editing = true

        this.render()
    },

    save: async function(e) {
        if (e.which == 13) {
            this.model.attributes.title = e.target.value

            await this.model.save()

            this.model.editing = false

            this.render()
        }
    }
})



var filmTableView = new FilmTableView()