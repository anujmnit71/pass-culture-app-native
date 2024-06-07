import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { ApiError } from 'api/ApiError'
import { usePhoneValidationRemainingAttempts } from 'features/identityCheck/api/usePhoneValidationRemainingAttempts'
import {
  CodeNotReceivedModal,
  CodeNotReceivedModalProps,
} from 'features/identityCheck/pages/phoneValidation/CodeNotReceivedModal'
import { analytics } from 'libs/analytics'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, fireEvent, render, screen, waitFor } from 'tests/utils'
import { SNACK_BAR_TIME_OUT } from 'ui/components/snackBar/SnackBarContext'
import { SnackBarHelperSettings } from 'ui/components/snackBar/types'

jest.mock('libs/jwt')

const mockShowErrorSnackBar = jest.fn()
jest.mock('ui/components/snackBar/SnackBarContext', () => ({
  useSnackBarContext: () => ({
    showErrorSnackBar: jest.fn((props: SnackBarHelperSettings) => mockShowErrorSnackBar(props)),
  }),
}))

jest.mock('features/identityCheck/api/usePhoneValidationRemainingAttempts', () => {
  return {
    usePhoneValidationRemainingAttempts: jest.fn().mockReturnValue({
      remainingAttempts: 5,
      counterResetDatetime: 'time',
      isLastAttempt: false,
    }),
  }
})
const mockDispatch = jest.fn()
jest.mock('features/identityCheck/context/SubscriptionContextProvider', () => ({
  useSubscriptionContext: () => ({
    dispatch: mockDispatch,
    phoneValidation: {
      phoneNumber: '0612345678',
      country: { callingCode: '33', countryCode: 'FR' },
    },
  }),
}))

const mockedUsePhoneValidationRemainingAttempts = jest.mocked(usePhoneValidationRemainingAttempts)

describe('<CodeNotReceivedModal />', () => {
  const mockFetch = jest.spyOn(global, 'fetch')

  it('should match snapshot', () => {
    renderCodeNotReceivedModal()

    expect(screen).toMatchSnapshot()
  })

  it('should have a different color if one attempt remaining', () => {
    mockedUsePhoneValidationRemainingAttempts.mockReturnValueOnce({
      remainingAttempts: 1,
      counterResetDatetime: 'time',
      isLastAttempt: true,
    })
    renderCodeNotReceivedModal()

    expect(screen).toMatchSnapshot()
  })

  it('should call dismissModal upon pressing on Close', () => {
    const dismissModalMock = jest.fn()
    renderCodeNotReceivedModal({ dismissModal: dismissModalMock })

    const closeButton = screen.getByTestId('Fermer la modale')
    fireEvent.press(closeButton)

    expect(dismissModalMock).toHaveBeenCalledTimes(1)
  })

  it('should dismiss modal on /send_phone_validation_code request success', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({}), {
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      })
    )
    const dismissModalMock = jest.fn()
    renderCodeNotReceivedModal({ dismissModal: dismissModalMock })

    const requestNewCodeButton = screen.getByTestId('Demander un autre code')
    fireEvent.press(requestNewCodeButton)

    await waitFor(() => expect(dismissModalMock).toHaveBeenCalledTimes(1))
  })

  it('should dismiss modal if request fails', async () => {
    mockFetch.mockRejectedValueOnce(
      new ApiError(400, {
        code: 'SOME_CODE',
        message: 'some message',
      })
    )
    const dismissModalMock = jest.fn()
    renderCodeNotReceivedModal({ dismissModal: dismissModalMock })

    const requestNewCodeButton = screen.getByTestId('Demander un autre code')
    fireEvent.press(requestNewCodeButton)

    await waitFor(() => expect(dismissModalMock).toHaveBeenCalledTimes(1))
  })

  it('should show toaster with error message if request fails', async () => {
    mockFetch.mockRejectedValueOnce(
      new ApiError(400, {
        code: 'SOME_CODE',
        message: 'some message',
      })
    )
    renderCodeNotReceivedModal()

    const requestNewCodeButton = screen.getByTestId('Demander un autre code')
    fireEvent.press(requestNewCodeButton)

    await waitFor(() =>
      expect(mockShowErrorSnackBar).toHaveBeenCalledWith({
        message: 'some message',
        timeout: SNACK_BAR_TIME_OUT,
      })
    )
  })

  it('should navigate to SetPhoneNumberTooManySMSSent page if request fails with TOO_MANY_SMS_SENT code', async () => {
    mockFetch.mockRejectedValueOnce(
      new ApiError(400, {
        code: 'TOO_MANY_SMS_SENT',
        message: 'Le nombre de tentatives maximal est dépassé',
      })
    )
    renderCodeNotReceivedModal()

    const requestNewCodeButton = screen.getByTestId('Demander un autre code')
    fireEvent.press(requestNewCodeButton)

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('PhoneValidationTooManySMSSent'))
  })

  it('should log event when pressing "Demander un autre code" button', async () => {
    mockServer.postApi('/v1/send_phone_validation_code', { responseOptions: { statusCode: 200 } })

    renderCodeNotReceivedModal()

    const requestNewCodeButton = screen.getByTestId('Demander un autre code')
    await act(async () => {
      fireEvent.press(requestNewCodeButton)
    })

    expect(analytics.logHasRequestedCode).toHaveBeenCalledTimes(1)
  })
})

function renderCodeNotReceivedModal(props?: Partial<CodeNotReceivedModalProps>) {
  return render(<CodeNotReceivedModal isVisible dismissModal={jest.fn()} {...props} />, {
    wrapper: ({ children }) => reactQueryProviderHOC(children),
  })
}
