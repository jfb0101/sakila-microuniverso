import ko from 'knockout'

export default function (target) {
    let result = ko.pureComputed({
        read: target,
        write: function (newValue) {
            let newValueAsNumber = isNaN(newValue) ? null : Number(newValue)
            target(newValueAsNumber)
            target.notifySubscribers(newValueAsNumber)
        }
    })

    result(target())

    return result
}