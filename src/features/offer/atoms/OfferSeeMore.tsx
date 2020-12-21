import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import { logConsultDescriptionDetails } from 'libs/analytics'
import { _ } from 'libs/i18n'
import { ArrowNext } from 'ui/svg/icons/ArrowNext'
import { getSpacing, Spacer, Typo } from 'ui/theme'

import { dehumanizeId } from '../services/dehumanizeId'

interface Props {
  id: string
  longWording?: boolean
}
export const OfferSeeMore: React.FC<Props> = ({ id, longWording = false }) => {
  const { navigate } = useNavigation()

  const onPressSeeMore = () => {
    const offerId = dehumanizeId(id)
    if (offerId) logConsultDescriptionDetails(offerId)
    navigate('OfferDescription', { id })
  }

  return (
    <PressableContainer onPress={onPressSeeMore}>
      <Typo.ButtonText>
        {longWording ? _(t`Voir plus d'informations`) : _(t`voir plus`)}
      </Typo.ButtonText>
      <Spacer.Row numberOfSpaces={1} />
      <ArrowNext size={getSpacing(6)} />
    </PressableContainer>
  )
}

const PressableContainer = styled.TouchableOpacity({ flexDirection: 'row', alignItems: 'center' })
