import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme/colors'
import { STANDARD_ICON_SIZE } from 'ui/theme/constants'

import { IconInterface } from './types'

export function RequestSent({
  size = STANDARD_ICON_SIZE,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface) {
  return (
    <Svg width={size} height={size} viewBox="0 0 157 165" testID={testID} aria-hidden>
      <G fill="none" fillRule="evenodd">
        <G fill={color}>
          <Path
            d="M235.28 312.674l.275.237 28.912 28.911c.955.956.955 2.506 0 3.461-.87.869-2.229.948-3.187.237l-.274-.237-28.912-28.912c-.956-.955-.956-2.505 0-3.46.869-.87 2.228-.948 3.186-.237zm-29.91-56.4c16.52 0 29.917 13.393 29.917 29.913s-13.397 29.917-29.917 29.917c-16.52 0-29.914-13.396-29.914-29.917 0-16.52 13.393-29.914 29.914-29.914zM201.333 181c7.197 0 13.049 5.755 13.206 12.914l.003.295v51.289c0 1.563-1.267 2.83-2.83 2.83-1.508 0-2.74-1.178-2.826-2.664l-.005-.166v-51.29c0-4.09-3.253-7.42-7.313-7.544l-.235-.003h-78.308c-4.09 0-7.42 3.253-7.544 7.312l-.003.236v108.499c0 4.09 3.252 7.42 7.312 7.544l.235.003h51.92c3.71 0 3.773 5.468.192 5.656l-.192.005h-51.92c-7.196 0-13.048-5.755-13.205-12.913l-.003-.295v-108.5c0-7.196 5.755-13.048 12.913-13.205l.295-.003h78.308zm4.037 80.167c-13.818 0-25.02 11.202-25.02 25.02s11.203 25.022 25.02 25.022 25.022-11.205 25.022-25.022c0-13.817-11.204-25.02-25.022-25.02zm-6.123 9.52c.677 1.17.277 2.666-.893 3.343-4.307 2.492-7.017 7.09-7.017 12.157 0 1.351-1.095 2.447-2.447 2.447-1.351 0-2.447-1.096-2.447-2.447 0-6.833 3.656-13.035 9.46-16.393 1.17-.677 2.667-.277 3.344.892zm23.256-79.322c6.456.907 10.981 6.808 10.22 13.25l-.035.266-6.467 46.016c-.197 1.403-1.494 2.38-2.896 2.183-1.353-.19-2.31-1.403-2.2-2.747l.017-.15 6.467-46.016c.516-3.67-1.983-7.067-5.61-7.69-2.197-.383-3.18-1.435-2.946-3.157.234-1.723 1.384-2.375 3.45-1.955zm-63.597 51.66c1.564 0 2.83 1.267 2.83 2.83 0 1.508-1.178 2.74-2.663 2.826l-.167.005h-24.53c-1.563 0-2.83-1.267-2.83-2.83 0-1.508 1.178-2.74 2.664-2.826l.166-.005h24.53zm30.191-18.87c1.564 0 2.83 1.268 2.83 2.831 0 1.508-1.178 2.74-2.663 2.826l-.167.005h-54.72c-1.564 0-2.831-1.268-2.831-2.83 0-1.508 1.178-2.74 2.664-2.826l.166-.005h54.721zm0-18.869c1.564 0 2.83 1.268 2.83 2.83 0 1.508-1.178 2.74-2.663 2.826l-.167.005h-54.72c-1.564 0-2.831-1.267-2.831-2.83 0-1.508 1.178-2.74 2.664-2.826l.166-.005h54.721z"
            transform="translate(-109 -181)"
          />
        </G>
      </G>
    </Svg>
  )
}
