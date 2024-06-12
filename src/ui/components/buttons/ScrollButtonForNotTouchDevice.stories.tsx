import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { selectArgTypeFromObject } from 'libs/storybook/selectArgTypeFromObject'
import { Spacer } from 'ui/components/spacer/Spacer'
import { StoryContainer } from 'ui/storybook/StoryContainer'
import { ArrowLeft } from 'ui/svg/icons/ArrowLeft'
import { ArrowRight } from 'ui/svg/icons/ArrowRight'

import { ScrollButtonForNotTouchDevice } from './ScrollButtonForNotTouchDevice'

const meta: ComponentMeta<typeof ScrollButtonForNotTouchDevice> = {
  title: 'ui/buttons/ScrollButtonForNotTouchDevice',
  component: ScrollButtonForNotTouchDevice,
  decorators: [
    (Story) => (
      <StoryContainer withBackground>
        <Spacer.Column numberOfSpaces={2} />
        <Story />
        <Spacer.Column numberOfSpaces={2} />
      </StoryContainer>
    ),
  ],
  argTypes: {
    horizontalAlign: selectArgTypeFromObject({
      left: 'left',
      right: 'right',
    }),
  },
}
export default meta

const Template: ComponentStory<typeof ScrollButtonForNotTouchDevice> = (args) => (
  <ScrollButtonForNotTouchDevice {...args} />
)

export const WithArrowLeft = Template.bind({})
WithArrowLeft.args = {
  horizontalAlign: 'left',
  children: <ArrowLeft />,
}
WithArrowLeft.parameters = {
  docs: {
    source: {
      code: `<ScrollButtonForNotTouchDevice horizontalAlign="left">
      <BicolorArrowLeft />
      </ScrollButtonForNotTouchDevice>`,
    },
  },
}

export const WithArrowRight = Template.bind({})
WithArrowRight.args = {
  horizontalAlign: 'right',
  children: <ArrowRight />,
}
WithArrowRight.parameters = {
  docs: {
    source: {
      code: `<ScrollButtonForNotTouchDevice horizontalAlign="right">
      <BicolorArrowRight />
      </ScrollButtonForNotTouchDevice>`,
    },
  },
}
