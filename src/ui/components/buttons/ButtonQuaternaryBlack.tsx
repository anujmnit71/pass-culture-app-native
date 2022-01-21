import React, { FunctionComponent } from 'react'

import { AppButton, BaseButtonProps } from 'ui/components/buttons/AppButton'
import { getSpacing } from 'ui/theme'
import { ColorsEnum } from 'ui/theme/colors'
export const ButtonQuaternaryBlack: FunctionComponent<BaseButtonProps> = (props) => {
  let textColor = ColorsEnum.BLACK
  const backgroundColor = ColorsEnum.TRANSPARENT
  const loadingIconColor = ColorsEnum.PRIMARY_DARK
  let iconColor = ColorsEnum.BLACK

  if (props.disabled) {
    textColor = iconColor = ColorsEnum.GREY_DARK
  }

  return (
    <AppButton
      {...props}
      loadingIconColor={loadingIconColor}
      backgroundColor={backgroundColor}
      iconColor={iconColor}
      textColor={textColor}
      iconSize={getSpacing(4)}
      inlineHeight={getSpacing(5)}
      textSize={getSpacing(3)}
    />
  )
}
