interface Competitor {
  id: string;
  name: string;
  url: string;
  features: {
    custody: boolean;
    nonCustody: boolean;
    kycRequired: boolean;
    maxLTV: number;
    minTermDays: number;
    maxTermDays: number;
    liquidationRisk: boolean;
    bridgedBTC: boolean;
    l1BTC: boolean;
    supportedWallets: string[];
    supportedCurrencies: string[];
    maxAPR: number;
  };
  tagline: string;
  logo?: string;
}

// Competitor data based on instructions
export const competitors: Competitor[] = [
  {
    id: "xapo",
    name: "Xapo Bank",
    url: "https://www.xapobank.com/en",
    features: {
      custody: true,
      nonCustody: false,
      kycRequired: true,
      maxLTV: 70,
      minTermDays: 30,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: false,
      l1BTC: true,
      supportedWallets: ["custodial"],
      supportedCurrencies: ["USD", "EUR", "GBP"],
      maxAPR: 9.5
    },
    tagline: "Banking on Bitcoin"
  },
  {
    id: "maple",
    name: "Maple Finance",
    url: "https://maple.finance/",
    features: {
      custody: true,
      nonCustody: false,
      kycRequired: true,
      maxLTV: 60,
      minTermDays: 90,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDC", "USDT", "DAI"],
      maxAPR: 12
    },
    tagline: "Institutional Capital Markets, Powered by Blockchain"
  },
  {
    id: "lava",
    name: "Lava",
    url: "https://www.lava.xyz/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 50,
      minTermDays: 1,
      maxTermDays: 90,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "browser wallet"],
      supportedCurrencies: ["USDC", "DAI"],
      maxAPR: 15
    },
    tagline: "Decentralized Lending for Bitcoin Holders"
  },
  {
    id: "debifi",
    name: "Debifi",
    url: "https://debifi.com/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 60,
      minTermDays: 1,
      maxTermDays: 180,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDC", "USDT", "DAI"],
      maxAPR: 12.5
    },
    tagline: "DeFi lending by and for Bitcoiners"
  },
  {
    id: "firefish",
    name: "Firefish",
    url: "https://firefish.io/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: true,
      maxLTV: 65,
      minTermDays: 30,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: false,
      l1BTC: true,
      supportedWallets: ["multisig", "own wallet"],
      supportedCurrencies: ["USD", "EUR"],
      maxAPR: 10
    },
    tagline: "Bitcoin-backed loans through a multisig setup"
  },
  {
    id: "hodlhodl",
    name: "HodlHodl",
    url: "https://hodlhodl.com/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 50,
      minTermDays: 1,
      maxTermDays: 90,
      liquidationRisk: true,
      bridgedBTC: false,
      l1BTC: true,
      supportedWallets: ["own wallet"],
      supportedCurrencies: ["USD", "EUR", "GBP"],
      maxAPR: 18
    },
    tagline: "Global P2P Bitcoin lending platform"
  },
  {
    id: "ledn",
    name: "Ledn",
    url: "https://ledn.io/",
    features: {
      custody: true,
      nonCustody: false,
      kycRequired: true,
      maxLTV: 70,
      minTermDays: 3,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: false,
      l1BTC: true,
      supportedWallets: ["custodial"],
      supportedCurrencies: ["USD", "USDC"],
      maxAPR: 9.9
    },
    tagline: "Financial services for digital asset holders"
  },
  {
    id: "nexo",
    name: "Nexo",
    url: "https://nexo.com/borrow",
    features: {
      custody: true,
      nonCustody: false,
      kycRequired: true,
      maxLTV: 50,
      minTermDays: 1,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: false,
      l1BTC: true,
      supportedWallets: ["custodial"],
      supportedCurrencies: ["USD", "EUR", "GBP", "USDC", "USDT"],
      maxAPR: 13.9
    },
    tagline: "Instant crypto credit lines"
  },
  {
    id: "bima",
    name: "Bima Money",
    url: "https://bima.money/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 55,
      minTermDays: 1,
      maxTermDays: 90,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDC", "DAI"],
      maxAPR: 14
    },
    tagline: "DeFi lending on BTC as collateral"
  },
  {
    id: "sovryn",
    name: "Sovryn",
    url: "https://sovryn.com/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 50,
      minTermDays: 1,
      maxTermDays: 30,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDT", "USDC", "RBTC"],
      maxAPR: 16
    },
    tagline: "Bitcoin-native financial operating system"
  },
  {
    id: "lombard",
    name: "Lombard Finance",
    url: "https://www.lombard.finance/app/vaults/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 60,
      minTermDays: 1,
      maxTermDays: 90,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDC", "DAI"],
      maxAPR: 12
    },
    tagline: "Fixed-rate, fixed-term BTC loans on DeFi"
  },
  {
    id: "aave",
    name: "Aave Markets",
    url: "https://app.aave.com/markets/",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 70,
      minTermDays: 1,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDC", "USDT", "DAI"],
      maxAPR: 15
    },
    tagline: "Open source liquidity protocol"
  },
  {
    id: "morpho",
    name: "Morpho Borrow",
    url: "https://app.morpho.org/ethereum/borrow",
    features: {
      custody: false,
      nonCustody: true,
      kycRequired: false,
      maxLTV: 75,
      minTermDays: 1,
      maxTermDays: 365,
      liquidationRisk: true,
      bridgedBTC: true,
      l1BTC: false,
      supportedWallets: ["metamask", "wallet connect"],
      supportedCurrencies: ["USDC", "USDT", "DAI"],
      maxAPR: 14
    },
    tagline: "Improved peer-to-peer lending on top of lending pools"
  }
];

// Function to match user preferences with competitors
export const matchCompetitors = (preferences: {
  custody?: boolean;
  kyc?: boolean;
  minLTV?: number;
  termDays?: number;
  noLiquidation?: boolean;
  l1BTC?: boolean;
  walletType?: string;
  currency?: string;
}) => {
  // Filter competitors based on user preferences
  return competitors.filter(competitor => {
    // If user wants custody, filter for custody options
    if (preferences.custody !== undefined) {
      if (preferences.custody && !competitor.features.custody) return false;
      if (!preferences.custody && !competitor.features.nonCustody) return false;
    }
    
    // If user has KYC preference
    if (preferences.kyc !== undefined) {
      if (!preferences.kyc && competitor.features.kycRequired) return false;
    }
    
    // If user has minimum LTV requirement
    if (preferences.minLTV && competitor.features.maxLTV < preferences.minLTV) {
      return false;
    }
    
    // If user has term length requirement
    if (preferences.termDays) {
      if (competitor.features.minTermDays > preferences.termDays ||
          competitor.features.maxTermDays < preferences.termDays) {
        return false;
      }
    }
    
    // If user wants no liquidation
    if (preferences.noLiquidation && competitor.features.liquidationRisk) {
      return false;
    }
    
    // If user has BTC chain preference
    if (preferences.l1BTC !== undefined) {
      if (preferences.l1BTC && !competitor.features.l1BTC) return false;
      if (!preferences.l1BTC && !competitor.features.bridgedBTC) return false;
    }
    
    // If user has wallet type preference
    if (preferences.walletType && 
        !competitor.features.supportedWallets.includes(preferences.walletType)) {
      return false;
    }
    
    // If user has currency preference
    if (preferences.currency && 
        !competitor.features.supportedCurrencies.includes(preferences.currency)) {
      return false;
    }
    
    return true;
  });
};

export default { competitors, matchCompetitors };