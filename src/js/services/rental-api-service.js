import $ from 'jquery'
import API from './api'

class RentalAPIService {
    saveRental(rental) {
        return new Promise(async (resolve,reject) => {
            $.ajax({
                method: 'POST',
                url: `${API}/Rentals`,
                data: rental
            }).done(resolve).fail(reject)
        })
    }
}

export default new RentalAPIService