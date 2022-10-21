import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { SearchGroupNameEnumv2 } from 'api/gen'
import { initialSearchState } from 'features/search/pages/reducer'
import { analytics } from 'libs/firebase/analytics'
import { GeoCoordinates } from 'libs/geolocation'
import { fireEvent, render, act, superFlushWithAct } from 'tests/utils'
import { theme } from 'theme'

import { SearchResults } from '../SearchResults'

jest.mock('react-query')

const mockSearchState = initialSearchState
const mockDispatchStagedSearch = jest.fn()
jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({
    searchState: mockSearchState,
    dispatch: jest.fn(),
  }),
  useStagedSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockDispatchStagedSearch,
  }),
}))

const mockData = { pages: [{ nbHits: 0, hits: [], page: 0 }] }
let mockHasNextPage = true
const mockFetchNextPage = jest.fn()
jest.mock('features/search/pages/useSearchResults', () => ({
  useSearchResults: () => ({
    data: mockData,
    hits: [],
    nbHits: 0,
    isFetching: false,
    isLoading: false,
    hasNextPage: mockHasNextPage,
    fetchNextPage: mockFetchNextPage,
    isFetchingNextPage: false,
  }),
}))

const mockSettings = jest.fn().mockReturnValue({ data: {} })
jest.mock('features/auth/settings', () => ({
  useAppSettings: jest.fn(() => mockSettings()),
}))

const DEFAULT_POSITION = { latitude: 2, longitude: 40 } as GeoCoordinates
let mockPosition: GeoCoordinates | null = DEFAULT_POSITION
const mockShowGeolocPermissionModal = jest.fn()

jest.mock('libs/geolocation/GeolocationWrapper', () => ({
  useGeolocation: () => ({
    position: mockPosition,
    showGeolocPermissionModal: mockShowGeolocPermissionModal,
  }),
}))

