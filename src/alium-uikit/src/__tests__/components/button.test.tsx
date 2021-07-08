import Button from '../../components/Button/Button'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Button>Submit</Button>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="sc-bdfBwQ fvqUiO"
        type="button"
      >
        Submit
      </button>
    </DocumentFragment>
  `)
})
