import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export function ProfileDeletion({ size = 32, color = ColorsEnum.BLACK, testID }: IconInterface) {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 32 32" testID={testID}>
      <G fill="none" fillRule="evenodd">
        <G fill={color}>
          <G>
            <Path
              d="M20.233 15.5c2.67 0 4.834 2.164 4.834 4.833 0 2.67-2.164 4.834-4.834 4.834-2.669 0-4.833-2.164-4.833-4.834 0-2.669 2.164-4.833 4.833-4.833zm0 1c-2.117 0-3.833 1.716-3.833 3.833s1.716 3.834 3.833 3.834 3.834-1.717 3.834-3.834S22.35 16.5 20.233 16.5zm-2.076 1.24c.144 0 .282.058.383.16l1.693 1.693 1.694-1.693c.211-.212.555-.212.766 0 .212.212.212.555 0 .767L21 20.333 22.693 22c.103.101.16.24.16.383 0 .144-.057.282-.16.384-.1.102-.237.16-.38.16-.145 0-.284-.058-.386-.16L20.233 21.1l-1.693 1.693c-.1.102-.237.16-.38.16-.145 0-.284-.057-.387-.16-.205-.214-.205-.552 0-.766l1.694-1.694-1.694-1.666c-.205-.214-.205-.553 0-.767.102-.102.24-.16.384-.16zm-2.718-2.16c.231.15.298.46.147.692-.15.232-.46.298-.691.148-.748-.485-1.604-.74-2.469-.759-.032.009-.065.012-.099.012-2.25.002-4.175 1.587-4.625 3.77l.124.13c1.54 1.575 3.796 2.238 5.95 1.735l.201-.05c.267-.072.541.086.613.352.071.267-.087.541-.354.613-.576.155-1.16.236-1.74.249-.053.018-.11.028-.17.028-2.132-.004-4.154-.944-5.53-2.571-.023-.026-.042-.052-.06-.08l.048.066c-.028-.034-.052-.07-.07-.109l-.015-.035c-.01-.028-.019-.058-.024-.088-.003-.014-.005-.028-.006-.043l-.002-.034v-.013-.026l.005-.049c.293-1.92 1.54-3.56 3.311-4.356 1.772-.795 3.826-.638 5.456.418zm-3.112-8.747c1.679 0 3.04 1.361 3.04 3.04v1.407c0 1.679-1.361 3.04-3.04 3.04-1.68 0-3.04-1.361-3.04-3.04V9.873c0-1.679 1.36-3.04 3.04-3.04zm0 1c-1.127 0-2.04.914-2.04 2.04v1.407c0 1.127.913 2.04 2.04 2.04 1.126 0 2.04-.913 2.04-2.04V9.873c0-1.126-.914-2.04-2.04-2.04z"
              transform="translate(-22 -226) translate(22 226)"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}
