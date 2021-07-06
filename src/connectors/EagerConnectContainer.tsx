import useEagerConnect from 'hooks/useEagerConnect'

const EagerConnectContainer = () => {
  process.browser && useEagerConnect()
  return null
}

export default EagerConnectContainer
