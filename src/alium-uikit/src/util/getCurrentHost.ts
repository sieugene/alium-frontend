const getCurrentHost = (): string => {
  return typeof window !== 'undefined' ? window.location.host : 'alium.finance'
}

export default getCurrentHost
