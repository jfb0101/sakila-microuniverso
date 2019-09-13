import $ from 'jquery'
import API from './api'

class ClientAPIService {
    loadAll() {
        return new Promise(async (resolve,reject) => {
            $.ajax(`${API}/Customers`).done(resolve)
            .fail(reject)
        })
    }
}

export default new ClientAPIService