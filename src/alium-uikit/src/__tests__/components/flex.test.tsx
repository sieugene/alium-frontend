import Flex from '../../components/Flex/Flex'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Flex>flex</Flex>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-bdfBwQ iUGWfo"
      >
        flex
      </div>
    </DocumentFragment>
  `)
})
