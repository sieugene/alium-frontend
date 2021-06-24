import useEagerConnect from 'hooks/useEagerConnect'

const EagerConnectContainer = () => {
  process.browser && useEagerConnect()
  return <div></div>
}

export default EagerConnectContainer
