var tagTemplate = '<%tagName @click="log()" @contextmenu="log()"' +
                    ':type="tagData.attrs.type"' +
                    ':src="tagData.attrs.src"' +
                    '/>';

module.exports = function (tagData) {
    var tagName = tagData.tagName || tagData.name;

    return {
        template: tagData.template ? tagData.template : tagTemplate.replace(/\%tagName/g, tagName),
        props: ['tagData'],
        methods: {
            log: function () {
                console.log('it works');
            }
        }
    };
};
