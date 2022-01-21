import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import styled from 'styled-components/native'

import { useBooking } from 'features/bookOffer/pages/BookingOfferWrapper'
import { useNotifyWebappLinkSent } from 'features/bookOffer/services/useNotifyWebappLinkSent'
import { useAddFavorite, useFavorite } from 'features/favorites/pages/useFavorites'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { analytics } from 'libs/analytics'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonTertiary } from 'ui/components/buttons/ButtonTertiary'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { SadFaceDeprecated as SadFace } from 'ui/svg/icons/SadFace_deprecated'
import { getSpacing, Spacer, Typo } from 'ui/theme'
import { ColorsEnum } from 'ui/theme/colors'
export const BookingImpossible: React.FC = () => {
  const { bookingState, dismissModal } = useBooking()
  const { offerId } = bookingState
  const favorite = useFavorite({ offerId })
  const { navigate } = useNavigation<UseNavigationType>()
  const { showErrorSnackBar } = useSnackBarContext()
  const { mutate: notifyWebappLinkSent } = useNotifyWebappLinkSent()

  useEffect(() => {
    if (typeof offerId == 'undefined') return
    analytics.logBookingImpossibleiOS(offerId)
  }, [offerId])

  const { mutate: addFavorite } = useAddFavorite({
    onSuccess: () => {
      if (typeof offerId == 'undefined') return
      analytics.logHasAddedOfferToFavorites({ from: 'bookingimpossible', offerId })
      notifyWebappLinkSent(offerId)
    },
    onError: () => {
      showErrorSnackBar({
        message: t`L'offre n'a pas été ajoutée à tes favoris`,
        timeout: SNACK_BAR_TIME_OUT,
      })
    },
  })

  if (typeof offerId == 'undefined') return null

  const addToFavourite = () => {
    addFavorite({ offerId })
    dismissModal()
  }

  const navigateToOffer = () => {
    dismissModal()

    const from = 'bookingimpossible'
    analytics.logConsultOffer({ offerId, from })
    navigate('Offer', { id: offerId, from })
  }

  return (
    <Container>
      <SadFace size={getSpacing(17)} color={ColorsEnum.GREY_DARK} />
      <Spacer.Column numberOfSpaces={6} />

      <Content>
        {t`Les conditions générales d'utilisation de l'App Store iOS ne permettent pas de réserver cette offre sur l'application.`}
      </Content>
      <Spacer.Column numberOfSpaces={6} />

      {favorite ? (
        <React.Fragment>
          <Content>{t`Rends-toi vite sur le site pass Culture afin de la réserver`}</Content>
          <Spacer.Column numberOfSpaces={6} />
          <ButtonPrimary title={t`Voir le détail de l'offre`} onPress={navigateToOffer} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Content>
            {t`Mets cette offre en favoris\u00a0: tu recevras une notification avec un lien pour la réserver sur notre application web\u00a0!`}
          </Content>
          <Spacer.Column numberOfSpaces={6} />
          <ButtonPrimary title={t`Mettre en favoris`} onPress={addToFavourite} />
          <Spacer.Column numberOfSpaces={4} />
          <ButtonTertiary title={t`Retourner à l'offre`} onPress={dismissModal} />
        </React.Fragment>
      )}
      <Spacer.Column numberOfSpaces={4} />
    </Container>
  )
}

const Container = styled.View({
  width: '100%',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
})
const Content = styled(Typo.Body)({ textAlign: 'center', paddingHorizontal: getSpacing(6) })
