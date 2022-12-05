import React from 'react'

import * as NavigationHelpers from 'features/navigation/helpers/openUrl'
import { AgeSelection } from 'features/onboarding/pages/AgeSelection'
import { env } from 'libs/environment/__mocks__/envFixtures'
import { fireEvent, render } from 'tests/utils'

const openUrl = jest.spyOn(NavigationHelpers, 'openUrl')

describe('AgeSelection', () => {
  it('should render correctly', () => {
    const renderAPI = render(<AgeSelection />)
    expect(renderAPI).toMatchSnapshot()
  })

  it('should navigate to FAQ when pressing "Je suis un parent"', () => {
    const { getByTestId } = render(<AgeSelection />)
    const button = getByTestId('Je suis un parent')

    fireEvent.press(button)
    expect(openUrl).toHaveBeenCalledWith(env.FAQ_LINK_LEGAL_GUARDIAN, undefined)
  })
})
