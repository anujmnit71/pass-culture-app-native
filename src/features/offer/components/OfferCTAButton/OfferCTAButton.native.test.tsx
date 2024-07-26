import React, { ComponentProps } from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { BookingsResponse, BookOfferResponse, OfferResponseV2 } from 'api/gen'
import { openUrl } from 'features/navigation/helpers/openUrl'
import { OfferCTAButton } from 'features/offer/components/OfferCTAButton/OfferCTAButton'
import { mockSubcategory, mockSubcategoryNotEvent } from 'features/offer/fixtures/mockSubcategory'
import { offerResponseSnap } from 'features/offer/fixtures/offerResponse'
import { mockedBookingApi } from 'fixtures/booking'
import { beneficiaryUser } from 'fixtures/user'
import { analytics } from 'libs/analytics'
import * as useFeatureFlagAPI from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { mockAuthContextWithoutUser, mockAuthContextWithUser } from 'tests/AuthContextUtils'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, fireEvent, render, screen, waitFor } from 'tests/utils'
import { SNACK_BAR_TIME_OUT } from 'ui/components/snackBar/SnackBarContext'

jest.mock('libs/network/NetInfoWrapper')

jest.mock('libs/jwt/jwt')
jest.mock('features/auth/context/AuthContext')

jest.mock('libs/subcategories/useSubcategories')

// feature flag wipPricesByCategories
jest.spyOn(useFeatureFlagAPI, 'useFeatureFlag').mockReturnValue(true)

jest.mock('features/navigation/helpers/openUrl')
const mockedOpenUrl = openUrl as jest.MockedFunction<typeof openUrl>

const offerId = offerResponseSnap.id

const offerDigitalAndFree = {
  isDigital: true,
  stocks: [
    {
      id: 118929,
      beginningDatetime: '2021-01-04T13:30:00',
      price: 0,
      isBookable: true,
      isExpired: false,
      isForbiddenToUnderage: false,
      isSoldOut: false,
      features: [],
    },
  ],
}

const mockShowErrorSnackBar = jest.fn()
jest.mock('ui/components/snackBar/SnackBarContext', () => ({
  useSnackBarContext: () => ({
    showErrorSnackBar: mockShowErrorSnackBar,
  }),
}))

const offerNotEventCTAButtonProps = {
  offer: offerResponseSnap,
  trackEventHasSeenOfferOnce: jest.fn(),
  subcategory: mockSubcategoryNotEvent,
}
const offerEventCTAButtonProps = {
  offer: offerResponseSnap,
  trackEventHasSeenOfferOnce: jest.fn(),
  subcategory: mockSubcategory,
}

jest.mock('libs/firebase/analytics/analytics')

