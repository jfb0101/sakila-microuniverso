import ko from 'knockout'
import $ from 'jquery'
import html from './client-selector.html'
import clientApiService from '../../js/services/client-api-service'

class ClientSelectorComponent {
    constructor() {
        this.clients = ko.observableArray([])
        this.selectedClientId = ko.observable()

        this.updateClientList()

        

        

    }

    updateClientList = async () => {
        let clients = await clientApiService.loadAll()

        clients = clients.map(c => {
            c.fullName = c.firstName + ' ' + c.lastName
            return c
        })

        this.clients(clients)

        this.selectedClientId(window.localStorage
            .getItem('selectedClientId'))

        this.selectedClientId.subscribe(() => {
            if (this.selectedClientId() != undefined) {
                window.localStorage.setItem(
                    'selectedClientId',this.selectedClientId())
            }
        }) 


    }
}

$(document).ready(() => {
    ko.components.register('client-selector',{
        viewModel: ClientSelectorComponent,
        template: html
    })
})