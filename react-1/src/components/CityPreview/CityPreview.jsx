import React from 'react'
import { CityItemList, CityHeader, StarIcon } from './styled'
import ForecastPreview, { ForecastIcon } from '../ForecastPreview'

const CityPreview = ({ city, onClick }) => {
    return <CityItemList button onClick={onClick}>
        <CityHeader>
            {city.fav && <StarIcon />}
            <h2>{city.name}</h2>
            <ForecastIcon forecast={city.forecast} />
        </CityHeader>
        <ForecastPreview forecast={city.forecast} />
    </CityItemList>
}

export default CityPreview