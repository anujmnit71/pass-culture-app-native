import React from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'
import { svgIdentifier } from 'ui/svg/utils'

const BicolorFranceSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  accessibilityLabel,
  color,
  color2,
  testID,
}) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()

  return (
    <AccessibleSvg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <Defs>
        <LinearGradient
          id={gradientId}
          x1="1.50854"
          y1="1.63963"
          x2="9.55715"
          y2="23.3906"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={color} />
          <Stop offset="1" stopColor={color2} />
        </LinearGradient>
      </Defs>
      <Path
        fill={gradientFill}
        clipRule="evenodd"
        fillRule="evenodd"
        d="M13.6213 1.76493C12.7438 1.54557 12.0805 1.65071 11.7764 1.80279C11.5615 1.91024 11.4578 2.1516 11.5158 2.3752C11.5144 2.3806 11.5131 2.38605 11.5119 2.39153C11.4383 2.72264 11.255 3.2755 10.9524 3.80986C10.6465 4.35003 10.2502 4.81591 9.77639 5.05279C8.72837 5.5768 7.57279 5.41388 7.15811 5.27566C6.89614 5.18833 6.61298 5.32991 6.52566 5.59189C6.43833 5.85386 6.57991 6.13702 6.84188 6.22434C7.42721 6.41945 8.87162 6.6232 10.2236 5.94721C10.9498 5.58409 11.4701 4.92497 11.8226 4.30264C12.1674 3.6937 12.3816 3.06691 12.4792 2.64751C12.4989 2.64572 12.5195 2.64417 12.5411 2.64293C12.7435 2.63132 13.0263 2.64697 13.3787 2.73507C13.561 2.78063 13.6517 2.83874 13.7156 2.89895C13.7903 2.96939 13.8606 3.07262 13.966 3.2683C13.9969 3.3257 14.0293 3.38809 14.0642 3.45533C14.2651 3.84251 14.5494 4.39033 15.1159 5.07009C15.5142 5.5481 16.1026 5.84632 16.6942 6.05058C17.2926 6.25717 17.9553 6.3875 18.5545 6.4921C18.7065 6.51863 18.853 6.54332 18.9935 6.567L18.9935 6.56701C19.4254 6.6398 19.8006 6.70304 20.1045 6.78077C20.3046 6.83197 20.4357 6.88068 20.5127 6.92333C20.5166 6.92552 20.5203 6.92759 20.5236 6.92955C20.5259 6.93092 20.5281 6.93223 20.5302 6.93349C20.6756 7.53601 20.7037 7.9764 20.6645 8.32021C20.625 8.66796 20.514 8.94146 20.3485 9.20518C20.1845 9.46654 19.9734 9.71048 19.7064 10.019L19.7064 10.019L19.6563 10.0769C19.3729 10.4047 19.0479 10.787 18.7318 11.2752C18.2882 11.9603 18.8401 12.75 19.559 12.75H19.7756L19.9146 15.3916C19.9325 15.7299 20.0421 16.0384 20.166 16.3052C20.2611 16.5098 20.3779 16.7162 20.482 16.9001L20.4823 16.9005C20.5108 16.9509 20.5383 16.9996 20.5642 17.046C20.8359 17.5339 20.9407 17.825 20.8702 18.0832C20.8304 18.2289 20.678 18.4915 20.2 18.85C19.7731 19.1702 19.3942 19.2904 19.043 19.3179C18.6793 19.3464 18.3155 19.2782 17.9067 19.1722C17.8121 19.1477 17.7133 19.1201 17.6109 19.0915L17.6106 19.0914C16.8912 18.8903 15.9907 18.6386 15.053 19.0404C14.5997 19.2347 14.2762 19.4159 14.0523 19.6131C13.8052 19.8308 13.6901 20.0586 13.6369 20.2978C13.6086 20.4253 13.5975 20.523 13.588 20.6078C13.5658 20.8037 13.5514 20.9314 13.35 21.2C12.9558 21.7255 12.4597 21.6562 12.2442 21.5624C12.2061 21.5458 12.1512 21.523 12.0852 21.505C11.1433 21.2472 8.91571 20.6115 7.15811 20.0257C6.77759 19.8988 6.5988 19.7558 6.51779 19.6515C6.44658 19.5599 6.42511 19.4664 6.43967 19.3502C6.47524 19.0662 6.72532 18.7028 7.02736 18.423C7.09795 18.3576 7.17243 18.2724 7.23098 18.1637C7.60404 17.4708 7.74999 16.6384 7.74999 14.25C7.74999 13.7749 7.7408 13.1326 7.6699 12.5358C7.63444 12.2373 7.58213 11.9372 7.50275 11.6682C7.42563 11.4068 7.31109 11.1327 7.12687 10.9214C6.58896 10.3044 5.82339 9.93475 5.13187 9.69903C4.51367 9.48831 3.9037 9.36878 3.4938 9.28845L3.4938 9.28845L3.49358 9.28841C3.44174 9.27825 3.3931 9.26872 3.34805 9.25971C2.92512 9.17512 2.67281 8.88476 2.56462 8.58183C2.50945 8.42735 2.50096 8.29266 2.51384 8.20803C2.5153 8.19839 2.51686 8.19016 2.5184 8.18321C2.53873 8.17734 2.56662 8.16988 2.60351 8.16119C2.69522 8.13959 2.81534 8.1165 2.96078 8.0926C3.25102 8.04489 3.6194 7.99756 4.01785 7.95317C4.81355 7.86453 5.70664 7.79008 6.28562 7.74873C6.56106 7.72905 6.7684 7.48982 6.74872 7.21438C6.72905 6.93893 6.48981 6.7316 6.21437 6.75127C5.62669 6.79325 4.71977 6.8688 3.90714 6.95932C3.50142 7.00452 3.11355 7.05407 2.79858 7.10584C2.64142 7.13167 2.4967 7.15898 2.37422 7.18783C2.2627 7.2141 2.13213 7.24992 2.02639 7.30278C1.69747 7.46725 1.56512 7.79537 1.52522 8.05759C1.48341 8.33233 1.52179 8.63514 1.62287 8.91817C1.82718 9.49023 2.32487 10.0749 3.15194 10.2403C3.20023 10.2499 3.25088 10.2599 3.30365 10.2703L3.30382 10.2703C3.71699 10.3515 4.25949 10.4582 4.80923 10.6456C5.43423 10.8586 6.00482 11.1562 6.37311 11.5786C6.42009 11.6325 6.48365 11.7479 6.54363 11.9512C6.60135 12.1468 6.64514 12.3866 6.67688 12.6538C6.74038 13.1883 6.74999 13.7808 6.74999 14.25C6.74999 16.6427 6.59122 17.2398 6.35374 17.6835C6.35251 17.6849 6.3506 17.6868 6.34784 17.6894C5.99353 18.0175 5.52765 18.5853 5.44742 19.2259C5.40408 19.5719 5.47475 19.939 5.72821 20.2652C5.97185 20.5787 6.35024 20.8105 6.84188 20.9743C8.62421 21.5684 10.8712 22.2095 11.8207 22.4694C11.8218 22.4697 11.8282 22.4719 11.8451 22.4793C12.3438 22.6963 13.3947 22.8071 14.15 21.8C14.5321 21.2905 14.5774 20.8398 14.5996 20.62C14.6041 20.5745 14.6077 20.5389 14.6131 20.5147C14.6224 20.4727 14.6323 20.4349 14.7133 20.3635C14.8176 20.2716 15.0253 20.1403 15.447 19.9596C16.04 19.7054 16.5747 19.8497 17.3194 20.0507L17.3194 20.0507C17.4269 20.0797 17.5387 20.1099 17.6558 20.1402C18.0907 20.253 18.5863 20.3567 19.121 20.3149C19.6683 20.2721 20.2269 20.0798 20.8 19.65C21.3585 19.2311 21.711 18.8002 21.8349 18.3466C22.0263 17.6458 21.6879 17.0085 21.4379 16.5595C21.4041 16.4989 21.3713 16.4409 21.3396 16.3848C21.2393 16.2074 21.1494 16.0485 21.073 15.8839C20.9751 15.6732 20.9216 15.4972 20.9133 15.3391L20.7742 12.6975C20.7463 12.1663 20.3075 11.75 19.7756 11.75H19.6163C19.8784 11.3556 20.1487 11.0364 20.4128 10.7309L20.476 10.6579C20.7286 10.3664 20.9889 10.0661 21.1955 9.73667C21.4282 9.36593 21.5992 8.95123 21.6581 8.43326C21.7162 7.92309 21.6625 7.33867 21.4851 6.62874C21.4095 6.3264 21.1788 6.1492 20.9974 6.04865C20.8085 5.944 20.5799 5.8702 20.3523 5.81197C20.004 5.72287 19.5689 5.64963 19.1257 5.57501C18.9926 5.55262 18.8589 5.5301 18.7265 5.507C18.1331 5.40341 17.538 5.28396 17.0205 5.10533C16.4964 4.92436 16.1108 4.7019 15.8841 4.42991C15.391 3.83818 15.1545 3.38369 14.9554 3.00127L14.9554 3.0012C14.9183 2.92983 14.8824 2.86097 14.8465 2.7942C14.7331 2.58363 14.6003 2.35874 14.4016 2.17136C14.192 1.97376 13.939 1.84437 13.6213 1.76493ZM20.5567 6.9522C20.5566 6.95221 20.5556 6.95142 20.554 6.94975C20.556 6.95135 20.5568 6.95218 20.5567 6.9522ZM2.52912 8.15055C2.52923 8.15069 2.52852 8.15237 2.52668 8.15516C2.5281 8.1518 2.52902 8.1504 2.52912 8.15055Z"
      />
    </AccessibleSvg>
  )
}

export const BicolorFrance = styled(BicolorFranceSvg).attrs(({ color, color2, size, theme }) => ({
  color: color ?? theme.colors.primary,
  color2: color2 ?? theme.colors.secondary,
  size: size ?? theme.icons.sizes.standard,
}))``
