import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme/colors'
import { STANDARD_ICON_SIZE } from 'ui/theme/constants'

import { IconInterface } from './types'

export const NoOffer = ({
  color = ColorsEnum.GREY_MEDIUM,
  size = STANDARD_ICON_SIZE,
  testID,
}: IconInterface) => {
  return (
    <Svg width={size} height={size} testID={testID} viewBox="0 0 156 156" aria-hidden>
      <G fill="none" fillRule="evenodd">
        <G fill={color}>
          <Path
            d="M76.83 46.313c1.346 0 2.438 1.09 2.438 2.437 0 1.234-.918 2.254-2.107 2.415l-.331.023-13.584-.008c-2.386.192-4.21 2.156-4.268 4.639l.01.471-.006 56.584c-.162 2.389 1.512 4.482 3.66 4.883l.408.055 38.804.008c2.386-.192 4.21-2.156 4.268-4.639l-.01-.471V88.465c0-1.346 1.092-2.438 2.438-2.438 1.234 0 2.254.918 2.415 2.107l.022.331-.005 24.08c.339 5.014-3.27 9.393-8.36 10.081l-.572.061-39.196-.007c-5.009-.404-8.808-4.618-8.763-9.433l.021-.537.006-56.256c-.339-5.013 3.27-9.392 8.36-10.08l.572-.062h13.78zM49.844 51.72c.306 1.196-.33 2.411-1.442 2.863l-.315.103-6.66 1.705c-2.182.625-3.537 2.76-3.223 4.989l.085.446 12.838 56.388c.299 1.313-.523 2.619-1.836 2.918-1.203.274-2.401-.394-2.823-1.518l-.095-.318-12.83-56.356c-1.137-4.704 1.486-9.467 6.05-11.076l.557-.178 6.728-1.722c1.304-.334 2.632.452 2.966 1.756zm56.074-14.637c5.171 0 10.131 2.054 13.788 5.71 3.657 3.658 5.712 8.618 5.712 13.79 0 10.77-8.73 19.5-19.5 19.5s-19.5-8.73-19.5-19.5 8.73-19.5 19.5-19.5zM98.312 45.5c-.951-.95-2.493-.95-3.444 0-.465.453-.727 1.074-.727 1.722 0 .65.262 1.27.727 1.723l7.605 7.638-7.605 7.605c-.465.452-.727 1.073-.727 1.722s.262 1.27.727 1.722c.447.47 1.073.73 1.722.715.647.004 1.268-.254 1.722-.715l7.606-7.605 7.637 7.605c.448.47 1.073.73 1.722.715.647.004 1.268-.254 1.723-.715.95-.951.95-2.493 0-3.445l-7.638-7.604L117 48.945c.895-.96.869-2.457-.06-3.385-.928-.929-2.425-.955-3.385-.06l-7.638 7.638z"
            transform="translate(-109 -181) translate(109 181)"
          />
        </G>
      </G>
    </Svg>
  )
}
