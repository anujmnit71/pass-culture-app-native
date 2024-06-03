import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import {
  AttachedOfferCard,
  AttachedOfferCardProps,
} from 'features/home/components/AttachedOfferCard'
import { BlackGradient } from 'features/home/components/BlackGradient'
import { mapCategoryToIcon } from 'libs/parsers/category'
import { FastImage } from 'libs/resizing-image-on-demand/FastImage'
import { BlurAmount } from 'ui/components/BlurryWrapper/BlurAmount'
import { BlurryWrapper } from 'ui/components/BlurryWrapper/BlurryWrapper'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { InternalNavigationProps } from 'ui/components/touchableLink/types'
import { getSpacing, Spacer } from 'ui/theme'

type MarketingBlockProps = Omit<AttachedOfferCardProps, 'onPress'> & {
  accessibilityLabel: string
  navigateTo: InternalNavigationProps['navigateTo']
  backgroundImageUrl?: string
  onBeforeNavigate?: () => void
}

export const MarketingBlockContentDesktop = ({
  accessibilityLabel,
  navigateTo,
  onBeforeNavigate,
  title,
  categoryId,
  backgroundImageUrl,
  imageUrl,
  offerLocation,
  price,
  categoryText,
  date,
  withRightArrow,
  showImage,
}: MarketingBlockProps) => {
  const Icon = mapCategoryToIcon(categoryId || null)
  const StyledIcon = styled(Icon).attrs(({ theme }) => ({
    size: theme.illustrations.sizes.small,
    color: theme.colors.greyMedium,
  }))``

  return (
    <View testID="MarketingBlockContentDesktop">
      <Container>
        <BackgroundImageContainer>
          {backgroundImageUrl ? (
            <Image url={backgroundImageUrl} />
          ) : (
            <ImagePlaceholder>
              <StyledIcon />
            </ImagePlaceholder>
          )}
        </BackgroundImageContainer>
        <Spacer.Row numberOfSpaces={10} />
        <StyledTouchableLink
          navigateTo={navigateTo}
          onBeforeNavigate={onBeforeNavigate}
          accessibilityLabel={accessibilityLabel}>
          <AttachedOfferCardContainer>
            <AttachedOfferCard
              title={title}
              categoryId={categoryId}
              imageUrl={imageUrl}
              offerLocation={offerLocation}
              price={price}
              categoryText={categoryText}
              date={date}
              withRightArrow={withRightArrow}
              showImage={showImage}
            />
          </AttachedOfferCardContainer>
        </StyledTouchableLink>
      </Container>
      <BackgroundContainer>
        {backgroundImageUrl ? (
          <ImageBackground source={{ uri: backgroundImageUrl }}>
            <StyledBlurryWrapper blurAmount={BlurAmount.INTENSE}>
              <BlackGradient height="100%" />
            </StyledBlurryWrapper>
          </ImageBackground>
        ) : (
          <BackgroundImagePlaceholder>
            <BlackGradient height="100%" />
          </BackgroundImagePlaceholder>
        )}
      </BackgroundContainer>
    </View>
  )
}

const StyledBlurryWrapper = styled(BlurryWrapper)({
  height: '100%',
  width: '100%',
})

const Container = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  margin: 'auto',
})

const BackgroundImageContainer = styled.View(({ theme }) => ({
  height: getSpacing(118.75),
  width: getSpacing(93.75),
  backgroundColor: theme.colors.greyLight,
  overflow: 'hidden',
  borderRadius: getSpacing(2),
}))

const Image = styled(FastImage)({
  borderRadius: getSpacing(2),
  flex: 1,
})

const ImagePlaceholder = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

const ImageBackground = styled.ImageBackground({
  height: '100%',
  width: '100%',
  overflow: 'hidden',
})

const BackgroundImagePlaceholder = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.greyLight,
  flex: 1,
}))

const AttachedOfferCardContainer = styled.View({
  width: getSpacing(94),
})

const StyledTouchableLink = styled(InternalTouchableLink)({
  flex: 1,
})

const BackgroundContainer = styled.View({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  paddingVertical: getSpacing(10),
  zIndex: -5,
})
