import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { Contract } from 'ethers'
import { calculateGasPrice } from 'utils'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract: Contract, pid: number, amount) => {
  const gasPrice = await calculateGasPrice(masterChefContract.provider)
  const value = new BigNumber(amount || '0').times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.stake(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }
  const tx = await masterChefContract.deposit(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract: Contract, pid, amount) => {
  const gasPrice = calculateGasPrice(masterChefContract.provider)
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.unstake(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.withdraw(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract: Contract, pid: number) => {
  const gasPrice = await calculateGasPrice(masterChefContract.provider)

  if (pid === 0) {
    const tx = await masterChefContract.unstake('0', { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, '0', { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}
