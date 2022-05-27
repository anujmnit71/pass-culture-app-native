import * as React from 'react'

import { CulturalSurveyCheckbox } from 'features/culturalSurvey/components/CulturalSurveyCheckbox'
import { render, fireEvent } from 'tests/utils/web'
import { culturalSurveyIcons } from 'ui/svg/icons/bicolor/exports/culturalSurveyIcons'

describe('CulturalSurveyCheckbox', () => {
  it('should render correctly', () => {
    const CulturalSurveyCheckboxComponent = render(
      <CulturalSurveyCheckbox
        icon={culturalSurveyIcons.Museum}
        title={'Visité un musée,'}
        subtitle={'un monument, une exposition...'}
        selected={false}
        onPress={jest.fn()}
      />
    )
    expect(CulturalSurveyCheckboxComponent).toMatchSnapshot()
  })
  it('should render correctly when pressed', () => {
    const CulturalSurveyCheckboxComponent = render(
      <CulturalSurveyCheckbox
        icon={culturalSurveyIcons.Museum}
        title={'Visité un musée,'}
        subtitle={'un monument, une exposition...'}
        selected={false}
        onPress={jest.fn()}
      />
    )
    const Button = CulturalSurveyCheckboxComponent.getByTestId(
      'Visité un musée,-CulturalSurveyAnswer'
    )
    fireEvent.click(Button)
    expect(CulturalSurveyCheckboxComponent).toMatchSnapshot()
  })
})
