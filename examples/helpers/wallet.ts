import { Provider } from '@ethersproject/abstract-provider'
import { Wallet } from 'ethers'

/**
 * Creates and returns a wallet from a mnemonic (BIP-*)
 * @param mnemonic The mnemonic phrase
 * @returns
 */
export function getWallet(mnemonic: string, index: number = 0) {
  return Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`)
}

/**
 * Creates and returns 10 wallets from a mnemonic (BIP-*)
 * @param mnemonic The mnemonic phrase
 * @returns
 */
export function getWallets(mnemonic: string, provider?: Provider) {
  const accounts: Wallet[] = []

  for (let index = 0; index < 11; index++) {
    let wallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`)

    if (provider) {
      wallet = wallet.connect(provider)
    }

    accounts.push(wallet)
  }

  return accounts
}

export function withProvider(wallet: Wallet, provider: Provider) {
  return wallet.connect(provider)
}

/**
 * Creates and a random wallet from the first 10 mnemonic (BIP-*)
 * @param mnemonic The mnemonic phrase
 * @returns
 */
export function getRandomWallet(mnemonic: string) {
  const randomIndex = Math.floor(Math.random() * 11)
  return Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${randomIndex}`)
}
