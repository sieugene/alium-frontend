import Overlay from '../../components/Overlay/Overlay'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Overlay show />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-bdfBwQ SmJzf"
        role="presentation"
      />
    </DocumentFragment>
  `)
})
