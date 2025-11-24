import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateAirdrop, calculateProjectedGlobalPoints } from '../utils/calculations';
import AnimatedNumber from './AnimatedNumber';
import EmissionBreakdown from './EmissionBreakdown';
import JoinBanner from './JoinBanner';
import './AirdropEstimator.css';

const AirdropEstimator = () => {
  const [projectedPoints, setProjectedPoints] = useState(50000);
  const [airdropPercent, setAirdropPercent] = useState(10);
  const [totalSupply, setTotalSupply] = useState(1000000000);
  const [tokenPrice, setTokenPrice] = useState(0.10);
  const [showBanner, setShowBanner] = useState(true);

  const results = useMemo(() => {
    return calculateAirdrop(
      projectedPoints,
      airdropPercent,
      totalSupply,
      tokenPrice
    );
  }, [projectedPoints, airdropPercent, totalSupply, tokenPrice]);

  const globalData = useMemo(() => {
    return calculateProjectedGlobalPoints();
  }, []);

  return (
    <div className="estimator-container">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="header"
      >
        <div className="creator-badge">
          Created by{' '}
          <a 
            href="https://x.com/web3wikis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="creator-link"
          >
            @web3wikis
          </a>
        </div>

        <div className="logo-section">
          <h1 className="main-title">
            <span className="gradient-text">LIMITLESS</span>
          </h1>
          <p className="subtitle">Airdrop Estimator</p>
        </div>
        <div className="snapshot-banner">
          <span className="snapshot-label">Season Snapshot</span>
          <span className="snapshot-date">January 26, 2025</span>
          <span className="days-remaining">{results.daysRemaining} days remaining</span>
        </div>
      </motion.div>

      <div className="main-grid">
        <div className="left-column">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card input-card"
          >
            <h2 className="card-title">
              <span className="icon">📊</span>
              Your Points
            </h2>

            <div className="input-group">
              <label>Projected Points at Snapshot</label>
              <input
                type="number"
                value={projectedPoints}
                onChange={(e) => setProjectedPoints(Number(e.target.value))}
                className="number-input"
                min="0"
              />
            </div>

            <div className="info-box">
              <div className="info-row">
                <span>Your Share of Pool</span>
                <span className="info-value highlight">
                  {results.userShare.toFixed(4)}%
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card input-card"
          >
            <h2 className="card-title">
              <span className="icon">⚙️</span>
              Airdrop Parameters
            </h2>

            <div className="input-group">
              <label>
                <span>Airdrop Allocation %</span>
                <span className="value-display">{airdropPercent}%</span>
              </label>
              <input
                type="range"
                value={airdropPercent}
                onChange={(e) => setAirdropPercent(Number(e.target.value))}
                min="3"
                max="25"
                step="0.5"
                className="slider purple"
              />
              <div className="slider-labels">
                <span>3%</span>
                <span>25%</span>
              </div>
            </div>

            <div className="input-group">
              <label>
                <span>Token Price (USD)</span>
                <span className="value-display">${tokenPrice.toFixed(3)}</span>
              </label>
              <input
                type="range"
                value={tokenPrice}
                onChange={(e) => setTokenPrice(Number(e.target.value))}
                min="0.005"
                max="0.50"
                step="0.005"
                className="slider purple"
              />
              <div className="slider-labels">
                <span>$0.005</span>
                <span>$0.50</span>
              </div>
            </div>

            <div className="input-group">
              <label>Total Token Supply</label>
              <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(Number(e.target.value))}
                className="number-input"
                min="0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
          >
            <EmissionBreakdown globalData={globalData} />
          </motion.div>
        </div>

        <div className="right-column">
          {showBanner && (
            <JoinBanner onClose={() => setShowBanner(false)} />
          )}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card results-card"
          >
            <h2 className="card-title">
              <span className="icon">💎</span>
              Estimated Rewards
            </h2>

            <div className="result-main">
              <p className="result-label">Estimated LMTS Tokens</p>
              <p className="result-value tokens">
                <AnimatedNumber value={results.airdropTokens} decimals={2} />
                <span className="token-symbol">LMTS</span>
              </p>
            </div>

            <div className="result-secondary">
              <p className="result-label">Estimated USD Value</p>
              <p className="result-value usd">
                $<AnimatedNumber value={results.usdValue} decimals={2} />
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <p className="stat-label">Airdrop Pool</p>
                  <p className="stat-value">
                    {((airdropPercent / 100) * totalSupply / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-content">
                  <p className="stat-label">Total Points</p>
                  <p className="stat-value">
                    {(results.projectedGlobalPoints / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <p className="stat-label">Your Points</p>
                  <p className="stat-value">
                    {(results.projectedUserPoints / 1000).toFixed(2)}K
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-content">
                  <p className="stat-label">Days Left</p>
                  <p className="stat-value">{results.daysRemaining}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card scenarios-card"
          >
            <h2 className="card-title">
              <span className="icon">📊</span>
              Allocation Scenarios
            </h2>

            <div className="scenarios-table">
              {[5, 10, 15, 20, 25].map((percent) => {
                const tokens = (percent / 100) * totalSupply * (results.userShare / 100);
                const value = tokens * tokenPrice;
                
                return (
                  <div 
                    key={percent} 
                    className={`scenario-row ${percent === airdropPercent ? 'active' : ''}`}
                  >
                    <div className="scenario-percent">{percent}%</div>
                    <div className="scenario-tokens">
                      {tokens.toLocaleString('en-US', { maximumFractionDigits: 0 })} LMTS
                    </div>
                    <div className="scenario-value">
                      ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="disclaimer"
      >
        <p>⚠️ This is an estimation tool only. Actual airdrop amounts may vary based on final tokenomics, distribution rules, and total participant points. Not financial advice.</p>
      </motion.div>
    </div>
  );
};

export default AirdropEstimator;

