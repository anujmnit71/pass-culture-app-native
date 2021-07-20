import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const Bell: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" testID={testID}>
    <G fill="none" fillRule="evenodd">
      <G fill={color}>
        <G>
          <Path
            d="M15.979 6.667c.887 0 1.605.718 1.605 1.605 0 .033-.003.065-.01.096 2.467.627 4.322 2.81 4.439 5.453l.08 3.188c.013 1.03.257 1.9.573 1.9.898 0 1.71.582 1.909 1.436.27 1.166-.565 2.253-1.715 2.322l-.115.004-4.443-.001c.006.066.008.133.008.2 0 1.288-1.043 2.332-2.33 2.332-1.288 0-2.332-1.044-2.332-2.332 0-.071.015-.14.043-.2H9.215c-1.215 0-2.118-1.13-1.827-2.34.194-.806.933-1.368 1.771-1.418l.12-.003h.144c.372 0 .572-.72.575-1.765L9.997 17l-.074-2.818c-.004-.237.007-.474.03-.71.045-.42.133-.83.263-1.225.087-.263.37-.405.632-.32.262.087.405.37.318.632-.08.246-.142.5-.183.758l-.034.258c-.014.131-.022.263-.026.393v.193l.073 2.818c.009.588-.023 1.084-.146 1.567-.033.129-.072.25-.117.364l5.247-.001c.276 0 .5.224.5.5 0 .253-.188.462-.433.495l-.067.005H9.293l-.012-.001H9.28c-.442 0-.829.279-.92.656-.131.549.243 1.054.77 1.103l.085.004h13.53c.567 0 .99-.525.856-1.1-.082-.353-.428-.622-.84-.658l-.095-.004c-.073 0-.142-.006-.209-.016l-.058.011-.068.005h-1.863c-.276 0-.5-.224-.5-.5 0-.253.188-.463.432-.496l.068-.004h.937c-.043-.107-.081-.221-.115-.342-.112-.4-.17-.843-.19-1.279l-.082-3.274c-.04-2.652-2.18-4.78-4.812-4.826h-.162l-.295.005c-1.11.016-2.156.4-3 1.083-.215.173-.53.14-.704-.075-.173-.215-.14-.53.075-.703.666-.538 1.436-.922 2.263-1.13-.006-.03-.009-.063-.009-.096 0-.887.718-1.605 1.605-1.605zm1.316 16.003h-2.689c.027.06.042.129.042.2 0 .736.596 1.332 1.332 1.332.735 0 1.33-.596 1.33-1.332 0-.067-.005-.134-.015-.2zM15.979 7.667c-.31 0-.566.233-.6.534.038.005.079.002.12 0l.234-.008.295-.005c.186-.003.37.003.551.017l.005.067c0-.335-.27-.605-.605-.605z"
            transform="translate(-22 -318) translate(22 318)"
          />
        </G>
      </G>
    </G>
  </Svg>
)
