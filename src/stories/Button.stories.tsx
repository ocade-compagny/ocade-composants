import React from 'react'
import { Story } from '@storybook/react'
import { Button, ButtonProps } from '../components/Button/Button'

export default {
  title: 'Button',
  component: Button
}

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Contained = Template.bind({})
Contained.args = {
  children: 'Contained',
  variant: 'contained',
  shape: true
}

export const Outlined = Template.bind({})
Outlined.args = {
  children: 'Outlined',
  variant: 'outlined',
  shape: true
}

export const Text = Template.bind({})
Text.args = {
  children: 'Text Button',
  variant: 'text',
  shape: true
}
