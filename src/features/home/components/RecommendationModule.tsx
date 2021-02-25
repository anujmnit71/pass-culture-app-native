import React, { useCallback } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native'
import { GeoCoordinates } from 'react-native-geolocation-service'
import styled from 'styled-components/native'

import { OfferTile, ModuleTitle } from 'features/home/atoms'
import { DisplayParametersFields } from 'features/home/contentful'
import { dehumanizeId } from 'features/offer/services/dehumanizeId'
import { useFunctionOnce } from 'features/offer/services/useFunctionOnce'
import { AlgoliaHit } from 'libs/algolia'
import { analytics } from 'libs/analytics'
import { isCloseToEndHorizontal } from 'libs/analytics.utils'
import { formatDates, formatDistance, parseCategory, getDisplayPrice } from 'libs/parsers'
import { ColorsEnum, Spacer } from 'ui/theme'

type RecommendationModuleProps = {
  display: DisplayParametersFields
  isBeneficiary?: boolean
  position: GeoCoordinates | null
  hits: AlgoliaHit[]
  index: number
}

export const RecommendationModule = (props: RecommendationModuleProps) => {
  const { display, isBeneficiary, position, index } = props

  const moduleName = display.title
  const hits = props.hits
    .map((hit) => {
      const offerId = dehumanizeId(hit.offer.id)
      return offerId ? { ...hit, offerId } : undefined
    })
    .filter(Boolean) as Array<AlgoliaHit & { offerId: number }>

  const logHasSeenAllTiles = useFunctionOnce(() =>
    analytics.logAllTilesSeen(moduleName, hits.length)
  )

  const renderItem = useCallback(
    (hit: AlgoliaHit & { offerId: number }) => {
      const timestampsInMillis = hit.offer.dates?.map((timestampInSec) => timestampInSec * 1000)
      return (
        <Row key={hit.objectID}>
          <OfferTile
            category={parseCategory(hit.offer.category)}
            categoryName={hit.offer.category}
            offerId={hit.offerId}
            description={hit.offer.description || ''}
            distance={formatDistance(hit._geoloc, position)}
            name={hit.offer.name}
            date={formatDates(timestampsInMillis)}
            isDuo={hit.offer.isDuo}
            thumbUrl={hit.offer.thumbUrl}
            price={getDisplayPrice(hit.offer.prices)}
            layout={display.layout}
            isBeneficiary={isBeneficiary}
            moduleName={moduleName}
          />
          <Spacer.Row numberOfSpaces={4} />
        </Row>
      )
    },
    [position, isBeneficiary]
  )

  const checkIfAllTilesHaveBeenSeen = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isCloseToEndHorizontal({ ...nativeEvent, padding: 0 })) {
        logHasSeenAllTiles()
      }
    },
    []
  )

  return (
    <React.Fragment>
      <ModuleTitle
        title={display.title}
        color={index === 0 ? ColorsEnum.WHITE : ColorsEnum.BLACK}
      />
      <Spacer.Column numberOfSpaces={4} />
      <ScrollView
        horizontal={true}
        testID="recommendationModuleList"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        onScroll={checkIfAllTilesHaveBeenSeen}>
        <Spacer.Row numberOfSpaces={6} />
        {hits.map(renderItem)}
        <Spacer.Row numberOfSpaces={6} />
      </ScrollView>
    </React.Fragment>
  )
}

const Row = styled.View({ flexDirection: 'row' })
