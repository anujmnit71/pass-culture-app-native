import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const Lock: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" testID={testID}>
    <G fill="none" fillRule="evenodd">
      <G fill={color}>
        <G>
          <Path
            d="M16.441 6.667c2.15 0 4.096 1.174 5.114 3.024.434.787.68 1.666.715 2.58l.005.229-.001 1.5h.168c.963 0 1.769.697 1.83 1.599l.003.11v8.25c0 .954-.832 1.708-1.833 1.708-.277 0-.5-.224-.5-.5 0-.253.188-.463.432-.496l.068-.004c.438 0 .784-.287.828-.633l.005-.075v-8.25c0-.355-.316-.665-.74-.705L22.441 15H10.5c-.439 0-.784.286-.828.633l-.005.075v8.25c0 .355.316.665.74.704l.093.005h8.6c.276 0 .5.224.5.5 0 .253-.188.462-.432.495l-.068.005h-8.6c-.963 0-1.769-.697-1.83-1.599l-.003-.11v-8.25c0-.918.768-1.65 1.718-1.705L10.5 14h.108v-1.5c0-3.222 2.612-5.833 5.833-5.833zm0 11.333c1.013 0 1.834.821 1.834 1.833 0 1.013-.821 1.834-1.834 1.834-1.012 0-1.833-.821-1.833-1.834 0-1.012.821-1.833 1.833-1.833zm0 1c-.46 0-.833.374-.833.833 0 .46.374.834.833.834.46 0 .834-.374.834-.834 0-.46-.374-.833-.834-.833zm0-11.333c-2.615 0-4.746 2.078-4.83 4.673l-.003.16V14h9.666v-1.5c0-.826-.206-1.621-.595-2.327-.844-1.534-2.455-2.506-4.238-2.506z"
            transform="translate(-24 -336) translate(24 336)"
          />
        </G>
      </G>
    </G>
  </Svg>
)