describe('SearchResults component', () => {
  it('should render correctly', async () => {
    jest.useFakeTimers()
    await superFlushWithAct()
    jest.advanceTimersByTime(2000)
    expect(render(<SearchResults />)).toMatchSnapshot()
    jest.useRealTimers()
    await superFlushWithAct()
  })

  it('should log SearchScrollToPage when hitting the bottom of the page', async () => {
    const { getByTestId } = render(<SearchResults />)
    const flatlist = getByTestId('searchResultsFlatlist')

    mockData.pages.push({ hits: [], page: 1, nbHits: 0 })
    await act(async () => {
      flatlist.props.onEndReached()
    })
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1)
    expect(analytics.logSearchScrollToPage).toHaveBeenCalledWith(1)

    mockData.pages.push({ hits: [], page: 2, nbHits: 0 })
    await act(async () => {
      flatlist.props.onEndReached()
    })
    expect(mockFetchNextPage).toHaveBeenCalledTimes(2)
    expect(analytics.logSearchScrollToPage).toHaveBeenCalledWith(2)
  })

  it('should not log SearchScrollToPage when hitting the bottom of the page if no more results', async () => {
    mockHasNextPage = false
    const { getByTestId } = render(<SearchResults />)
    const flatlist = getByTestId('searchResultsFlatlist')
    await act(async () => {
      flatlist.props.onEndReached()
    })
    expect(analytics.logSearchScrollToPage).not.toHaveBeenCalled()
  })

  it('should display location filter button', async () => {
    const { queryByTestId } = render(<SearchResults />)
    await act(async () => {
      expect(queryByTestId('locationButton')).toBeTruthy()
    })
  })

  it('should open the categories filter modal when pressing the category button', async () => {
    const { getByTestId } = render(<SearchResults />)
    const categoryButton = getByTestId('categoryButton')

    await act(async () => {
      fireEvent.press(categoryButton)
    })

    const fullscreenModalScrollView = getByTestId('fullscreenModalScrollView')

    expect(fullscreenModalScrollView).toBeTruthy()
  })

  it('should display category filter button', async () => {
    const { queryByTestId } = render(<SearchResults />)

    await act(async () => {
      expect(queryByTestId('categoryButton')).toBeTruthy()
    })
  })

  it('should display an icon and change color in category button when has category selected', async () => {
    useRoute.mockReturnValueOnce({
      params: { offerCategories: [SearchGroupNameEnumv2.CD_VINYLE_MUSIQUE_EN_LIGNE] },
    })
    const { getByTestId } = render(<SearchResults />)

    const categoryButtonIcon = getByTestId('categoryButtonIcon')
    await act(async () => {
      expect(categoryButtonIcon).toBeTruthy()
    })

    const categoryButton = getByTestId('categoryButton')
    expect(categoryButton).toHaveStyle({ borderColor: theme.colors.primary })

    const categoryButtonLabel = getByTestId('categoryButtonLabel')
    expect(categoryButtonLabel).toHaveStyle({ color: theme.colors.primary })
  })

  it('should display price filter button', async () => {
    const { queryByTestId } = render(<SearchResults />)

    await act(async () => {
      expect(queryByTestId('priceButton')).toBeTruthy()
    })
  })

  it('should open the prices filter modal when pressing the prices filter button', async () => {
    const { getByTestId } = render(<SearchResults />)
    const priceButton = getByTestId('priceButton')

    await act(async () => {
      fireEvent.press(priceButton)
    })

    const fullscreenModalScrollView = getByTestId('fullscreenModalScrollView')

    expect(fullscreenModalScrollView).toBeTruthy()
  })

  it('should display an icon and change color in prices filter button when has prices filter selected', async () => {
    useRoute.mockReturnValueOnce({
      params: { minPrice: '5' },
    })
    const { getByTestId } = render(<SearchResults />)

    const priceButtonIcon = getByTestId('priceButtonIcon')
    await act(async () => {
      expect(priceButtonIcon).toBeTruthy()
    })

    const priceButton = getByTestId('priceButton')
    expect(priceButton).toHaveStyle({ borderColor: theme.colors.primary })

    const priceButtonLabel = getByTestId('priceButtonLabel')
    expect(priceButtonLabel).toHaveStyle({ color: theme.colors.primary })
  })

  it('should display type filter button', async () => {
    const { queryByTestId } = render(<SearchResults />)

    await act(async () => {
      expect(queryByTestId('typeButton')).toBeTruthy()
    })
  })

  it('should open the type filter modal when pressing the type filter button', async () => {
    const { getByTestId, queryByTestId } = render(<SearchResults />)
    const typeButton = getByTestId('typeButton')

    await act(async () => {
      fireEvent.press(typeButton)
    })

    const fullscreenModalScrollView = getByTestId('fullscreenModalScrollView')

    expect(fullscreenModalScrollView).toBeTruthy()

    const isInverseLayout = queryByTestId('inverseLayout')

    expect(isInverseLayout).toBeFalsy()
  })

  it.each`
    type               | params
    ${'duo offer'}     | ${{ offerIsDuo: true }}
    ${'digital offer'} | ${{ offerTypes: { isDigital: true, isEvent: false, isThing: false } }}
    ${'event offer'}   | ${{ offerTypes: { isDigital: false, isEvent: true, isThing: false } }}
    ${'thing offer'}   | ${{ offerTypes: { isDigital: false, isEvent: false, isThing: true } }}
  `(
    'should display an icon and change color in type button when has $type selected',
    async ({ params }) => {
      useRoute.mockReturnValueOnce({
        params,
      })
      const { getByTestId } = render(<SearchResults />)

      const typeButtonIcon = getByTestId('typeButtonIcon')
      await act(async () => {
        expect(typeButtonIcon).toBeTruthy()
      })

      const typeButton = getByTestId('typeButton')
      expect(typeButton).toHaveStyle({ borderColor: theme.colors.primary })

      const typeButtonLabel = getByTestId('typeButtonLabel')
      expect(typeButtonLabel).toHaveStyle({ color: theme.colors.primary })
    }
  )

  it('should not display geolocation incitation button when position is not null', async () => {
    const { queryByText } = render(<SearchResults />)

    await act(async () => {
      expect(queryByText('Géolocalise toi')).toBeFalsy()
    })
  })

  it.each`
    filter                                                      | params
    ${'digital offer'}                                          | ${{ offerTypes: { isDigital: true, isEvent: false, isThing: false } }}
    ${`${SearchGroupNameEnumv2.EVENEMENTS_EN_LIGNE} category`}  | ${{ offerCategories: [SearchGroupNameEnumv2.EVENEMENTS_EN_LIGNE] }}
    ${`${SearchGroupNameEnumv2.PLATEFORMES_EN_LIGNE} category`} | ${{ offerCategories: [SearchGroupNameEnumv2.PLATEFORMES_EN_LIGNE] }}
  `(
    'should not display geolocation incitation button when $filter filter selected and position is null',
    async ({ params }) => {
      mockPosition = null
      useRoute.mockReturnValueOnce({
        params,
      })
      const { queryByText } = render(<SearchResults />)

      await act(async () => {
        expect(queryByText('Géolocalise toi')).toBeFalsy()
      })
    }
  )

  it('should display geolocation incitation button when position is null', async () => {
    mockPosition = null
    const { queryByText } = render(<SearchResults />)

    await act(async () => {
      expect(queryByText('Géolocalise toi')).toBeTruthy()
    })
  })

  it('should open geolocation activation incitation modal when pressing geolocation incitation button', async () => {
    mockPosition = null

    const { getByText } = render(<SearchResults />)

    await act(async () => {
      fireEvent.press(getByText('Géolocalise toi'))
    })

    expect(mockShowGeolocPermissionModal).toHaveBeenCalled()
  })
})
