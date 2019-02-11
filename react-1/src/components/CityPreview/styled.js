import ListItem from '@material-ui/core/ListItem'
import { Star } from '@material-ui/icons'
import styled from 'styled-components'

export const CityItemList = styled(ListItem)`
    &&{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export const CityHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const StarIcon = styled(Star)`
    &&{
        font-size: 2rem;
        color: orange;
    }
`
