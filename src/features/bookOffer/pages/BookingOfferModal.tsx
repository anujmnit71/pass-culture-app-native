import React, { useEffect } from 'react'

import { BookingWrapper } from 'features/bookOffer/context/BookingWrapper'
import { Step } from 'features/bookOffer/context/reducer'
import { useBookingContext } from 'features/bookOffer/context/useBookingContext'
import { useModalContent } from 'features/bookOffer/helpers/useModalContent'
import { analytics } from 'libs/firebase/analytics'
import { useFeatureFlag } from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { AppModal } from 'ui/components/modals/AppModal'
import { ModalLeftIconProps } from 'ui/components/modals/types'
import { Close } from 'ui/svg/icons/Close'

interface Props {
  visible: boolean
  offerId: number
  isEndedUsedBooking?: boolean
}

export const BookingOfferModalComponent: React.FC<Props> = ({
  visible,
  offerId,
  isEndedUsedBooking,
}) => {
  const { dismissModal, dispatch, bookingState } = useBookingContext()
  const { step } = bookingState
  const { title, leftIconAccessibilityLabel, leftIcon, onLeftIconPress, children } =
    useModalContent(isEndedUsedBooking)
  const enablePricesByCategories = useFeatureFlag(RemoteStoreFeatureFlags.WIP_PRICES_BY_CATEGORIES)

  const modalLeftIconProps = {
    leftIcon,
    leftIconAccessibilityLabel,
    onLeftIconPress,
  } as ModalLeftIconProps

  useEffect(() => {
    dispatch({ type: 'SET_OFFER_ID', payload: offerId })
  }, [offerId, dispatch])

  useEffect(() => {
    if (visible) {
      analytics.logBookingProcessStart(offerId)
    }
  }, [visible, offerId])

  const shouldAddSpacerBetweenHeaderAndContent =
    !enablePricesByCategories || (enablePricesByCategories && step && step === Step.CONFIRMATION)

  return (
    <AppModal
      animationOutTiming={1}
      visible={visible}
      title={title}
      {...modalLeftIconProps}
      rightIconAccessibilityLabel="Fermer la modale"
      rightIcon={Close}
      onRightIconPress={() => {
        dismissModal()
        dispatch({ type: 'RESET' })
      }}
      shouldAddSpacerBetweenHeaderAndContent={shouldAddSpacerBetweenHeaderAndContent}>
      {children}
    </AppModal>
  )
}

export const BookingOfferModal: React.FC<Props & { dismissModal: () => void }> = ({
  dismissModal,
  ...props
}) => (
  <BookingWrapper dismissModal={dismissModal}>
    <BookingOfferModalComponent {...props} />
  </BookingWrapper>
)
