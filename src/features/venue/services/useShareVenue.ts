import { t } from '@lingui/macro'
import { Platform } from 'react-native'

import { VenueResponse } from 'api/gen'
import { getScreenPath } from 'features/navigation/RootNavigator/linking/getScreenPath'
import { analytics } from 'libs/analytics'
import { WEBAPP_V2_URL } from 'libs/environment'
import { useFunctionOnce } from 'libs/hooks'
import { share } from 'libs/share'

import { useVenue } from '../api/useVenue'

export function getVenueUrl(id: number) {
  const path = getScreenPath('Venue', { id })
  return `${WEBAPP_V2_URL}${path}`
}

const shareVenue = async (venue: VenueResponse) => {
  const message = t({
    id: 'share venue message',
    values: { name: venue.publicName || venue.name },
    message: 'Retrouve "{name}" sur le pass Culture',
  })

  const url = getVenueUrl(venue.id)

  // url share content param is only for iOs, so we add url in message for android
  const completeMessage = Platform.OS === 'ios' ? message : message.concat(`\n\n${url}`)

  const shareContent = {
    message: completeMessage,
    url, // iOS only
    title: message, // android only
  }
  const shareOptions = {
    subject: message, // iOS only
    dialogTitle: message, // android only
  }
  await share(shareContent, shareOptions)
}

export const useShareVenue = (venueId: number): (() => Promise<void>) => {
  const { data: venue } = useVenue(venueId)

  const logShareVenue = useFunctionOnce(() => {
    analytics.logShareVenue(venueId)
  })

  return async () => {
    logShareVenue()
    if (typeof venue === 'undefined') return
    await shareVenue(venue)
  }
}
