import { TransactionResponse } from '@ethersproject/abstract-signer/node_modules/@ethersproject/abstract-provider'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { Contract } from 'ethers'

export const stakeFarm = async (masterChefContract: Contract, pid: number, amount) => {
  const value = new BigNumber(amount || '0').times(DEFAULT_TOKEN_DECIMAL).toString()

  if (pid === 0) {
    const tx = await masterChefContract.stake(value)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx: TransactionResponse = await masterChefContract.deposit(pid, value)

  const receipt = await tx.wait()

  if (!receipt.status) {
    throw new Error('transaction was failed')
  }

  return receipt?.transactionHash
}

export const unstakeFarm = async (masterChefContract: Contract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.unstake(value)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx: TransactionResponse = await masterChefContract.withdraw(pid, value)
  const receipt = await tx.wait()

  if (!receipt.status) {
    throw new Error('transaction was failed')
  }

  return receipt.status
}

export const harvestFarm = async (masterChefContract: Contract, pid: number) => {
  if (pid === 0) {
    const tx = await masterChefContract.unstake('0')
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx: TransactionResponse = await masterChefContract.deposit(pid, '0')
  const receipt = await tx.wait()

  if (!receipt.status) {
    throw new Error('transaction was failed')
  }
  return receipt.status
}
