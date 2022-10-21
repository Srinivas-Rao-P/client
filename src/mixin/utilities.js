import { Country, State, City } from "country-state-city";
import { postcodeValidator } from "postcode-validator";
export const utilities = {
  methods: {
    getCountryList() {
      return Country.getAllCountries();
    },
    getStateList(countrycode) {
      return State.getStatesOfCountry(countrycode);
    },
    getCityList(countrycode, statecode) {
      return City.getCitiesOfState(countrycode, statecode);
    },
    postcodeValidator(zipcode, countrycode) {
      return postcodeValidator(zipcode, countrycode);
    },
  },
};
