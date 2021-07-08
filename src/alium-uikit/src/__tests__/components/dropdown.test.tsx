import Dropdown from '../../components/Dropdown/Dropdown'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Dropdown target={<div>target</div>} />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-gsTCUz cXEafq"
      >
        <div>
          target
        </div>
        <div
          class="sc-bdfBwQ iLGqGB"
        />
      </div>
    </DocumentFragment>
  `)
})
