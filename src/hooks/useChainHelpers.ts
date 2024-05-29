import { ethers } from 'ethers'

export default function useChainHelpers() {
	function getChainName(chainId) {
		if (chainId === 1) {
			return 'Ethereum'
		} else if (chainId === 167000) {
			return 'Taiko'
		} else {
			return 'Unsupported Network'
		}
	}

	function getFallbackProvider(networkId) {
		let urls

		if (networkId === 1) {
			urls = ['https://1rpc.io/eth']
		} else if (networkId === 167000) {
			urls = ['https://rpc.taiko.xyz']
		}

		if (urls) {
			const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url))
			return new ethers.providers.FallbackProvider(providers, 1) // return fallback provider
		} else {
			return null
		}
	}

	function switchNetwork(networkName) {
		let method
		let params

		if (networkName == 'Ethereum') {
			method = 'wallet_switchEthereumChain'
			params = [{ chainId: '0x1' }]
		} else if (networkName == 'Taiko') {
			method = 'wallet_addEthereumChain'
			params = [
				{
					blockExplorerUrls: ['https://taikoscan.network'],
					chainId: ethers.utils.hexValue(167000),
					chainName: networkName,
					nativeCurrency: { decimals: 18, name: 'ETH', symbol: 'ETH' },
					rpcUrls: ['https://rpc.taiko.xyz'],
				},
			]
		}

		return {
			method: method,
			params: params,
		}
	}

	// RETURN
	return {
		getChainName,
		getFallbackProvider,
		switchNetwork,
	}
}
