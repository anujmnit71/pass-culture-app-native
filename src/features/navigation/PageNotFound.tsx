import React from 'react'
import styled from 'styled-components/native'

import { navigateToHomeConfig } from 'features/navigation/helpers'
import { Helmet } from 'libs/react-helmet/Helmet'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { GenericInfoPage } from 'ui/components/GenericInfoPage'
import { TouchableLink } from 'ui/components/touchableLink/TouchableLink'
import { PageNotFound as PageNotFoundIcon } from 'ui/svg/icons/PageNotFound'
import { Typo } from 'ui/theme'

export const PageNotFound: React.FC = () => {
  const helmetTitle = 'Page introuvable | pass Culture'
  return (
    <React.Fragment>
      <Helmet>
        <title>{helmetTitle}</title>
      </Helmet>
      <GenericInfoPage
        title="Page introuvable&nbsp;!"
        icon={PageNotFoundIcon}
        buttons={[
          <TouchableLink
            key={1}
            as={ButtonPrimaryWhite}
            wording="Retourner à l’accueil"
            navigateTo={navigateToHomeConfig}
          />,
        ]}>
        <StyledBody>Il est possible que cette page soit désactivée ou n’existe pas.</StyledBody>
      </GenericInfoPage>
    </React.Fragment>
  )
}

const StyledBody = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.white,
  textAlign: 'center',
}))