describe('<OfferCTAButton />', () => {
  beforeEach(() => {
    mockAuthContextWithoutUser({ persist: true })
  })

  it('should open booking modal when login after booking attempt', async () => {
    mockServer.getApi<BookingsResponse>(`/v1/bookings`, {})
    mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, {
      responseOptions: { data: offerResponseSnap },
    })

    mockAuthContextWithUser(beneficiaryUser, { persist: true })
    const fromOfferId = 1
    const openModalOnNavigation = true
    useRoute.mockReturnValueOnce({ params: { fromOfferId, openModalOnNavigation } })
    renderOfferCTAButton(offerNotEventCTAButtonProps)

    await screen.findByText('Réserver l’offre')

    expect(await screen.findByText('Valider la date')).toBeOnTheScreen()
  })

  it('should display authentication modal when clicking on "Réserver l’offre"', async () => {
    renderOfferCTAButton(offerNotEventCTAButtonProps)

    fireEvent.press(await screen.findByText('Réserver l’offre'))

    expect(screen.getByText('Identifie-toi pour réserver l’offre')).toBeOnTheScreen()
  })

  it('should log analytics when display authentication modal', async () => {
    renderOfferCTAButton(offerNotEventCTAButtonProps)

    fireEvent.press(await screen.findByText('Réserver l’offre'))

    expect(analytics.logConsultAuthenticationModal).toHaveBeenNthCalledWith(1, offerId)
  })

  it('should display reservation impossible when user has already booked the offer', async () => {
    mockAuthContextWithUser(beneficiaryUser, { persist: true })
    mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, {
      responseOptions: { data: offerResponseSnap },
    })

    const expectedResponse: BookingsResponse = {
      ended_bookings: [
        {
          ...mockedBookingApi,
          stock: {
            ...mockedBookingApi.stock,
            offer: { ...mockedBookingApi.stock.offer, id: offerId },
          },
          dateUsed: '2023-02-14T10:10:08.800599Z',
        },
      ],
      hasBookingsAfter18: false,
      ongoing_bookings: [],
    }

    mockServer.getApi<BookingsResponse>(`/v1/bookings`, expectedResponse)
    mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, offerResponseSnap)

    const fromOfferId = 1
    useRoute.mockReturnValueOnce({ params: { fromOfferId } })

    renderOfferCTAButton(offerNotEventCTAButtonProps)

    fireEvent.press(screen.getByText('Réserver l’offre'))

    expect(await screen.findByText('Réservation impossible')).toBeOnTheScreen()
  })

  describe('When offer is digital and free and not already booked', () => {
    const expectedResponse: BookingsResponse = {
      ended_bookings: [],
      hasBookingsAfter18: false,
      ongoing_bookings: [
        {
          ...mockedBookingApi,
          stock: {
            ...mockedBookingApi.stock,
            offer: { ...mockedBookingApi.stock.offer, ...offerDigitalAndFree },
          },
          dateUsed: '2023-02-14T10:10:08.800599Z',
          completedUrl: 'https://www.google.fr/',
        },
      ],
    }

    describe('When booking API response is success', () => {
      beforeEach(() => {
        mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, offerResponseSnap)
        mockServer.getApi<BookingsResponse>('/v1/bookings', {
          requestOptions: { persist: true },
          responseOptions: { data: expectedResponse },
        })
        mockServer.postApi<BookOfferResponse>(`/v1/bookings`, { bookingId: 123 })
      })

      it("should directly book and redirect to the offer when pressing button to book the offer if offer isn't Event", async () => {
        mockAuthContextWithUser(beneficiaryUser, { persist: true })

        renderOfferCTAButton({
          ...offerNotEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
          subcategory: mockSubcategoryNotEvent,
        })

        fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))

        await waitFor(() => {
          expect(mockedOpenUrl).toHaveBeenNthCalledWith(1, 'https://www.google.fr/')
        })
      })

      it('should open when pressing button to book the offer if offer is Event', async () => {
        mockAuthContextWithUser(beneficiaryUser, { persist: true })

        renderOfferCTAButton({
          ...offerNotEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
          subcategory: mockSubcategoryNotEvent,
        })

        fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))

        await waitFor(() => {
          expect(mockedOpenUrl).toHaveBeenNthCalledWith(1, 'https://www.google.fr/')
        })
      })

      it('should log BookingConfirmation when pressing button to book the offer', async () => {
        mockAuthContextWithUser(beneficiaryUser)

        renderOfferCTAButton({
          ...offerNotEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
        })

        fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))

        await waitFor(() => {
          expect(analytics.logBookingConfirmation).toHaveBeenNthCalledWith(1, {
            bookingId: 123,
            offerId: 116656,
          })
        })
      })

      it('should not display an error message when pressing button to book the offer', async () => {
        mockAuthContextWithUser(beneficiaryUser)

        renderOfferCTAButton({
          ...offerNotEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
        })

        fireEvent.press(await screen.findByText('Accéder à l’offre en ligne'))

        await waitFor(() => {
          expect(mockShowErrorSnackBar).not.toHaveBeenCalled()
        })
      })
    })

    describe('When booking API response is error', () => {
      beforeEach(() => {
        mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, offerResponseSnap)
        mockServer.getApi<BookingsResponse>('/v1/bookings', {
          requestOptions: { persist: true },
          responseOptions: { data: expectedResponse },
        })
        mockServer.postApi<BookOfferResponse>(`/v1/bookings`, {
          responseOptions: {
            statusCode: 400,
          },
        })
      })

      it('should not direclty redirect to the offer when pressing button to book the offer', async () => {
        mockAuthContextWithUser(beneficiaryUser)

        renderOfferCTAButton({
          ...offerNotEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
        })

        fireEvent.press(await screen.findByText('Accéder à l’offre en ligne'))

        expect(mockedOpenUrl).not.toHaveBeenCalled()
      })

      it('should not log BookingConfirmation when pressing button to book the offer', async () => {
        mockAuthContextWithUser(beneficiaryUser)

        renderOfferCTAButton({
          ...offerNotEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
        })

        fireEvent.press(await screen.findByText('Accéder à l’offre en ligne'))

        expect(analytics.logBookingConfirmation).not.toHaveBeenCalled()
      })
    })

    it('should display an error message when pressing button to book the offer', async () => {
      mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, offerResponseSnap)
      mockServer.getApi<BookingsResponse>('/v1/bookings', {
        requestOptions: { persist: true },
        responseOptions: { data: expectedResponse },
      })
      mockServer.postApi<BookOfferResponse>(`/v1/bookings`, {
        responseOptions: {
          statusCode: 400,
        },
      })
      mockAuthContextWithUser(beneficiaryUser, { persist: true })

      renderOfferCTAButton({
        ...offerNotEventCTAButtonProps,
        offer: { ...offerResponseSnap, ...offerDigitalAndFree },
      })

      await act(async () => {
        fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))
      })

      expect(mockShowErrorSnackBar).toHaveBeenNthCalledWith(1, {
        message: 'Désolé, il est impossible d’ouvrir le lien. Réessaie plus tard.',
        timeout: SNACK_BAR_TIME_OUT,
      })
    })
  })

  describe('When offer is digital and free and already booked', () => {
    const expectedResponse: BookingsResponse = {
      ended_bookings: [],
      hasBookingsAfter18: false,
      ongoing_bookings: [
        {
          ...mockedBookingApi,
          stock: {
            ...mockedBookingApi.stock,
            offer: { ...mockedBookingApi.stock.offer, ...offerDigitalAndFree },
          },
          dateUsed: '2023-02-14T10:10:08.800599Z',
          completedUrl: 'https://www.google.fr/',
        },
      ],
    }

    it('should directly redirect to the offer when pressing offer access button', async () => {
      mockServer.getApi<BookingsResponse>(`/v1/bookings`, expectedResponse)
      mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, offerResponseSnap)
      mockAuthContextWithUser(
        { ...beneficiaryUser, bookedOffers: { 116656: 123 } },
        { persist: true }
      )

      renderOfferCTAButton({
        ...offerNotEventCTAButtonProps,
        offer: { ...offerResponseSnap, ...offerDigitalAndFree },
      })
      const bookingOfferButton = screen.getByText('Accéder à l’offre en ligne')
      await act(async () => {
        fireEvent.press(bookingOfferButton)
      })

      expect(mockedOpenUrl).toHaveBeenCalledTimes(1)
    })

    describe('and is Event', () => {
      it('should not open bookings details modal when pressing offer access button', async () => {
        mockServer.getApi<BookingsResponse>(`/v1/bookings`, expectedResponse)
        mockServer.getApi<OfferResponseV2>(`/v2/offer/${offerResponseSnap.id}`, offerResponseSnap)
        mockAuthContextWithUser(
          { ...beneficiaryUser, bookedOffers: { 116656: 123 } },
          { persist: true }
        )

        renderOfferCTAButton({
          ...offerEventCTAButtonProps,
          offer: { ...offerResponseSnap, ...offerDigitalAndFree },
        })
        const bookingOfferButton = screen.getByText('Voir ma réservation')
        await act(async () => {
          fireEvent.press(bookingOfferButton)
        })

        expect(screen.queryByText('Valider la date')).not.toBeOnTheScreen()
      })
    })
  })
})

type RenderOfferCTAButtonType = Partial<ComponentProps<typeof OfferCTAButton>>

function renderOfferCTAButton({
  offer = offerResponseSnap,
  subcategory = mockSubcategoryNotEvent,
  trackEventHasSeenOfferOnce = jest.fn(),
}: RenderOfferCTAButtonType) {
  render(
    reactQueryProviderHOC(
      <OfferCTAButton
        offer={offer}
        trackEventHasSeenOfferOnce={trackEventHasSeenOfferOnce}
        subcategory={subcategory}
      />
    )
  )
}
