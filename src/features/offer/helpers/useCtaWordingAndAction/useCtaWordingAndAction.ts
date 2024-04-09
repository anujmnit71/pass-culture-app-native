import { useRoute } from '@react-navigation/native'
import { UseMutateFunction } from 'react-query'

import { ApiError } from 'api/ApiError'
import {
  OfferResponse,
  FavoriteOfferResponse,
  UserProfileResponse,
  YoungStatusType,
  YoungStatusResponse,
  SubscriptionStatus,
  BookOfferResponse,
  BookOfferRequest,
  BookingReponse,
  SubcategoryIdEnum,
} from 'api/gen'
import { useAuthContext } from 'features/auth/context/AuthContext'
import {
  useBookings,
  useEndedBookingFromOfferId,
  useOngoingOrEndedBooking,
} from 'features/bookings/api'
import { useBookOfferMutation } from 'features/bookOffer/api/useBookOfferMutation'
import { openUrl } from 'features/navigation/helpers'
import { Referrals, UseRouteType } from 'features/navigation/RootNavigator/types'
import { BottomBannerTextEnum } from 'features/offer/components/MovieScreeningCalendar/enums'
import { MovieScreeningUserData } from 'features/offer/components/MovieScreeningCalendar/types'
import { getBookingOfferId } from 'features/offer/helpers/getBookingOfferId/getBookingOfferId'
import { getIsFreeDigitalOffer } from 'features/offer/helpers/getIsFreeDigitalOffer/getIsFreeDigitalOffer'
import { isUserUnderageBeneficiary } from 'features/profile/helpers/isUserUnderageBeneficiary'
import { analytics } from 'libs/analytics'
import { useFeatureFlag } from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { Subcategory } from 'libs/subcategories/types'
import { getDigitalOfferBookingWording } from 'shared/getDigitalOfferBookingWording/getDigitalOfferBookingWording'
import { OfferModal } from 'shared/offer/enums'
import { RecommendationApiParams } from 'shared/offer/types'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { ExternalNavigationProps, InternalNavigationProps } from 'ui/components/touchableLink/types'

import { useHasEnoughCredit } from '../useHasEnoughCredit/useHasEnoughCredit'

type UseGetCtaWordingAndActionProps = {
  offer: OfferResponse
  subcategory: Subcategory
  from?: Referrals
  searchId?: string
}

const getIsBookedOffer = (
  offerId: FavoriteOfferResponse['id'],
  bookedOffersIds: UserProfileResponse['bookedOffers'] = {}
): boolean => bookedOffersIds[offerId] !== undefined

type Props = {
  isLoggedIn: boolean
  userStatus: YoungStatusResponse
  isBeneficiary: boolean
  offer: OfferResponse
  subcategory: Subcategory
  hasEnoughCredit: boolean
  bookedOffers: UserProfileResponse['bookedOffers']
  isUnderageBeneficiary: boolean
  isEndedUsedBooking?: boolean
  bottomBannerText?: string
  isDisabled?: boolean
  bookOffer: UseMutateFunction<BookOfferResponse, Error | ApiError, BookOfferRequest>
  isBookingLoading: boolean
  booking: BookingReponse | null | undefined
  from?: Referrals
  searchId?: string
  enableNewXpCine?: boolean
  isDepositExpired?: boolean
}

export type ICTAWordingAndAction = {
  modalToDisplay?: OfferModal
  wording?: string
  navigateTo?: InternalNavigationProps['navigateTo']
  externalNav?: ExternalNavigationProps['externalNav']
  onPress?: () => void
  isEndedUsedBooking?: boolean
  bottomBannerText?: string
  isDisabled?: boolean
  movieScreeningUserData?: MovieScreeningUserData
}

