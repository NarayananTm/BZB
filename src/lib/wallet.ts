export interface WalletAllocation {
  levelIncomeWallet: number;
  walletBalance: number;
  mbdWallet: number;
  boosterTopup: number;
}

function money(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateWalletAllocation(amount: number): WalletAllocation {
  const levelIncomeWallet = money(amount);
  const mbdAllocation = money(levelIncomeWallet / 5);
  const boosterTopup = money(levelIncomeWallet * 0.02);

  return {
    levelIncomeWallet,
    walletBalance: money(levelIncomeWallet - mbdAllocation - boosterTopup),
    mbdWallet: mbdAllocation,
    boosterTopup,
  };
}