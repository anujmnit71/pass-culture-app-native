import * as React from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled, { useTheme } from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'
import { svgIdentifier } from 'ui/svg/utils'

const MicroSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  color2,
  accessibilityLabel,
  testID,
}) => {
  const {
    colors: { primary, secondary },
  } = useTheme()
  const { id: gradientId, fill: gradientFill } = svgIdentifier()

  return (
    <AccessibleSvg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      testID={testID}
      accessibilityLabel={accessibilityLabel}>
      <Defs>
        <LinearGradient id={gradientId} x1="20.085%" x2="79.915%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color ?? primary} />
          <Stop offset="100%" stopColor={color2 ?? color ?? secondary} />
        </LinearGradient>
      </Defs>
      <Path
        fill={gradientFill}
        clipRule="evenodd"
        fillRule="evenodd"
        d="M13.9078 4.87816C13.8288 5.43595 14.2209 5.95164 14.7835 6.02998C16.3819 6.25253 17.927 6.97705 19.1566 8.1975C19.0928 8.35885 19.0037 8.57369 18.8884 8.82963C18.6134 9.43975 18.1918 10.2764 17.609 11.1759C16.4326 12.9916 14.6603 14.9694 12.1992 15.9444C11.6716 16.1535 11.4148 16.7469 11.6257 17.27C11.8365 17.793 12.4352 18.0476 12.9628 17.8386C15.9852 16.6412 18.0502 14.2692 19.3402 12.2782C19.859 11.4777 20.2623 10.7235 20.5602 10.1052C21.4631 11.8426 21.6549 13.848 21.1367 15.7011C21.1337 15.7118 21.1309 15.7225 21.1283 15.7332C20.9454 15.8273 20.7728 15.9497 20.6167 16.1011L20.6135 16.1041L18.3811 18.2867L16.0797 20.5376L16.0778 20.5394C15.8322 20.778 15.6583 21.0599 15.5551 21.3597C14.1471 21.3754 12.3063 21.1921 10.6284 20.5201C8.7284 19.759 7.08063 18.3969 6.41308 15.9704C5.03489 10.9608 8.0631 7.94979 9.61126 6.87544C10.0767 6.55243 10.1899 5.9165 9.86411 5.45505C9.53827 4.99361 8.8968 4.88139 8.43132 5.2044C6.55021 6.50979 2.71986 10.298 4.42802 16.5071C5.30364 19.69 7.51381 21.4725 9.85757 22.4113C12.012 23.2742 14.3138 23.4451 15.9378 23.3914C16.0154 23.4826 16.1021 23.5685 16.1978 23.6479L26.8733 32.6406C27.3063 33.0053 27.9555 32.953 28.3234 32.5238C28.6914 32.0946 28.6386 31.4509 28.2056 31.0862L17.5193 22.0845C17.4947 22.0642 17.4902 22.0231 17.5182 21.996L17.5215 21.9928L19.8258 19.739L22.0551 17.5595L22.0559 17.5588C22.0666 17.5486 22.0754 17.544 22.0822 17.5416C22.0901 17.5387 22.0991 17.5372 22.1089 17.5377C22.1273 17.5387 22.145 17.5464 22.1608 17.5648L35.4619 33.5044C36.3441 34.5572 36.1826 35.5329 35.8355 35.8736L35.8266 35.8823C35.4768 36.2221 34.483 36.3715 33.4336 35.4834L33.4319 35.4819L31.2406 33.6359C30.8076 33.2712 30.1583 33.3235 29.7904 33.7527C29.4225 34.1819 29.4752 34.8255 29.9082 35.1903L32.0977 37.0348L32.0986 37.0355C33.3075 38.0581 35.0478 38.5367 36.4193 37.918L42.2432 43.7007C42.6446 44.0993 43.296 44.0998 43.6981 43.7019C44.1002 43.3039 44.1007 42.6581 43.6993 42.2595L37.8834 36.4848C38.5246 35.1314 38.0518 33.4036 37.0453 32.2019L37.0446 32.201L23.7438 16.2618L23.7414 16.259C23.591 16.0801 23.4176 15.9322 23.2292 15.8159C23.9513 12.686 23.1 9.26606 20.6604 6.80403L20.6592 6.80285C19.0965 5.23085 17.1177 4.29519 15.0697 4.01004C14.507 3.9317 13.9869 4.32037 13.9078 4.87816ZM22.822 22.6857C22.4193 23.0831 22.4177 23.7288 22.8186 24.1281L25.0099 26.3106C25.4107 26.7098 26.0621 26.7113 26.4648 26.314C26.8675 25.9166 26.869 25.2709 26.4682 24.8717L24.2769 22.6891C23.8761 22.2899 23.2247 22.2884 22.822 22.6857Z"
      />
    </AccessibleSvg>
  )
}

export const Micro = styled(MicroSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