// Follow logic of https://www.notion.so/Modalit-s-d-affichage-du-CTA-de-r-servation-dbd30de46c674f3f9ca9f37ce8333241
export const getCtaWordingAndAction = ({
  isLoggedIn,
  userStatus,
  isBeneficiary,
  offer,
  subcategory,
  hasEnoughCredit,
  bookedOffers,
  isUnderageBeneficiary,
  isEndedUsedBooking,
  bookOffer,
  isBookingLoading,
  booking,
  from,
  searchId,
  enableNewXpCine,
  isDepositExpired,
}: Props): ICTAWordingAndAction | undefined => {
  const { externalTicketOfficeUrl, subcategoryId } = offer

  const isAlreadyBookedOffer = getIsBookedOffer(offer.id, bookedOffers)
  const isFreeDigitalOffer = getIsFreeDigitalOffer(offer)
  const isMovieScreeningOffer = offer.subcategoryId === SubcategoryIdEnum.SEANCE_CINE
  const isNewXPCine = isMovieScreeningOffer && enableNewXpCine

  if (!isLoggedIn) {
    return {
      modalToDisplay: OfferModal.AUTHENTICATION,
      wording: isNewXPCine ? undefined : 'Réserver l’offre',
      isDisabled: false,
      onPress: () => {
        analytics.logConsultAuthenticationModal(offer.id)
      },
      movieScreeningUserData: { isUserLoggedIn: isLoggedIn },
    }
  }

  if (userStatus?.statusType === YoungStatusType.non_eligible && !externalTicketOfficeUrl) {
    return {
      wording: isNewXPCine ? undefined : 'Réserver l’offre',
      bottomBannerText: BottomBannerTextEnum.NOT_ELIGIBLE,
      isDisabled: true,
      movieScreeningUserData: { isUserEligible: false },
    }
  }

  if (isEndedUsedBooking) {
    return {
      modalToDisplay: OfferModal.BOOKING,
      wording: isNewXPCine ? undefined : 'Réserver l’offre',
      isEndedUsedBooking,
      isDisabled: false,
      bottomBannerText: isNewXPCine ? BottomBannerTextEnum.ALREADY_BOOKED : undefined,
      movieScreeningUserData: { bookings: booking as BookingReponse },
    }
  }

  if (userStatus?.statusType === YoungStatusType.eligible) {
    const common = {
      wording: isNewXPCine ? undefined : 'Réserver l’offre',
      isDisabled: false,
    }
    switch (userStatus.subscriptionStatus) {
      case SubscriptionStatus.has_to_complete_subscription:
        return {
          ...common,
          modalToDisplay: OfferModal.FINISH_SUBSCRIPTION,
          onPress: () => {
            analytics.logConsultFinishSubscriptionModal(offer.id)
          },
          movieScreeningUserData: { hasNotCompletedSubscriptionYet: true },
        }

      case SubscriptionStatus.has_subscription_pending:
        return {
          ...common,
          modalToDisplay: OfferModal.APPLICATION_PROCESSING,
          onPress: () => {
            analytics.logConsultApplicationProcessingModal(offer.id)
          },
          movieScreeningUserData: { hasNotCompletedSubscriptionYet: true },
        }

      case SubscriptionStatus.has_subscription_issues:
        return {
          ...common,
          modalToDisplay: OfferModal.ERROR_APPLICATION,
          onPress: () => {
            analytics.logConsultErrorApplicationModal(offer.id)
          },
          movieScreeningUserData: { hasNotCompletedSubscriptionYet: true },
        }
    }
  }

  if (isFreeDigitalOffer && userStatus?.statusType !== YoungStatusType.non_eligible) {
    return {
      wording: getDigitalOfferBookingWording(subcategoryId),
      isDisabled: isBookingLoading,
      onPress() {
        if (isAlreadyBookedOffer) {
          openUrl(booking?.completedUrl ?? '')
          return
        }

        bookOffer({
          quantity: 1,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          stockId: offer.stocks[0].id,
        })
      },
    }
  }

  if (isAlreadyBookedOffer) {
    return {
      wording: 'Voir ma réservation',
      isDisabled: false,
      navigateTo: {
        screen: 'BookingDetails',
        params: { id: bookedOffers[offer.id] },
        fromRef: true,
      },
      bottomBannerText: isNewXPCine ? BottomBannerTextEnum.ALREADY_BOOKED : undefined,
      movieScreeningUserData: {
        hasBookedOffer: true,
        bookings: booking as BookingReponse,
      },
    }
  }

  // Non beneficiary or educational offer or unavailable offer for user
  const isOfferCategoryNotBookableByUser = isUnderageBeneficiary && offer.isForbiddenToUnderage
  if (!isLoggedIn || !isBeneficiary || offer.isEducational || isOfferCategoryNotBookableByUser) {
    if (!externalTicketOfficeUrl) return { wording: undefined }

    return {
      wording: 'Accéder au site partenaire',
      externalNav: { url: externalTicketOfficeUrl },
      isDisabled: false,
    }
  }

  // Beneficiary
  if (isDepositExpired && isNewXPCine)
    return {
      bottomBannerText: BottomBannerTextEnum.CREDIT_HAS_EXPIRED,
      movieScreeningUserData: { isUserCreditExpired: true },
    }

  if (!offer.isReleased || offer.isExpired) return { wording: 'Offre expirée', isDisabled: true }
  if (offer.isSoldOut)
    return { wording: isNewXPCine ? undefined : 'Offre épuisée', isDisabled: true }

  if (!subcategory.isEvent) {
    if (!hasEnoughCredit) {
      if (offer.isDigital && !isUnderageBeneficiary)
        return { wording: 'Crédit numérique insuffisant', isDisabled: true }
      return { wording: 'Crédit insuffisant', isDisabled: true }
    }

    return {
      modalToDisplay: OfferModal.BOOKING,
      wording: 'Réserver l’offre',
      isDisabled: false,
      onPress: () => {
        analytics.logClickBookOffer({ offerId: offer.id, from, searchId })
      },
    }
  }

  if (subcategory.isEvent) {
    if (!hasEnoughCredit)
      return {
        wording: isNewXPCine ? undefined : 'Crédit insuffisant',
        bottomBannerText: isNewXPCine ? BottomBannerTextEnum.NOT_ENOUGH_CREDIT : undefined,
        movieScreeningUserData: { isUserLoggedIn: isLoggedIn, hasEnoughCredit },
        isDisabled: true,
      }

    return {
      modalToDisplay: OfferModal.BOOKING,
      wording: isNewXPCine ? undefined : 'Voir les disponibilités',
      isDisabled: false,
      onPress: () => {
        analytics.logConsultAvailableDates(offer.id)
        analytics.logClickBookOffer({ offerId: offer.id, from, searchId })
      },
      movieScreeningUserData: { hasEnoughCredit },
    }
  }
  return undefined
}

