import React from 'react'

import { useAuthContext } from 'features/auth/context/AuthContext'
import { BookingPropertiesSection } from 'features/bookings/components/BookingPropertiesSection'
import { bookingsSnap } from 'features/bookings/fixtures/bookingsSnap'
import { Booking } from 'features/bookings/types'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { render, screen, waitFor } from 'tests/utils'

jest.mock('features/auth/context/AuthContext')
const mockUseAuthContext = useAuthContext as jest.Mock

describe('<BookingPropertiesSection />', () => {
  beforeAll(() => {
    const { user: globalMockUser } = mockUseAuthContext()
    mockUseAuthContext.mockReturnValue({
      user: {
        ...globalMockUser,
        firstName: 'Christophe',
        lastName: 'Dupont',
      },
    })
  })

  const booking = bookingsSnap.ongoing_bookings[0]

  it('should display user firstname and lastname', async () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties(booking)

    await waitFor(() => {
      expect(screen.getByText('Christophe\u00a0Dupont')).toBeOnTheScreen()
    })
  })

  it('should display duo icon when offer is duo', async () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    booking.quantity = 2
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties(booking)

    await waitFor(() => {
      expect(screen.getByTestId('duo-icon')).toBeOnTheScreen()
    })
  })

  it('should display date label', async () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties(booking)

    await waitFor(() => {
      expect(screen.getByText('Le 15 mars 2021 à 21h00')).toBeOnTheScreen()
    })
  })

  it('should display location label if offer is not permanent and not a digital event', async () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    booking.stock.offer.isDigital = false
    // @ts-expect-error: because of noUncheckedIndexedAccess
    booking.stock.offer.isPermanent = false
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties(booking)
    await waitFor(() => {
      expect(screen.getByText('Maison de la Brique, Drancy')).toBeOnTheScreen()
    })
  })

  it('should display price line with price details', () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties(booking)

    expect(screen.getByText('8\u00a0€')).toBeOnTheScreen()
    expect(screen.getByText('(4\u00a0€ x 2 places)')).toBeOnTheScreen()
  })

  it("should display cinema's attributes when booked offer has attributes", () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties(booking)

    expect(screen.getByText('- VOSTFR 3D IMAX')).toBeOnTheScreen()
    expect(screen.getByTestId('price-line__price-detail')).toBeOnTheScreen()
    expect(screen.getByTestId('price-line__attributes')).toBeOnTheScreen()
  })

  it("should not show cinema's attributes when booked offer has not attributes", () => {
    // @ts-expect-error: because of noUncheckedIndexedAccess
    renderBookingProperties({ ...booking, stock: { ...booking.stock, features: [] } })

    expect(screen.queryByTestId('price-line__attributes')).not.toBeOnTheScreen()
  })
})

function renderBookingProperties(booking: Booking) {
  return render(reactQueryProviderHOC(<BookingPropertiesSection booking={booking} />))
}
