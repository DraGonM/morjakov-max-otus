import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ForecastPreviewBlock, ForecastRow, ForecastParam } from './styled'

const ForecastPreview = ({ forecast }) => {
    if (!forecast.lastUpdated)
        return <CircularProgress />

    return <ForecastPreviewBlock>
        <ForecastRow>
            <ForecastParam>Summary: {forecast.summary}</ForecastParam>
            <ForecastParam>Tempature: {forecast.temperature} °C</ForecastParam>
        </ForecastRow>
        <ForecastRow>
            <ForecastParam>Pressure: {forecast.pressure} hPa</ForecastParam>
            <ForecastParam>Wind speed: {forecast.windSpeed} m/s</ForecastParam>
        </ForecastRow>
    </ForecastPreviewBlock>
}

export default ForecastPreview