export const useCtaWordingAndAction = (props: UseGetCtaWordingAndActionProps) => {
  const { offer, from, searchId, subcategory } = props
  const offerId = offer.id
  const { isLoggedIn, user } = useAuthContext()
  const hasEnoughCredit = useHasEnoughCredit(offer)
  const isUnderageBeneficiary = isUserUnderageBeneficiary(user)
  const { data: endedBooking } = useEndedBookingFromOfferId(offerId)
  const { showErrorSnackBar } = useSnackBarContext()
  const enableNewXpCine = useFeatureFlag(RemoteStoreFeatureFlags.WIP_ENABLE_NEW_XP_CINE_FROM_OFFER)
  const route = useRoute<UseRouteType<'Offer'>>()
  const apiRecoParams: RecommendationApiParams = route.params.apiRecoParams
    ? JSON.parse(route.params.apiRecoParams)
    : undefined
  const playlistType = route.params.playlistType
  const fromOfferId = route.params.fromOfferId
  const fromMultivenueOfferId = route.params.fromMultivenueOfferId
  const isDepositExpired = user?.depositExpirationDate
    ? new Date(user?.depositExpirationDate) < new Date()
    : false

  const { refetch: getBookings } = useBookings()

  async function redirectToBookingAction(response: BookOfferResponse) {
    const bookings = await getBookings()

    const booking = bookings.data?.ongoing_bookings.find(
      (booking) => booking.id === response.bookingId
    )

    if (booking) {
      openUrl(booking.completedUrl ?? '')
    }
  }

  const { mutate: bookOffer, isLoading: isBookingLoading } = useBookOfferMutation({
    onSuccess(data) {
      analytics.logBookingConfirmation({
        ...apiRecoParams,
        offerId,
        bookingId: data.bookingId,
        fromOfferId,
        fromMultivenueOfferId,
        playlistType,
      })

      redirectToBookingAction(data)
    },
    onError() {
      const message = 'Désolé, il est impossible d’ouvrir le lien. Réessaie plus tard.'
      showErrorSnackBar({ message, timeout: SNACK_BAR_TIME_OUT })
    },
  })
  const { isBeneficiary = false, bookedOffers = {}, status } = user ?? {}
  const { data: booking } = useOngoingOrEndedBooking(getBookingOfferId(offerId, bookedOffers) ?? 0)
  /* check I have all information to calculate wording
   * why: avoid flash on CTA wording
   * The venue.id is not available on Homepage, or wherever we click on an offer
   * and preload the Offer details page. As a result, checking that venue.id
   * exists is equivalent to making sure the API call is successful.
   */
  if (isLoggedIn === null || user === null || !offer.venue.id) return

  const userStatus = status?.statusType ? status : { statusType: YoungStatusType.non_eligible }
  return getCtaWordingAndAction({
    isLoggedIn,
    userStatus,
    isBeneficiary,
    offer,
    subcategory,
    hasEnoughCredit,
    bookedOffers,
    isEndedUsedBooking: !!endedBooking?.dateUsed,
    isUnderageBeneficiary,
    bookOffer,
    isBookingLoading,
    booking,
    from,
    searchId,
    enableNewXpCine,
    isDepositExpired,
  })
}
