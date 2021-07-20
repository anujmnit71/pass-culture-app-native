import * as React from 'react'
import Svg, { Defs, LinearGradient, Stop, Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { BicolorIconInterface } from './types'

export const Everywhere: React.FunctionComponent<BicolorIconInterface> = ({
  size = 32,
  color = ColorsEnum.PRIMARY,
  color2 = ColorsEnum.SECONDARY,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID}>
    <Defs>
      <LinearGradient id="rb3uzw8rsa" x1="28.841%" x2="71.159%" y1="0%" y2="100%">
        <Stop offset="0%" stopColor={color} />
        <Stop offset="100%" stopColor={color2} />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <G fill="url(#rb3uzw8rsa)" transform="translate(-21 -320)">
        <G>
          <Path
            d="M24.1 9.25c1.063.001 2.105.29 3.014.836 2.297 1.371 2.995 4.349 1.923 7.126l-1.29 2.708c3.477 1.614 5.722 5.12 5.693 8.988.004 1.831-.497 3.628-1.45 5.192-.215.354-.676.466-1.03.25-.354-.215-.466-.676-.25-1.03.098-.162.19-.326.277-.493-.009-.021-.015-.043-.02-.066-.229-1.04-.86-2.198-1.77-3.382-.424-.55-.88-1.069-1.334-1.539l-.312-.314c-.121-.12-.217-.21-.283-.268-.308-.277-.333-.752-.056-1.06.277-.308.752-.333 1.06-.056l.19.179c.145.138.306.297.478.476.492.508.984 1.069 1.445 1.667.556.723 1.024 1.444 1.382 2.157.116-.56.174-1.136.173-1.717.024-3.289-1.884-6.265-4.839-7.63l-1.854 3.892c-.188.477-.649.79-1.162.79-.513 0-.974-.313-1.124-.707l-2.206-4.056c-2.102.916-3.698 2.64-4.477 4.727 1.31.89 2.47 1.99 3.456 3.284.606.91.716 1.69.548 2.593l-.013.061.82-.052c1.603-.09 2.566.171 3.115 1.295.206.422.35.928.504 1.675l.196 1.017c.085.446.15.732.213.935l.047.137.035.017c.089.053.166.123.227.206 1.305-.266 2.53-.86 3.556-1.738.315-.27.789-.232 1.058.082.27.315.232.789-.082 1.058-1.705 1.458-3.875 2.26-6.131 2.26-5.263-.093-9.484-4.342-9.576-9.559l-.001-.275c-.007-.923.114-1.824.35-2.684-.004-.142.032-.287.112-.417l.023-.031c.846-2.593 2.75-4.761 5.301-5.914l-1.32-2.426c-.706-1.727-.565-3.684.382-5.291.948-1.607 2.592-2.68 4.532-2.903zm-8.234 18.215l-.015.082c-.07.448-.105.906-.101 1.37-.046 4.481 3.49 8.168 7.937 8.329-.047-.166-.091-.356-.137-.574l-.312-1.596c-.129-.626-.246-1.038-.382-1.317-.18-.369-.576-.497-1.482-.465l-1.197.071c-.093.004-.176.005-.267.005-.602 0-1.056-.203-1.204-.76-.05-.19-.045-.363-.01-.57l.025-.124.057-.251c.14-.624.1-1.042-.264-1.59-.757-.991-1.648-1.87-2.648-2.61zm7.852-16.72c-1.387.163-2.618.966-3.327 2.17-.71 1.203-.816 2.668-.322 3.886l3.999 7.355 3.592-7.535c.779-2.023.327-4.136-1.153-5.144l-.163-.104c-.678-.407-1.454-.622-2.245-.623zm.122 1.505c.414 0 .75.336.75.75 0 .38-.282.693-.648.743l-.102.007c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25c.647 0 1.18-.492 1.244-1.122L25.09 15c0-.414.336-.75.75-.75s.75.336.75.75c0 1.519-1.231 2.75-2.75 2.75s-2.75-1.231-2.75-2.75 1.231-2.75 2.75-2.75z"
            transform="translate(21 320)"
          />
        </G>
      </G>
    </G>
  </Svg>
)
