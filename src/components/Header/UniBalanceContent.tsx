import { ChainId, TokenAmount } from '@pancakeswap-libs/sdk'
import BigNumber from 'bignumber.js';
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/safemars-logo.png'
import { SAFEMARS } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, TYPE, UniTokenAnimated } from '../../theme'
import usePriceData from '../../utils/usePriceData'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #dd1818 0%, #333333 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function UniBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const safemars = chainId ? SAFEMARS[chainId] : undefined

  const totalSupply: TokenAmount | undefined = useTotalSupply(safemars)
  const priceData = usePriceData()
  const safemarsPrice = priceData && safemars ?new BigNumber(priceData.data[safemars.address].price) : undefined

  const safemarsTotal = useTokenBalance(account ?? undefined, safemars)
  const safemarsDecimalTotal = safemarsTotal ? new BigNumber(safemarsTotal.toExact()) : undefined

  const safemarsBalance = safemarsPrice && safemarsDecimalTotal
  ? safemarsPrice.multipliedBy(safemarsDecimalTotal)
  : undefined;

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your BullexToken Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={32} fontWeight={600} color="white">
                  {safemarsTotal?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">${safemarsBalance?.toFormat(2)}</TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">BullexToken price:</TYPE.white>
              <TYPE.white color="white">${safemarsPrice?.toFixed(11) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {safemars && safemars.chainId === ChainId.MAINNET ? (
              <ExternalLink href="https://pancakeswap.info/pool/0x3f3d4b3027a355fb6a21156698a069fa729a3f0b">View BullexToken Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
