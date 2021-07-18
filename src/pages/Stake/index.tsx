import React from 'react'
import styled from 'styled-components'

import { RowBetween } from '../../components/Row'

const StakeWrapper = styled(RowBetween)`
    justify-content: space-around;
`

const Title = styled.h1`
    font-size: 80px;
    font-family: Staatliches;
`

function Stake() {
    return (
        <StakeWrapper>
            <Title>Coming Soon</Title>
        </StakeWrapper>
    )
}

export default Stake
