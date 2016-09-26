var tagTemplate = (
    '<%tagName @click="log()" @contextmenu="log()">' +
    '<component :is="childTag.type" :tag-data="childTag" v-for="childTag in tagData.children">' +
    '</component>' +
    '</%tagName>'
);

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