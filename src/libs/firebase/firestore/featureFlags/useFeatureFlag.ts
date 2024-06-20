import { useQuery } from 'react-query'

import { getAllFeatureFlags } from 'libs/firebase/firestore/featureFlags/getAllFeatureFlags'
import { FeatureFlagConfig } from 'libs/firebase/firestore/featureFlags/types'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { useRemoteConfigContext } from 'libs/firebase/remoteConfig'
import { eventMonitoring } from 'libs/monitoring'
import { getAppBuildVersion } from 'libs/packageJson'
import { QueryKeys } from 'libs/queryKeys'

const appBuildVersion = getAppBuildVersion()

// firestore feature flag documentation:
// https://www.notion.so/passcultureapp/Feature-Flag-e7b0da7946f64020b8403e3581b4ed42#fff5fb17737240c9996c432117acacd8
export const useFeatureFlag = (featureFlag: RemoteStoreFeatureFlags): boolean => {
  const { data: docSnapshot } = useQuery(QueryKeys.FEATURE_FLAGS, getAllFeatureFlags, {
    staleTime: 1000 * 30, // 30 seconds
  })
  const { shouldLogInfo } = useRemoteConfigContext()

  if (!docSnapshot) return false

  const { minimalBuildNumber, maximalBuildNumber } =
    docSnapshot.get<FeatureFlagConfig>(featureFlag) ?? {}

  if (minimalBuildNumber === undefined && maximalBuildNumber === undefined) return false

  if (
    !!(minimalBuildNumber && maximalBuildNumber) &&
    minimalBuildNumber > maximalBuildNumber &&
    shouldLogInfo
  ) {
    eventMonitoring.captureException(
      `Minimal build number is greater than maximal build number for feature flag ${featureFlag}`,
      {
        level: 'info',
        extra: {
          minimalBuildNumber,
          maximalBuildNumber,
        },
      }
    )
    return false
  }
  return (
    (!minimalBuildNumber || minimalBuildNumber <= appBuildVersion) &&
    (!maximalBuildNumber || maximalBuildNumber >= appBuildVersion)
  )
}
