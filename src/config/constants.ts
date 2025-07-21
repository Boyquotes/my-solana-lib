/**
 * Constantes et paramètres de configuration pour le SDK CyberGold
 */

// ========================================================================================
// URLS
// ========================================================================================

export const DEFAULT_RPC_URL = 'https://api.devnet.solana.com'


// ========================================================================================
// ADRESSES AND IDENTIFIERS
// ========================================================================================

export const DEFAULT_PROGRAM_ID = "6V4AfucuYfgRPgw4SEwJxcTN49ubXAwT2uEb1zz2PfSZ";
// export const DEFAULT_PROGRAM_ID = "Ayc1tcPHnBwWaMukyhMpzSpF4HoRsemhZ64YG6oaCTS3";
export const SYNTH_MINT_ID = "NSkGbtQRLivFMT6fR885pKB5ffh8n6dwrMpKkbXhrdJ";
export const COLLAT_MINT_ID = "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"; // JitoSOL



// Pool State ID
// export const POOL_STATE_ID = "Dz8fc5DUGM61vsngoegenovh8USXmu2h8TcvxVa4ShiU";

// Seeds pour dériver les adresses PDA


// Paramètres de délai (timeouts)
export const DEFAULT_TIMEOUT_MS = 30000; // 30 secondes

// Constantes pour les opérations Solana
export const LAMPORTS_PER_SOL = 1_000_000_000; // 10^9 


// ========================================================================================
// PRICE FEEDS
// ========================================================================================

// IDs Hermes pour récupérer les prix via API
export const XAU_PRICE_FEED_ID = "765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2";
export const SOL_PRICE_FEED_ID = "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";

// Adresses Pyth sur devnet pour les transactions
export const XAU_PYTH_PRICE_FEED = "2uPQGpm8X4ZkxMHxrAW1QuhXcse1AHEgPih6Xp9NuEWW";
export const SOL_PYTH_PRICE_FEED = "7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE";

// ========================================================================================
// CONSTANTES DE CALCUL
// ========================================================================================

// Facteurs de conversion XAU vers CYG
export const XAU_TO_CYG_PRICE_FACTOR = 321_507_693;
export const XAU_TO_CYG_PRICE_DECIMALS = 12;
export const XAU_TO_CYG_QUANTITY_FACTOR = BigInt(311_034_768);
export const XAU_TO_CYG_QUANTITY_DECIMALS = 9;

// Décimales des tokens
export const CYG_DECIMALS = 9;
export const CYG_DECIMALS_POW = 1_000_000_000; // Math.pow(10, 9)

// Ratios et pourcentages
export const PERCENTAGE_FACTOR = 100; // Pour les conversions en %

// Facteurs de correction pour les calculs
// Facteur de correction du ratio de collatéralisation:
// Dans le frontend: la valeur brute est divisée par 100
// Donc on utilise 0.01 comme facteur multiplicatif
export const COLLATERAL_RATIO_CORRECTION_FACTOR = 0.01;
export const MINTABLE_CYG_CORRECTION_FACTOR = 1_000_000; // 10^6
export const VAULT_EQUITY_CORRECTION_FACTOR = 0.738303;

// ========================================================================================
// ADRESSES SOLANA STANDARD
// ========================================================================================

// Programmes natifs Solana
export const TOKEN_PROGRAM_ID       = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export const TOKEN_2022_PROGRAM_ID  = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
export const SYSVAR_RENT_PUBKEY     = "SysvarRent111111111111111111111111111111111";

// ========================================================================================
// SEEDS POUR DÉRIVATION D'ADRESSES
// ========================================================================================

export const VAULT_SEED = "vault";
export const POOL_STATE_SEED = "pool_state";
export const MINT_SEED = "devmint008"; 
export const POOL_PARAMS_SEED = "pool_params";

// ========================================================================================
// TIMEOUTS ET DÉLAIS
// ========================================================================================

export const SOL_PRICE_CACHE_SECONDS = 300; // 5 minutes
export const XAU_PRICE_CACHE_SECONDS = 3600; // 1 heure  
export const API_TIMEOUT_MS = 10000; // 10 secondes
export const PRICE_FRESHNESS_SECONDS = 300; // 5 minutes par défaut

// ========================================================================================
// PARAMÈTRES DE TRANSACTION
// ========================================================================================

export const TRANSACTION_COMPUTE_UNITS = 300_000;
export const TRANSACTION_PRIORITY_FEE_MICRO_LAMPORTS = 15_000;

// ========================================================================================
// CONSTANTES DE BOUCLES ET LIMITES
// ========================================================================================

export const MAX_PROGRAM_DERIVATION_ATTEMPTS = 1000;
export const DERIVATION_LOG_INTERVAL = 100;

// ========================================================================================
// CONSTANTES DE TEST ET SIMULATION
// ========================================================================================

export const MOCK_MIN_SHARES = 100_000;
export const MOCK_MAX_SHARES = 999_999; 
export const MOCK_MIN_EQUITY = 0.1; // SOL
export const MOCK_MAX_EQUITY_RANGE = 100; // 0.1 + (hash % 100) / 100
export const MOCK_WITHDRAWAL_MARGIN = 0.000000001; // SOL


// ========================================================================================
// CONFIGURATION DE DEBUG ET LOGGING
// ========================================================================================

// Variable de debug - à mettre à false en production
export const DEBUG_ENABLED = true; // FORCE DÉSACTIVÉ POUR PRODUCTION

/**
 * Fonction de logging conditionnelle
 * Affiche les logs seulement si DEBUG_ENABLED est true
 */
export function debugLog(category: string, ...args: any[]): void {
  if (DEBUG_ENABLED) {
    console.log(`[CyberGold-${category}]`, ...args);
  }
}

/**
 * Fonction pour les logs d'erreur (toujours affichés)
 */
export function errorLog(category: string, ...args: any[]): void {
  console.error(category, ...args);
}

/**
 * Fonction pour les warnings (toujours affichés)
 */
export function warnLog(category: string, ...args: any[]): void {
  console.warn(`[CyberGold-WARN-${category}]`, ...args);
}

