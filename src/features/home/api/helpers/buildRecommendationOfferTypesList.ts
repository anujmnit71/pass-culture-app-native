import { GenreType } from 'api/gen'
import { RecommendedOffersParameters } from 'features/home/types'
import { RecommendedIdsRequest } from 'libs/recommendation/types'

export const buildRecommendationOfferTypesList = ({
  bookTypes,
  movieGenres,
  musicTypes,
}: {
  bookTypes: RecommendedOffersParameters['bookTypes']
  movieGenres: RecommendedOffersParameters['movieGenres']
  musicTypes: RecommendedOffersParameters['musicTypes']
}): RecommendedIdsRequest['offerTypeList'] => {
  let offerTypesList: RecommendedIdsRequest['offerTypeList'] = []

  const formattedBookTypes: RecommendedIdsRequest['offerTypeList'] = bookTypes?.map((bookType) => ({
    key: GenreType.BOOK,
    value: bookType,
  }))
  const formattedMovieGenres: RecommendedIdsRequest['offerTypeList'] = movieGenres?.map(
    (movieGenre) => ({
      key: GenreType.MOVIE,
      value: movieGenre,
    })
  )
  const formattedMusicTypes: RecommendedIdsRequest['offerTypeList'] = musicTypes?.map(
    (movieGenre) => ({
      key: GenreType.MUSIC,
      value: movieGenre,
    })
  )

  offerTypesList = offerTypesList?.concat(formattedBookTypes ?? [])
  offerTypesList = offerTypesList?.concat(formattedMovieGenres ?? [])
  offerTypesList = offerTypesList?.concat(formattedMusicTypes ?? [])

  return offerTypesList
}
