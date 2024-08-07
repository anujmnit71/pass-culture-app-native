import { useRoute } from '@react-navigation/native'
import React from 'react'

import { OfferResponseV2, RecommendationApiParams } from 'api/gen'
import { UseRouteType } from 'features/navigation/RootNavigator/types'
import { HitOfferWithArtistAndEan } from 'features/offer/api/fetchOffersByArtist/fetchOffersByArtist'
import { OfferPlaylist } from 'features/offer/components/OfferPlaylist/OfferPlaylist'
import { OfferTile } from 'features/offer/components/OfferTile/OfferTile'
import { PlaylistType } from 'features/offer/enums'
import { useLogPlaylist } from 'features/offer/helpers/useLogPlaylistVertical/useLogPlaylistVertical'
import { useLogScrollHandler } from 'features/offer/helpers/useLogScrolHandler/useLogScrollHandler'
import { OfferTileProps } from 'features/offer/types'
import { analytics } from 'libs/analytics'
import { usePlaylistItemDimensionsFromLayout } from 'libs/contentful/usePlaylistItemDimensionsFromLayout'
import { useFeatureFlag } from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { useRemoteConfigContext } from 'libs/firebase/remoteConfig/RemoteConfigProvider'
import { formatDates } from 'libs/parsers/formatDates'
import { getDisplayPrice } from 'libs/parsers/getDisplayPrice'
import { useCategoryHomeLabelMapping, useCategoryIdMapping } from 'libs/subcategories'
import { CategoryHomeLabelMapping, CategoryIdMapping } from 'libs/subcategories/types'
import { IntersectionObserver } from 'shared/IntersectionObserver/IntersectionObserver'
import { Offer, SimilarOfferPlaylist } from 'shared/offer/types'
import { SectionWithDivider } from 'ui/components/SectionWithDivider'

export type OfferPlaylistListProps = {
  offer: OfferResponseV2
  sameCategorySimilarOffers?: Offer[]
  apiRecoParamsSameCategory?: RecommendationApiParams
  otherCategoriesSimilarOffers?: Offer[]
  apiRecoParamsOtherCategories?: RecommendationApiParams
  sameArtistPlaylist?: HitOfferWithArtistAndEan[]
}

function isArrayNotEmpty<T>(data: T[] | undefined): data is T[] {
  return Boolean(data?.length)
}

type PlaylistItemProps = {
  offer: OfferResponseV2
  categoryMapping: CategoryIdMapping
  labelMapping: CategoryHomeLabelMapping
  apiRecoParams?: RecommendationApiParams
  variant: OfferTileProps['variant']
}

type RenderPlaylistItemProps = {
  item: Offer
  width: number
  height: number
  playlistType?: PlaylistType
}

const renderPlaylistItem = ({
  offer,
  categoryMapping,
  labelMapping,
  apiRecoParams,
  variant,
}: PlaylistItemProps) => {
  return function RenderItem({ item, width, height, playlistType }: RenderPlaylistItemProps) {
    const timestampsInMillis = item.offer.dates?.map((timestampInSec) => timestampInSec * 1000)

    return (
      <OfferTile
        offerLocation={item._geoloc}
        categoryLabel={labelMapping[item.offer.subcategoryId]}
        categoryId={categoryMapping[item.offer.subcategoryId]}
        subcategoryId={item.offer.subcategoryId}
        offerId={+item.objectID}
        name={item.offer.name}
        date={formatDates(timestampsInMillis)}
        isDuo={item.offer.isDuo}
        thumbUrl={item.offer.thumbUrl}
        price={getDisplayPrice(item.offer.prices)}
        width={width}
        height={height}
        analyticsFrom="offer"
        fromOfferId={offer.id}
        playlistType={playlistType}
        apiRecoParams={apiRecoParams}
        variant={variant}
      />
    )
  }
}

