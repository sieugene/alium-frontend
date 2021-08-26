import { ChainId } from '@alium-official/sdk'
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'

export class Web3InjectedConnector extends InjectedConnector {
  private chainId: number
  // list for force notify like Ethereum
  private listForcedNotifyConnect: AbstractConnectorArguments['supportedChainIds']

  constructor({ supportedChainIds }: AbstractConnectorArguments) {
    super({ supportedChainIds: supportedChainIds })
    this.chainId = supportedChainIds[0]
    this.listForcedNotifyConnect = [ChainId.ETHER_MAINNET, ChainId.ETHER_TESTNET]
  }

  // when auto notify not working, use this method
  public async notifyMetamask() {
    const ethereum = window.ethereum
    try {
      if (this.inForced) {
      // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
       await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${this.chainId.toString(16)}` }],
        })
      }
    } catch(switchError) {
      if (switchError.code === 32002) {
          // await ethereum.request({
          //   method: 'wallet_addEthereumChain',
          //   params: [{ chainId: '0xf00', rpcUrl: 'https://...' /* ... */ }],
          return console.log(switchError)
          };
    }
  }

  public async activate(): Promise<ConnectorUpdate> {
    try {
      await this.notifyMetamask()
      return super.activate()
    } catch (error) {
      return error
    }
  }

  get inForced() {
    return this.listForcedNotifyConnect.includes(this.chainId)
  }
}
