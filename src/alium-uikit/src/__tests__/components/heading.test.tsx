import Heading from '../../components/Heading/Heading'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Heading>Title</Heading>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <h2
        class="sc-bdfBwQ sc-gsTCUz iEFWFe euWWbB"
        color="text"
      >
        Title
      </h2>
    </DocumentFragment>
  `)
})
