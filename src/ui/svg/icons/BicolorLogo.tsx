import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'

import { svgIdentifier } from 'ui/svg/utils'
import { ColorsEnum } from 'ui/theme/colors'
import { STANDARD_ICON_SIZE } from 'ui/theme/constants'

import { BicolorIconInterface } from './types'

const NotMemoizedBicolorLogo: React.FC<BicolorIconInterface> = ({
  size = STANDARD_ICON_SIZE,
  color,
  color2,
  thin = false,
  testID,
}) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()
  const primaryColor = color || ColorsEnum.PRIMARY
  const secondaryColor = color2 || color || ColorsEnum.SECONDARY
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" testID={testID} aria-hidden>
      <Defs>
        <LinearGradient id={gradientId} x1="-42.969%" x2="153.672%" y1="52.422%" y2="52.422%">
          <Stop offset="0%" stopColor={primaryColor} />
          <Stop offset="100%" stopColor={secondaryColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M13.5942 0.749349C13.5942 0.427183 13.3329 0.166016 13.0105 0.166016C12.6882 0.166016 12.4268 0.427183 12.4268 0.749349V2.51987C12.4268 2.84203 12.6882 3.1032 13.0105 3.1032C13.3329 3.1032 13.5942 2.84203 13.5942 2.51987V0.749349ZM13.5942 4.54664C13.5942 4.22447 13.3329 3.96331 13.0105 3.96331C12.6882 3.96331 12.4268 4.22447 12.4268 4.54664V8.34393C12.4268 8.6661 12.6882 8.92727 13.0105 8.92727C13.3329 8.92727 13.5942 8.6661 13.5942 8.34393V4.54664ZM8.55075 0.941734C8.85317 0.830207 9.1888 0.984815 9.30039 1.28706L11.8313 8.14199C11.9429 8.44424 11.7882 8.77966 11.4858 8.89119C11.1834 9.00272 10.8477 8.84811 10.7361 8.54587L8.20522 1.69094C8.09362 1.38869 8.24832 1.05326 8.55075 0.941734ZM5.47788 3.26013C5.26903 3.01473 4.90066 2.98501 4.65512 3.19374C4.40957 3.40248 4.37983 3.77062 4.58869 4.01602L6.61106 6.39224C6.81992 6.63764 7.18828 6.66737 7.43383 6.45863C7.67937 6.2499 7.70911 5.88175 7.50026 5.63635L5.47788 3.26013ZM8.18558 7.34032C8.43122 7.1317 8.79957 7.16158 9.00832 7.40707L9.80071 8.33892C10.0095 8.58441 9.97956 8.95254 9.73393 9.16117C9.48829 9.3698 9.11994 9.33992 8.91119 9.09443L8.1188 8.16258C7.91005 7.91709 7.93995 7.54895 8.18558 7.34032ZM2.52477 6.36918C2.24455 6.20993 1.88821 6.30787 1.72887 6.58793C1.56953 6.86798 1.66753 7.22411 1.94775 7.38335L8.01487 10.8312C8.29509 10.9904 8.65142 10.8925 8.81076 10.6125C8.9701 10.3324 8.87211 9.97627 8.59189 9.81703L2.52477 6.36918ZM0.183061 10.7708C0.238731 10.4535 0.541254 10.2414 0.858767 10.297L3.75041 10.8037C4.06792 10.8593 4.28018 11.1617 4.22451 11.479C4.16884 11.7963 3.86632 12.0085 3.54881 11.9528L0.657169 11.4462C0.339657 11.3905 0.127391 11.0882 0.183061 10.7708ZM5.1517 11.0425C4.83417 10.9869 4.5317 11.1991 4.47611 11.5165C4.42052 11.8338 4.63286 12.1361 4.95038 12.1916L8.17908 12.7566C8.49661 12.8121 8.79908 12.5999 8.85467 12.2826C8.91026 11.9652 8.69792 11.663 8.3804 11.6074L5.1517 11.0425ZM2.81137 14.7729C2.86655 15.0903 2.65381 15.3923 2.33621 15.4474L0.857867 15.7041C0.540268 15.7592 0.238076 15.5466 0.182903 15.2292C0.12773 14.9118 0.340468 14.6098 0.658067 14.5546L2.13641 14.298C2.45401 14.2428 2.7562 14.4555 2.81137 14.7729ZM6.95561 13.4594C6.96258 13.4581 6.96955 13.4571 6.9765 13.4561L8.18104 13.2495C8.49874 13.195 8.80051 13.4082 8.85505 13.7257C8.90959 14.0432 8.69624 14.3448 8.37853 14.3993L7.15447 14.6093L7.13628 14.6121L3.97435 15.162C3.65676 15.2173 3.35451 15.0047 3.29925 14.6873C3.24398 14.37 3.45663 14.0679 3.77422 14.0126L6.95561 13.4594ZM8.59189 16.1835C8.87211 16.0243 8.9701 15.6681 8.81076 15.3881C8.65142 15.108 8.29509 15.0101 8.01487 15.1693L1.94775 18.6172C1.66753 18.7764 1.56953 19.1326 1.72887 19.4126C1.88821 19.6927 2.24455 19.7906 2.52477 19.6314L8.59189 16.1835ZM9.73411 16.8395C9.9797 17.0482 10.0095 17.4163 9.8007 17.6617L5.46029 22.7636C5.25148 23.0091 4.88312 23.0389 4.63754 22.8302C4.39195 22.6215 4.36214 22.2534 4.57094 22.0079L8.91136 16.906C9.12017 16.6606 9.48853 16.6308 9.73411 16.8395ZM10.8851 20.4272C10.9968 20.125 10.8423 19.7895 10.5399 19.6778C10.2375 19.5662 9.90182 19.7206 9.79009 20.0228L8.20531 24.3094C8.09358 24.6116 8.24813 24.947 8.55051 25.0587C8.85288 25.1704 9.18858 25.0159 9.3003 24.7137L10.8851 20.4272ZM11.4925 17.1154C11.7947 17.2273 11.949 17.563 11.837 17.8651L11.565 18.5989C11.453 18.901 11.1172 19.0552 10.8149 18.9433C10.5126 18.8314 10.3584 18.4957 10.4704 18.1936L10.7424 17.4598C10.8544 17.1577 11.1902 17.0035 11.4925 17.1154ZM13.5942 17.6625C13.5942 17.3403 13.3329 17.0791 13.0105 17.0791C12.6882 17.0791 12.4268 17.3403 12.4268 17.6625V25.2512C12.4268 25.5734 12.6882 25.8345 13.0105 25.8345C13.3329 25.8345 13.5942 25.5734 13.5942 25.2512V17.6625ZM16.5462 22.5663C16.8488 22.4551 17.1842 22.61 17.2955 22.9124L17.81 24.3102C17.9213 24.6125 17.7662 24.9478 17.4637 25.059C17.1611 25.1702 16.8257 25.0153 16.7144 24.7129L16.1999 23.3152C16.0886 23.0128 16.2437 22.6775 16.5462 22.5663ZM15.2787 17.4603C15.1671 17.1581 14.8314 17.0036 14.529 17.1152C14.2266 17.2268 14.072 17.5623 14.1837 17.8645L15.4491 21.2891C15.5608 21.5913 15.8965 21.7458 16.1989 21.6342C16.5013 21.5226 16.6559 21.1871 16.5442 20.8849L15.2787 17.4603ZM16.2807 16.8397C16.5261 16.6309 16.8945 16.6604 17.1035 16.9057L21.4498 22.0076C21.6588 22.2529 21.6292 22.6211 21.3838 22.8299C21.1383 23.0388 20.77 23.0092 20.561 22.7639L16.2147 17.662C16.0057 17.4167 16.0353 17.0486 16.2807 16.8397ZM20.6258 16.6604C20.3457 16.501 19.9893 16.5989 19.8299 16.8789C19.6705 17.1589 19.7684 17.5151 20.0486 17.6744L23.4902 19.6313C23.7704 19.7906 24.1267 19.6927 24.2861 19.4127C24.4455 19.1327 24.3476 18.7766 24.0674 18.6172L20.6258 16.6604ZM17.2039 15.3888C17.3628 15.1085 17.719 15.0101 17.9995 15.169L18.9042 15.6815C19.1847 15.8403 19.2832 16.1963 19.1242 16.4766C18.9652 16.7569 18.609 16.8553 18.3286 16.6964L17.4239 16.1839C17.1434 16.0251 17.0449 15.6691 17.2039 15.3888ZM17.841 13.2497C17.5234 13.1945 17.2213 13.4072 17.1661 13.7246C17.1109 14.042 17.3237 14.344 17.6413 14.3991L25.1572 15.7037C25.4748 15.7588 25.777 15.5462 25.8321 15.2288C25.8873 14.9114 25.6745 14.6094 25.3569 14.5542L17.841 13.2497ZM25.8317 10.7694C25.8882 11.0866 25.6767 11.3895 25.3593 11.4459L24.3422 11.6267C24.0248 11.6832 23.7218 11.4718 23.6653 11.1546C23.6089 10.8374 23.8204 10.5345 24.1378 10.4781L25.1549 10.2973C25.4722 10.2408 25.7753 10.4522 25.8317 10.7694ZM22.3591 11.9704C22.6767 11.9152 22.8893 11.6131 22.834 11.2957C22.7787 10.9783 22.4764 10.7658 22.1588 10.8211L17.641 11.6073C17.3235 11.6626 17.1108 11.9647 17.1661 12.2821C17.2214 12.5995 17.5237 12.8119 17.8413 12.7567L22.3591 11.9704ZM24.2862 6.58792C24.4455 6.86797 24.3475 7.2241 24.0673 7.38335L21.6487 8.75783C21.3685 8.91708 21.0122 8.81915 20.8528 8.53909C20.6935 8.25904 20.7915 7.90291 21.0717 7.74366L23.4903 6.36918C23.7705 6.20993 24.1268 6.30786 24.2862 6.58792ZM20.0932 9.64325C20.3735 9.48416 20.4717 9.12808 20.3125 8.84794C20.1534 8.5678 19.7971 8.46967 19.5168 8.62876L17.4234 9.81687C17.1431 9.97597 17.0449 10.332 17.2041 10.6122C17.3633 10.8923 17.7196 10.9905 17.9999 10.8314L20.0932 9.64325ZM21.3838 3.17064C21.6292 3.37949 21.6588 3.74765 21.4498 3.99295L17.1035 9.09484C16.8945 9.34014 16.5261 9.36968 16.2807 9.16083C16.0353 8.95198 16.0057 8.58382 16.2147 8.33852L20.561 3.23664C20.77 2.99134 21.1383 2.96179 21.3838 3.17064ZM17.8097 1.69094C17.9213 1.38869 17.7666 1.05326 17.4642 0.941734C17.1618 0.830207 16.8261 0.984815 16.7146 1.28706L14.1836 8.14199C14.072 8.44423 14.2267 8.77966 14.5292 8.89119C14.8316 9.00272 15.1672 8.84811 15.2788 8.54587L17.8097 1.69094Z"
        fill={gradientFill}
        stroke={gradientFill}
        strokeWidth={thin ? 0 : 0.3}
      />
    </Svg>
  )
}

export const BicolorLogo = React.memo(NotMemoizedBicolorLogo)
