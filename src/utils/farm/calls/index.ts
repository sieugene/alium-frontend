import { TransactionResponse } from '@ethersproject/abstract-signer/node_modules/@ethersproject/abstract-provider'
import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { Contract } from 'ethers'
import { calculateGasPrice } from 'utils'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract: Contract, pid: number, amount) => {
  const value = new BigNumber(amount || '0').times(DEFAULT_TOKEN_DECIMAL).toString()
  const gasPrice = await calculateGasPrice(masterChefContract.provider)

  if (pid === 0) {
    const tx = await masterChefContract.stake(value, { gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx: TransactionResponse = await masterChefContract.deposit(pid, value, { gasPrice })

  const receipt = await tx.wait()

  if (!receipt.status) {
    throw new Error('transaction was failed')
  }

  return receipt?.transactionHash
}

export const unstakeFarm = async (masterChefContract: Contract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const gasPrice = calculateGasPrice(masterChefContract.provider)

  if (pid === 0) {
    const tx = await masterChefContract.unstake(value, { gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx: TransactionResponse = await masterChefContract.withdraw(pid, value, { gasPrice })
  const receipt = await tx.wait()

  if (!receipt.status) {
    throw new Error('transaction was failed')
  }

  return receipt.status
}

export const harvestFarm = async (masterChefContract: Contract, pid: number) => {
  const gasPrice = calculateGasPrice(masterChefContract.provider)
  if (pid === 0) {
    const tx = await masterChefContract.unstake('0', { gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx: TransactionResponse = await masterChefContract.deposit(pid, '0', { gasPrice })
  const receipt = await tx.wait()

  if (!receipt.status) {
    throw new Error('transaction was failed')
  }
  return receipt.status
}
