import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({

    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#01627F",
                // primary: colors.indigo,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                honeydew: colors.lightBlue.lighten5,
            },
            dark: {
                primary: colors.red,
            },
        },
    },
})