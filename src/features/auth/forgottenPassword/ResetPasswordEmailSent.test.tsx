import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { act, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { openInbox } from 'react-native-email-link'
import waitForExpect from 'wait-for-expect'

import { analytics } from 'libs/analytics'
import { flushAllPromises } from 'tests/utils'

import { contactSupport } from '../support.services'

import { ResetPasswordEmailSent } from './ResetPasswordEmailSent'

jest.mock('@react-navigation/native', () => jest.requireActual('@react-navigation/native'))

describe('<ResetPasswordEmailSent />', () => {
  it('should match snapshot', async () => {
    const instance = renderPage()

    await act(async () => {
      await flushAllPromises()
    })

    expect(instance).toMatchSnapshot()
  })

  it('should open mail app when clicking on contact support button', async () => {
    const { findByText } = renderPage()

    const contactSupportButton = await findByText('Contacter le support')
    fireEvent.press(contactSupportButton)

    await waitForExpect(() => {
      expect(analytics.logContactSupport).toBeCalledTimes(1)
      expect(contactSupport.forResetPasswordEmailNotReceived).toHaveBeenCalledTimes(1)
      expect(contactSupport.forResetPasswordEmailNotReceived).toHaveBeenCalledWith(
        'john.doe@gmail.com'
      )
    })
  })

  it('should open mail app when clicking on check email button', async () => {
    const { findByText } = renderPage()

    const checkEmailsButton = await findByText('Consulter mes e-mails')
    fireEvent.press(checkEmailsButton)

    await waitForExpect(() => {
      expect(openInbox).toHaveBeenCalled()
    })
  })
})

const TestStack = createStackNavigator<{
  Home: undefined
  ResetPasswordEmailSent: { email: string }
}>()
function renderPage() {
  return render(
    <NavigationContainer>
      <TestStack.Navigator initialRouteName="Home">
        <TestStack.Screen
          name="ResetPasswordEmailSent"
          component={ResetPasswordEmailSent}
          initialParams={{ email: 'john.doe@gmail.com' }}
        />
      </TestStack.Navigator>
    </NavigationContainer>
  )
}
