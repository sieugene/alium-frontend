import Progress from '../../components/Progress/Progress'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Progress primaryStep={50} />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-gsTCUz hAeaPg"
      >
        <div
          class="sc-bdfBwQ hyWavk"
          style="width: 50%;"
        />
      </div>
    </DocumentFragment>
  `)
})
