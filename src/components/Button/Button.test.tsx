import renderer from 'react-test-renderer'
import { expect } from '@jest/globals'
import { Button } from './Button'

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Button variant="contained">click Me</Button>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
