import { useMutation, useQueryClient } from 'react-query'

import { api } from 'api/api'
import { UserProfileResponse, UserProfileUpdateRequest } from 'api/gen'
import { QueryKeys } from 'libs/queryKeys'

export enum CHANGE_EMAIL_ERROR_CODE {
  TOKEN_EXISTS = 'TOKEN_EXISTS',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_EMAIL = 'INVALID_EMAIL',
  EMAIL_UPDATE_ATTEMPTS_LIMIT = 'EMAIL_UPDATE_ATTEMPTS_LIMIT',
}

export interface ChangeEmailRequest {
  email: string
  password: string
}

export function useUpdateProfileMutation(
  onSuccessCallback: (data: UserProfileResponse) => void,
  onErrorCallback: (error: unknown) => void
) {
  const client = useQueryClient()
  return useMutation((body: UserProfileUpdateRequest) => api.postnativev1profile(body), {
    onSuccess(response: UserProfileResponse) {
      client.setQueryData(QueryKeys.USER_PROFILE, (old: UserProfileResponse | undefined) => ({
        ...(old || {}),
        ...response,
      }))
      onSuccessCallback(response)
    },
    onError: onErrorCallback,
  })
}
