// Hardcoded emission data
const EMISSION_DATA = {
  period1: {
    start: '2024-09-22',
    end: '2024-10-20',
    total: 10797580.831,
    days: 28
  },
  period2: {
    start: '2024-10-20',
    end: '2024-11-17',
    total: 12535409.198,
    days: 28
  }
};

const SNAPSHOT_DATE = '2025-01-26';

// Calculate days between two dates
export const daysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Calculate days remaining until snapshot
export const daysUntilSnapshot = () => {
  const today = new Date();
  const snapshot = new Date(SNAPSHOT_DATE);
  const diffTime = snapshot - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Calculate daily emissions
export const calculateDailyEmissions = () => {
  const daily1 = EMISSION_DATA.period1.total / EMISSION_DATA.period1.days;
  const daily2 = EMISSION_DATA.period2.total / EMISSION_DATA.period2.days;
  
  return {
    daily1,
    daily2
  };
};

// Calculate projected global points at snapshot
export const calculateProjectedGlobalPoints = () => {
  const { daily2 } = calculateDailyEmissions();
  
  // Historical total from periods 1 and 2
  const historicalTotal = EMISSION_DATA.period1.total + EMISSION_DATA.period2.total;
  
  // Period 3: Nov 17 → Dec 15
  const period3Days = daysBetween('2024-11-17', '2024-12-15');
  const period3 = daily2 * period3Days;
  
  // Period 4: Dec 15 → Jan 13
  const period4Days = daysBetween('2024-12-15', '2025-01-13');
  const period4 = daily2 * period4Days;
  
  // Period 5: Jan 13 → Jan 26
  const period5Days = daysBetween('2025-01-13', '2025-01-26');
  const period5 = daily2 * period5Days;
  
  const projectedGlobalPoints = historicalTotal + period3 + period4 + period5;
  
  return {
    historicalTotal,
    period3,
    period4,
    period5,
    projectedGlobalPoints,
    breakdown: {
      period1: EMISSION_DATA.period1.total,
      period2: EMISSION_DATA.period2.total,
      period3,
      period4,
      period5
    }
  };
};

// Calculate user's projected points and share
export const calculateUserShare = (projectedUserPoints) => {
  const { projectedGlobalPoints } = calculateProjectedGlobalPoints();
  const userShare = projectedUserPoints / projectedGlobalPoints;
  const daysRemaining = daysUntilSnapshot();
  
  return {
    projectedUserPoints,
    projectedGlobalPoints,
    userShare,
    daysRemaining
  };
};

// Calculate airdrop tokens
export const calculateAirdrop = (
  projectedUserPoints,
  airdropPercent,
  totalTokenSupply,
  tokenPrice
) => {
  const { projectedGlobalPoints, userShare, daysRemaining } = 
    calculateUserShare(projectedUserPoints);
  
  const airdropTokens = (airdropPercent / 100) * totalTokenSupply * userShare;
  const usdValue = airdropTokens * tokenPrice;
  
  return {
    projectedUserPoints,
    projectedGlobalPoints,
    userShare: userShare * 100, // Convert to percentage
    airdropTokens,
    usdValue,
    daysRemaining
  };
};

