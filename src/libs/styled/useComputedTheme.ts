import { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { DefaultTheme as DefaultThemeNative } from 'styled-components/native'

import { useMediaQuery } from 'libs/react-responsive/useMediaQuery'

export function useComputedTheme<A extends DefaultThemeNative>(theme: A) {
  const { width: windowWidth } = useWindowDimensions()
  const tabletMinWidth = theme.breakpoints.md
  const desktopMinWidth = theme.breakpoints.lg
  const minScreenHeight = theme.minScreenHeight
  const tabBarLabelMinScreenWidth = theme.tabBar.labelMinScreenWidth

  const isMobileViewport = useMediaQuery({ maxWidth: tabletMinWidth })
  const isTabletViewport = useMediaQuery({ minWidth: tabletMinWidth, maxWidth: desktopMinWidth })
  const isDesktopViewport = useMediaQuery({ minWidth: desktopMinWidth })
  const isSmallScreen = useMediaQuery({ maxHeight: minScreenHeight })
  const showLabels = useMediaQuery({ minWidth: tabBarLabelMinScreenWidth })
  const showTabBar = theme.isTouch || !!isMobileViewport
  const appContentWidth = Math.min(desktopMinWidth, windowWidth)

  return useMemo<A>(
    () => ({
      ...theme,
      tabBar: {
        ...theme.tabBar,
        showLabels,
      },
      isMobileViewport,
      isTabletViewport,
      isDesktopViewport,
      isSmallScreen,
      showTabBar,
      appContentWidth,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isMobileViewport,
      isTabletViewport,
      isDesktopViewport,
      isSmallScreen,
      showLabels,
      showTabBar,
      appContentWidth,
    ]
  )
}
