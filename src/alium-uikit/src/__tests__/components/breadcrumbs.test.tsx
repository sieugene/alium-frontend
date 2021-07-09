import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Breadcrumbs>Link</Breadcrumbs>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <ul
        class="sc-dlfnbm lhEQuh"
      />
    </DocumentFragment>
  `)
})
