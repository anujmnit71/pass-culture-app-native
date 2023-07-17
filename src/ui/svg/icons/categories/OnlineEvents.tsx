import * as React from 'react'
import { Path, G, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { svgIdentifier } from 'ui/svg/utils'

import { AccessibleIcon } from '../types'

export const OnlineEvents: React.FunctionComponent<AccessibleIcon> = ({
  accessibilityLabel,
  testID,
}) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()
  const { id: gradientId1, fill: gradientFill1 } = svgIdentifier()
  const { id: gradientId2, fill: gradientFill2 } = svgIdentifier()
  const { id: gradientId3, fill: gradientFill3 } = svgIdentifier()
  const { id: gradientId4, fill: gradientFill4 } = svgIdentifier()
  const { id: clipPathId, fill: clipPath } = svgIdentifier()

  return (
    <AccessibleSvg
      width={156}
      height={92}
      viewBox="0 0 156 92"
      fill="none"
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <G clipPath={clipPath}>
        <G>
          <Path
            d="M52.2304 16.6726L51.4056 16.004C50.932 15.6157 50.2205 15.7244 49.8793 16.2359C49.8793 16.2359 48.2193 17.5275 45.5388 19.7491C45.8306 20.0491 46.0588 20.4174 46.1642 20.8525C46.4767 22.1429 45.6744 23.4438 44.3714 23.7593C43.3917 23.9966 42.4105 23.6094 41.8484 22.856C27.8695 34.8505 0.84778 60.2541 4.365 74.7784L5.6016 79.885C6.13693 82.0956 8.37846 83.4484 10.6106 82.9078L60.233 70.8913C63.0206 70.2162 64.7405 67.4277 64.0719 64.6668L52.5828 17.2226C52.5308 17.0076 52.408 16.8096 52.2304 16.6726Z"
            fill="#E5FFEF"
          />
        </G>
        <Path
          d="M50.1473 15.0011L-3.38888 27.9655C-5.06047 28.3702 -6.09314 30.0446 -5.69225 31.7001L5.57157 78.214C6.1069 80.4247 8.34844 81.7774 10.5806 81.2369L58.5617 69.6178C61.6321 68.8742 63.5209 65.8118 62.7845 62.7709L51.3996 15.7568C51.2651 15.2017 50.7028 14.8666 50.1473 15.0011ZM4.2409 33.1123C2.93797 33.4278 1.62936 32.638 1.31688 31.3477C1.0044 30.0573 1.80674 28.7564 3.10967 28.4409C4.4126 28.1253 5.7212 28.9151 6.03368 30.2054C6.34616 31.4958 5.54382 32.7967 4.2409 33.1123ZM17.0985 29.9987C15.7955 30.3142 14.4869 29.5245 14.1745 28.2341C13.862 26.9437 14.6643 25.6428 15.9672 25.3273C17.2702 25.0117 18.5788 25.8015 18.8913 27.0918C19.2037 28.3822 18.4014 29.6831 17.0985 29.9987ZM30.3601 26.7872C29.0571 27.1027 27.7485 26.313 27.436 25.0226C27.1236 23.7323 27.9259 22.4313 29.2288 22.1158C30.5318 21.8003 31.8404 22.59 32.1528 23.8804C32.4704 25.1696 31.663 26.4717 30.3601 26.7872ZM44.6418 23.3288C43.3388 23.6443 42.0302 22.8546 41.7178 21.5642C41.4053 20.2738 42.2076 18.9729 43.5105 18.6574C44.8135 18.3419 46.1221 19.1316 46.4346 20.422C46.7521 21.7111 45.9447 23.0133 44.6418 23.3288Z"
          fill="#94F0D6"
        />
        <Path
          d="M50.8837 15.1953L-3.65743 28.403C-5.32902 28.8077 -6.3617 30.4821 -5.9608 32.1376L5.16252 78.0714C5.77416 80.5971 8.36673 82.119 10.9037 81.4464C21.6415 78.5867 47.7071 71.2898 52.6541 66.6608C61.8048 58.0858 50.8837 15.1953 50.8837 15.1953ZM3.96729 33.551C2.66436 33.8665 1.35576 33.0768 1.04328 31.7864C0.730798 30.496 1.53314 29.1951 2.83607 28.8796C4.13899 28.5641 5.4476 29.3538 5.76008 30.6442C6.07761 31.9333 5.27527 33.2342 3.96729 33.551ZM16.8299 30.4362C15.527 30.7517 14.2184 29.962 13.9059 28.6716C13.5934 27.3812 14.3958 26.0803 15.6987 25.7648C17.0016 25.4492 18.3102 26.239 18.6227 27.5293C18.9352 28.8197 18.1328 30.1206 16.8299 30.4362ZM30.0915 27.2247C28.7886 27.5402 27.48 26.7505 27.1675 25.4601C26.855 24.1698 27.6574 22.8688 28.9603 22.5533C30.2632 22.2378 31.5718 23.0275 31.8843 24.3179C32.1968 25.6083 31.3944 26.9092 30.0915 27.2247ZM44.3732 23.7663C43.0703 24.0818 41.7617 23.2921 41.4492 22.0017C41.1367 20.7113 41.9391 19.4104 43.242 19.0949C44.5449 18.7794 45.8535 19.5691 46.166 20.8595C46.4785 22.1498 45.6761 23.4508 44.3732 23.7663Z"
          fill={gradientFill}
        />
        <Path
          d="M53.1423 66.1356C51.8727 67.6926 47.8357 69.5227 47.8357 69.5227C49.1488 67.7698 49.1334 65.7192 48.847 64.2054C48.5567 62.6978 49.0957 61.1483 50.3192 60.1955C51.9196 58.9449 54.1535 57.4402 56.118 56.9645C56.113 56.9657 55.7728 63.0895 53.1423 66.1356Z"
          fill="#FEFEFE"
        />
        <Path
          d="M33.357 47.9756L24.468 45.3999C23.3187 45.0693 22.2306 46.0953 22.5103 47.2506L24.6723 56.1783C24.9521 57.3336 26.389 57.7481 27.2597 56.9284L33.9868 50.5764C34.8564 49.7516 34.5063 48.3062 33.357 47.9756Z"
          fill="#94F0D6"
        />
        <Path
          d="M47.6559 14.5378L-2.97651 26.799C-5.20866 27.3395 -6.58301 29.5679 -6.04767 31.7785L-4.3581 38.7556L54.3545 24.5378L52.6649 17.5607C52.1296 15.35 49.888 13.9973 47.6559 14.5378ZM3.96642 33.547C2.66349 33.8625 1.35488 33.0728 1.0424 31.7824C0.729922 30.492 1.53226 29.1911 2.83519 28.8756C4.13812 28.5601 5.44672 29.3498 5.7592 30.6402C6.07673 31.9294 5.27439 33.2303 3.96642 33.547ZM16.829 30.4322C15.5261 30.7477 14.2175 29.958 13.905 28.6676C13.5925 27.3772 14.3949 26.0763 15.6978 25.7608C17.0007 25.4453 18.3094 26.235 18.6218 27.5254C18.9343 28.8158 18.132 30.1167 16.829 30.4322ZM30.0906 27.2208C28.7877 27.5363 27.4791 26.7466 27.1666 25.4562C26.8541 24.1658 27.6565 22.8649 28.9594 22.5494C30.2623 22.2338 31.5709 23.0236 31.8834 24.3139C32.1959 25.6043 31.3936 26.9052 30.0906 27.2208ZM44.3723 23.7623C43.0694 24.0778 41.7608 23.2881 41.4483 21.9977C41.1358 20.7073 41.9382 19.4064 43.2411 19.0909C44.544 18.7754 45.8526 19.5651 46.1651 20.8555C46.4776 22.1459 45.6753 23.4468 44.3723 23.7623Z"
          fill="#94F0D6"
        />
        <G>
          <Path
            d="M1.65922 22.9132C0.634049 23.1615 0.00062316 24.1885 0.246489 25.2038L1.61389 30.8505C1.85976 31.8658 2.89287 32.4893 3.91804 32.241C4.94321 31.9928 5.57664 30.9657 5.33077 29.9504L3.96337 24.3038C3.7175 23.2884 2.68944 22.6638 1.65922 22.9132Z"
            fill={gradientFill1}
          />
        </G>
        <G>
          <Path
            d="M14.5215 19.798C13.4964 20.0463 12.8629 21.0733 13.1088 22.0886L14.4762 27.7353C14.7221 28.7506 15.7552 29.3741 16.7803 29.1258C17.8055 28.8775 18.4389 27.8505 18.1931 26.8352L16.8257 21.1885C16.5798 20.1732 15.5467 19.5498 14.5215 19.798Z"
            fill={gradientFill2}
          />
        </G>
        <G>
          <Path
            d="M27.6514 16.6203C26.6262 16.8685 25.9928 17.8956 26.2387 18.9109L27.6061 24.5576C27.8519 25.5729 28.8851 26.1963 29.9102 25.9481C30.9354 25.6998 31.5688 24.6728 31.323 23.6575L29.9556 18.0108C29.7097 16.9955 28.6766 16.372 27.6514 16.6203Z"
            fill={gradientFill3}
          />
        </G>
        <G>
          <Path
            d="M42.125 13.1164C41.0999 13.3646 40.4664 14.3917 40.7123 15.407L42.0797 21.0536C42.3256 22.0689 43.3587 22.6924 44.3839 22.4442C45.409 22.1959 46.0425 21.1689 45.7966 20.1536L44.4292 14.5069C44.1833 13.4916 43.1553 12.8669 42.125 13.1164Z"
            fill={gradientFill4}
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id={gradientId}
          x1={55.5005}
          y1={67.501}
          x2={18.4128}
          y2={19.6802}
          gradientUnits="userSpaceOnUse">
          <Stop offset={0.109674} stopColor="#D2FFE4" />
          <Stop offset={0.698378} stopColor="white" />
        </LinearGradient>
        <LinearGradient
          id={gradientId1}
          x1={1.05598}
          y1={29.4518}
          x2={8.88656}
          y2={20.8375}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E5FFEF" />
          <Stop offset={0.9209} stopColor="white" />
        </LinearGradient>
        <LinearGradient
          id={gradientId2}
          x1={13.9166}
          y1={26.3369}
          x2={17.1372}
          y2={22.794}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E5FFEF" />
          <Stop offset={0.9209} stopColor="white" />
        </LinearGradient>
        <LinearGradient
          id={gradientId3}
          x1={27.0444}
          y1={23.1597}
          x2={30.2649}
          y2={19.6168}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E5FFEF" />
          <Stop offset={0.9209} stopColor="white" />
        </LinearGradient>
        <LinearGradient
          id={gradientId4}
          x1={41.5214}
          y1={19.655}
          x2={44.7419}
          y2={16.1121}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E5FFEF" />
          <Stop offset={0.9209} stopColor="white" />
        </LinearGradient>
        <ClipPath id={clipPathId}>
          <Rect width={156} height={92} fill="white" />
        </ClipPath>
      </Defs>
    </AccessibleSvg>
  )
}
