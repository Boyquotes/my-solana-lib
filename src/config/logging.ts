
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