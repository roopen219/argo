export default function (classList = []) {

    let classNames = {}

    classList.forEach(function (_class) {
        classNames[_class] = {
            type: [Object, Array, String],
            default: function () {
                return ''
            }
        }
    })

    return {
        props: {
            ...classNames
        }
    }

}
