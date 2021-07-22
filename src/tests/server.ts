import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  BookingsResponse,
  CulturalSurveyRequest,
  OfferResponse,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  SendPhoneValidationRequest,
  SettingsResponse,
  SigninRequest,
  SigninResponse,
  UserProfileResponse,
  ValidateEmailRequest,
  ValidateEmailResponse,
  VenueResponse,
} from 'api/gen'
import { bookingsSnap } from 'features/bookings/api/bookingsSnap'
import { offerResponseSnap } from 'features/offer/api/snaps/offerResponseSnap'
import { venueResponseSnap } from 'features/venue/fixtures/venueResponseSnap'
import { env } from 'libs/environment'
import { EmptyResponse } from 'libs/fetch'

export const server = setupServer(
  rest.post<SigninRequest, SigninResponse>(
    env.API_BASE_URL + '/native/v1/signin',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ accessToken: 'access_token', refreshToken: 'refresh_token' })
      )
    }
  ),
  requestPasswordResetSuccess(),
  requestSettingsSuccess(),
  rest.post<ResetPasswordRequest, EmptyResponse>(
    env.API_BASE_URL + '/native/v1/reset_password',
    (req, res, ctx) => {
      return res(ctx.status(204))
    }
  ),
  rest.post<ResetPasswordRequest, EmptyResponse>(
    env.API_BASE_URL + '/native/v1/resend_email_validation',
    (req, res, ctx) => {
      return res(ctx.status(204))
    }
  ),
  rest.get<UserProfileResponse>(env.API_BASE_URL + '/native/v1/me', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        email: 'email@domain.ext',
        firstName: 'Jean',
        isBeneficiary: true,
      })
    )
  ),
  rest.get<OfferResponse>(
    env.API_BASE_URL + '/native/v1/offer/' + offerResponseSnap.id,
    (req, res, ctx) => res(ctx.status(200), ctx.json(offerResponseSnap))
  ),
  rest.get<VenueResponse>(
    env.API_BASE_URL + '/native/v1/venue/' + venueResponseSnap.id,
    (req, res, ctx) => res(ctx.status(200), ctx.json(venueResponseSnap))
  ),
  rest.post<CulturalSurveyRequest, EmptyResponse>(
    env.API_BASE_URL + '/native/v1/me/cultural_survey',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    }
  ),
  rest.get<BookingsResponse>(env.API_BASE_URL + '/native/v1/bookings', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bookingsSnap))
  }),
  rest.post<SendPhoneValidationRequest, EmptyResponse>(
    env.API_BASE_URL + '/native/v1/send_phone_validation_code',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    }
  ),
  rest.post<ValidateEmailRequest, ValidateEmailResponse>(
    env.API_BASE_URL + '/native/v1/validate_email',
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        })
      )
  )
)

export function requestPasswordResetSuccess() {
  return rest.post<RequestPasswordResetRequest, EmptyResponse>(
    env.API_BASE_URL + '/native/v1/request_password_reset',
    (req, res, ctx) => {
      return res(ctx.status(204))
    }
  )
}

export function requestPasswordResetFail() {
  return rest.post<RequestPasswordResetRequest, EmptyResponse>(
    env.API_BASE_URL + '/native/v1/request_password_reset',
    (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({}))
    }
  )
}

export function requestSettingsSuccess(
  settingsResponse: SettingsResponse = {
    depositAmount: 30000,
    isRecaptchaEnabled: true,
    allowIdCheckRegistration: true,
    autoActivateDigitalBookings: false,
    enableNativeIdCheckVersion: false,
    enableNativeIdCheckVerboseDebugging: false,
    enablePhoneValidation: false,
    enableIdCheckRetention: false,
    wholeFranceOpening: false,
    objectStorageUrl: 'http://localhost',
    displayDmsRedirection: true,
    idCheckAddressAutocompletion: false,
    useAppSearch: true,
  }
) {
  return rest.get<SettingsResponse>(env.API_BASE_URL + '/native/v1/settings', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(settingsResponse))
  })
}
