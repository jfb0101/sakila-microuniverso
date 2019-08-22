import $ from 'jquery'
import API from './api'

class LanguageApiService {
    listAll() {
        return new Promise((resolve,reject) => {
            $.ajax(`${API}/Languages`)
            .done(resolve)
            .fail(reject)
        })
    }
}

const languageApiService = new LanguageApiService()

export default languageApiService