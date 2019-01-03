const plugins = []
process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']
process.UNI_LIBRARIES.forEach(libraryName => {
    plugins.push([
        'import',
        {
            'libraryName': libraryName,
            'customName': (name) => {
                return `${libraryName}/lib/${name}/${name}`
            }
        }
    ])
})
module.exports = {
    presets: [
        [
            '@vue/app',
            {
                useBuiltIns: 'entry'
            }
        ]
    ],
    plugins
}
