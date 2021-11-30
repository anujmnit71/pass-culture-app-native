import React, { useEffect } from 'react'

import { REDIRECT_URL_UBBLE, useIdentificationUrl } from 'features/identityCheck/api'
import { useIdentityCheckNavigation } from 'features/identityCheck/useIdentityCheckNavigation'
import { analytics } from 'libs/analytics'
import { Helmet } from 'libs/react-helmet/Helmet'
import { LoadingPage } from 'ui/components/LoadingPage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Ubble: any

const ubbleIframeId = 'ubble-container'

interface CompleteEvent {
  status: 'processing'
  redirectUrl: string
}
interface AbortEvent {
  status: 'aborted'
  returnReason: string
  redirectUrl: string
}

// https://ubbleai.github.io/developer-documentation/#webview-integration
export const IdentityCheckWebview: React.FC = () => {
  const identificationUrl = useIdentificationUrl()
  const { navigateToNextScreen } = useIdentityCheckNavigation()

  useEffect(() => {
    if (!identificationUrl) return
    window.onUbbleReady = () => {
      const ubbleIDV = new Ubble.IDV(document.getElementById(ubbleIframeId), {
        width: '100%',
        height: '100%',
        allowCamera: true,
        identificationUrl,
        events: {
          onComplete({ redirectUrl, status }: CompleteEvent) {
            analytics.logIdentityCheckComplete({ status })
            ubbleIDV.destroy()
            if (redirectUrl.includes(REDIRECT_URL_UBBLE)) navigateToNextScreen()
          },
          onAbort({ redirectUrl, status, returnReason }: AbortEvent) {
            analytics.logIdentityCheckAbort({ status, returnReason })
            ubbleIDV.destroy()
            // TODO(antoinewg): navigate to an error page.
            if (redirectUrl.includes(REDIRECT_URL_UBBLE)) navigateToNextScreen()
          },
        },
      })
    }
  }, [identificationUrl])

  if (!identificationUrl) {
    return <LoadingPage />
  }

  return (
    <React.Fragment>
      <Helmet>
        <script
          src="https://oos.eu-west-2.outscale.com/public-ubble-ai/iframe-sdk-0.0.1.js"
          type="application/javascript"
        />
      </Helmet>
      <div id={ubbleIframeId} style={style} />
    </React.Fragment>
  )
}

const style = { flex: 1 }
