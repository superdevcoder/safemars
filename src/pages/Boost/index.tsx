import React from 'react'
import styled from 'styled-components'

import { RowBetween } from '../../components/Row'

const BoostWrapper = styled(RowBetween)`
    justify-content: center;
`

const Title = styled.h1`
    font-size: 80px;
    font-family: Staatliches;
`
const Soon = styled.p`
    font-size: 24px;
    font-family: Staatliches;
`

function Boost() {
    return (
        <BoostWrapper>
            <Title>Coming Soon</Title>
            
            <Soon>BullyBoost placeholder.</Soon>
        </BoostWrapper>
    )
}

export default Boost