export function OfferPlaylistList({
  offer,
  sameCategorySimilarOffers,
  apiRecoParamsSameCategory,
  otherCategoriesSimilarOffers,
  apiRecoParamsOtherCategories,
  sameArtistPlaylist,
}: Readonly<OfferPlaylistListProps>) {
  const route = useRoute<UseRouteType<'Offer'>>()
  const fromOfferId = route.params?.fromOfferId
  const categoryMapping = useCategoryIdMapping()
  const labelMapping = useCategoryHomeLabelMapping()
  const { sameAuthorPlaylist: sameAuthorPlaylistConfig } = useRemoteConfigContext()
  const isNewOfferTileDisplayed = useFeatureFlag(RemoteStoreFeatureFlags.WIP_NEW_OFFER_TILE)

  const {
    logSameCategoryPlaylistVerticalScroll,
    logOtherCategoriesPlaylistVerticalScroll,
    logSameArtistPlaylistVerticalScroll,
  } = useLogPlaylist({
    offerId: offer.id,
    nbSameArtistPlaylist: sameArtistPlaylist?.length ?? 0,
    apiRecoParamsSameCategory,
    nbSameCategorySimilarOffers: sameCategorySimilarOffers?.length ?? 0,
    apiRecoParamsOtherCategories,
    nbOtherCategoriesSimilarOffers: otherCategoriesSimilarOffers?.length ?? 0,
    fromOfferId,
  })

  const handleChangeSameArtistPlaylistDisplay = useLogScrollHandler(
    logSameArtistPlaylistVerticalScroll
  )

  const handleChangeOtherCategoriesPlaylistDisplay = useLogScrollHandler(
    logOtherCategoriesPlaylistVerticalScroll
  )

  const handleChangeSameCategoryPlaylistDisplay = useLogScrollHandler(
    logSameCategoryPlaylistVerticalScroll
  )

  const enableSameArtistPlaylist = useFeatureFlag(RemoteStoreFeatureFlags.WIP_SAME_ARTIST_PLAYLIST)
  const shouldDisplaySameArtistPlaylist =
    !!isArrayNotEmpty(sameArtistPlaylist) && enableSameArtistPlaylist

  const trackingOnHorizontalScroll = (
    playlistType: PlaylistType,
    apiRecoParams?: RecommendationApiParams
  ) => {
    analytics.logPlaylistHorizontalScroll(fromOfferId, playlistType, apiRecoParams)
  }

  const { itemWidth, itemHeight } = usePlaylistItemDimensionsFromLayout('two-items')

  const sameCategorySimilarOffersPlaylist: SimilarOfferPlaylist = {
    type: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
    title: 'Dans la même catégorie',
    offers: sameCategorySimilarOffers,
    apiRecoParams: apiRecoParamsSameCategory,
    handleChangePlaylistDisplay: handleChangeSameCategoryPlaylistDisplay,
  }

  const otherCategoriesSimilarOffersPlaylist: SimilarOfferPlaylist = {
    type: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
    title: 'Ça peut aussi te plaire',
    offers: otherCategoriesSimilarOffers,
    apiRecoParams: apiRecoParamsOtherCategories,
    handleChangePlaylistDisplay: handleChangeOtherCategoriesPlaylistDisplay,
  }

  const sameArtistOffersPlaylist: SimilarOfferPlaylist = {
    type: PlaylistType.SAME_ARTIST_PLAYLIST,
    title: 'Du même auteur',
    offers: sameArtistPlaylist,
    handleChangePlaylistDisplay: handleChangeSameArtistPlaylistDisplay,
  }

  const similarOffersPlaylist: SimilarOfferPlaylist[] = []
  if (sameAuthorPlaylistConfig === 'withPlaylistAsFirst' && shouldDisplaySameArtistPlaylist) {
    similarOffersPlaylist.push(sameArtistOffersPlaylist)
  }
  similarOffersPlaylist.push(
    sameCategorySimilarOffersPlaylist,
    otherCategoriesSimilarOffersPlaylist
  )
  if (sameAuthorPlaylistConfig === 'withPlaylistAsLast' && shouldDisplaySameArtistPlaylist) {
    similarOffersPlaylist.push(sameArtistOffersPlaylist)
  }

  const shouldDisplayPlaylist =
    isArrayNotEmpty(sameCategorySimilarOffers) ||
    isArrayNotEmpty(otherCategoriesSimilarOffers) ||
    isArrayNotEmpty(sameArtistPlaylist)

  return (
    <SectionWithDivider visible={shouldDisplayPlaylist} gap={8}>
      {similarOffersPlaylist.map((playlist) => {
        if (!isArrayNotEmpty(playlist.offers)) {
          return null
        }

        return (
          <IntersectionObserver
            onChange={playlist.handleChangePlaylistDisplay}
            threshold="50%"
            key={playlist.type}>
            <OfferPlaylist
              items={playlist.offers}
              itemWidth={itemWidth}
              itemHeight={itemHeight}
              renderItem={renderPlaylistItem({
                offer,
                categoryMapping,
                labelMapping,
                apiRecoParams: playlist.apiRecoParams,
                variant: isNewOfferTileDisplayed ? 'new' : 'default',
              })}
              title={playlist.title}
              onEndReached={() => trackingOnHorizontalScroll(playlist.type, playlist.apiRecoParams)}
              playlistType={playlist.type}
            />
          </IntersectionObserver>
        )
      })}
    </SectionWithDivider>
  )
}
