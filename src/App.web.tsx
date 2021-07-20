import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import { theme } from '@pass-culture/id-check'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from 'react-query'
import styled, { ThemeProvider } from 'styled-components/native'

import { AuthWrapper } from 'features/auth/AuthContext'
import { AsyncErrorBoundaryWithoutNavigation } from 'features/errors/pages/AsyncErrorBoundary'
import { routes, linking, initialRouteName } from 'features/navigation/RootNavigator/routes'
import { errorMonitoring } from 'libs/errorMonitoring'
import { activate } from 'libs/i18n'
import { queryClient } from 'libs/queryClient'

const StackNavigator = createStackNavigator()

const NAVIGATOR_SCREEN_OPTIONS = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
    flex: 1,
  },
}

export function App() {
  useEffect(() => {
    activate('fr')
  }, [])

  useEffect(() => {
    errorMonitoring.init({ enabled: !__DEV__ })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StyledSafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthWrapper>
            <ErrorBoundary FallbackComponent={AsyncErrorBoundaryWithoutNavigation}>
              <AppContainer>
                <AppBackground>
                  <AppContent>
                    <NavigationContainer linking={linking}>
                      <StackNavigator.Navigator
                        initialRouteName={initialRouteName}
                        headerMode="screen"
                        screenOptions={NAVIGATOR_SCREEN_OPTIONS}>
                        {routes.map((route) => (
                          <StackNavigator.Screen
                            name={route.name}
                            component={route.component}
                            key={route.name}
                          />
                        ))}
                      </StackNavigator.Navigator>
                    </NavigationContainer>
                  </AppContent>
                </AppBackground>
              </AppContainer>
            </ErrorBoundary>
          </AuthWrapper>
        </QueryClientProvider>
      </StyledSafeAreaProvider>
    </ThemeProvider>
  )
}

const StyledSafeAreaProvider = styled(SafeAreaProvider)({
  height: '100%',
})

const AppContainer = styled.View({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const AppBackground = styled.View({
  height: '100%',
  maxWidth: '500px',
  maxHeight: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#eb0055',
})

const AppContent = styled.View({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})
