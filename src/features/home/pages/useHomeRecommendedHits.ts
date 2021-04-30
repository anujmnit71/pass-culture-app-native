import { GeoCoordinates } from 'react-native-geolocation-service'
import { useQuery } from 'react-query'

import { filterAlgoliaHit, formatAlgoliaHit } from 'features/home/pages/useHomeAlgoliaModules'
import { AlgoliaHit } from 'libs/algolia'
import { fetchAlgoliaHits } from 'libs/algolia/fetchAlgolia'
import { env } from 'libs/environment'
import { useGeolocation } from 'libs/geolocation'
import { QueryKeys } from 'libs/queryKeys'

import { useUserProfileInfo } from '../api'
import { RecommendationPane } from '../contentful/moduleTypes'

export const useHomeRecommendedHits = (
  recommendationModule: RecommendationPane | undefined
): AlgoliaHit[] => {
  const { position } = useGeolocation()
  const { data: profile } = useUserProfileInfo()
  const userId = profile?.id

  const recommendationEndpoint = getRecommendationEndpoint(userId, position)

  const { data: recommendedIds } = useQuery(
    QueryKeys.RECOMMENDATION_OFFER_IDS,
    async () => {
      const response = await fetch(recommendationEndpoint as string)
      return response.json() as Promise<{ recommended_offers: string[] }>
    },
    { enabled: !!recommendationModule && typeof userId === 'number' && !!recommendationEndpoint }
  )

  const ids = recommendedIds?.recommended_offers || []

  const { data } = useQuery(
    QueryKeys.RECOMMENDATION_HITS,
    async () => await fetchAlgoliaHits<AlgoliaHit>(ids),
    { enabled: ids.length > 0 }
  )

  if (!data?.results) return [] as AlgoliaHit[]

  return (data?.results as AlgoliaHit[]).filter(filterAlgoliaHit).map(formatAlgoliaHit)
}

export const getRecommendationEndpoint = (
  userId: number | undefined,
  position: GeoCoordinates | null
): string | undefined => {
  if (!userId) return undefined
  const endpoint = `${env.RECOMMENDATION_ENDPOINT}/recommendation/${userId}?token=${env.RECOMMENDATION_TOKEN}`

  if (position) return `${endpoint}&longitude=${position.longitude}&latitude=${position.latitude}`
  return endpoint
}
