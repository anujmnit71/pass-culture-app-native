import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { SubcategoriesResponseModelv2 } from 'api/gen'
import { SearchWrapper } from 'features/search/context/SearchWrapper'
import { mockSuggestionHits } from 'features/search/fixtures/algolia'
import { SearchLanding } from 'features/search/pages/SearchLanding/SearchLanding'
import { placeholderData } from 'libs/subcategories/placeholderData'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, measurePerformance } from 'tests/utils'

jest.unmock('features/search/context/SearchWrapper')

jest.mock('react-instantsearch-core', () => ({
  ...jest.requireActual('react-instantsearch-core'),
  // API key used for test does not exist so we need to mock this part
  useInstantSearch: () => ({
    use: jest.fn(),
  }),
  // We mock this hook to simulate autocomplete suggestions
  useInfiniteHits: () => ({ hits: mockSuggestionHits }),
}))

// Performance measuring is run multiple times so we need to increase the timeout
const TEST_TIMEOUT_IN_MS = 30_000
jest.setTimeout(TEST_TIMEOUT_IN_MS)

describe('<SearchLanding />', () => {
  describe('Search Landing Page -', () => {
    beforeAll(() => {
      useRoute.mockReturnValue({ params: {} })
    })

    beforeEach(() => {
      mockServer.getApi<SubcategoriesResponseModelv2>('/v1/subcategories/v2', placeholderData)
    })

    it('Performance test for Search Landing page', async () => {
      await measurePerformance(<SearchPage />, {
        scenario: async () => {
          await act(async () => {})
        },
      })
    })
  })
})

const SearchPage = () =>
  reactQueryProviderHOC(
    <SearchWrapper>
      <SearchLanding />
    </SearchWrapper>
  )
