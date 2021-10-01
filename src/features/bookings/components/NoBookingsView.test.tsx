import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { getTabNavigateConfig } from 'features/navigation/TabBar/helpers'
import { analytics } from 'libs/analytics'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { fireEvent, render } from 'tests/utils'

import { NoBookingsView } from './NoBookingsView'

const mockDispatchSearch = jest.fn()

jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({
    dispatch: mockDispatchSearch,
  }),
}))

describe('<NoBookingsView />', () => {
  beforeEach(jest.clearAllMocks)

  it('should navigate to Search when pressing button and log event', () => {
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const renderAPI = render(reactQueryProviderHOC(<NoBookingsView />))
    const button = renderAPI.getByText('Explorer les offres')
    fireEvent.press(button)
    const tabNavigateConfig = getTabNavigateConfig('Search', { showResults: true })
    expect(navigate).toBeCalledWith(tabNavigateConfig.screen, tabNavigateConfig.params)
    expect(analytics.logDiscoverOffers).toHaveBeenCalledWith('bookings')
  })
})
