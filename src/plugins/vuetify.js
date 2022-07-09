import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    dark: false,
    theme: {
        themes: {
            light: {
                // primary: "#01627F",
                primary: "#195F73",
                secondary: "#008b8b",
                accent: colors.shades.black,
                error: "e6a08c",
                white: "#ffffff",
                // honeydew: "#DBF5F0",
                // honeydew: "#f8fcff",
                honeydew: "#F5F7FB",
                // honeydew: "#e6f5fa",
                // honeydew: "#F9F9F9",
                // honeydew:"#FAFAFA",
            }
        },
    },
})