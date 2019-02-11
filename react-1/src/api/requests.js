import fetcher from './apiFetcher'
import citiesList from './cities'

export const getCities = () => {
    return citiesList
}

export const getForecastByCoordinates = (lat, lng) => 
    fetcher.get(`https://api.darksky.net/forecast/a79b05c418038dfe1db363461392449c/${lat},${lng}?units=si`)
