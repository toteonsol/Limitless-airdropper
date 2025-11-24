import { useMemo } from 'react';
import './SensitivityTable.css';

const SensitivityTable = ({ projectedPoints, totalPoints, totalSupply, lmtsPrice }) => {
  const scenarios = useMemo(() => {
    const percentages = [5, 10, 15, 20, 25, 30];
    const userShare = projectedPoints / totalPoints;

    return percentages.map(percent => {
      const airdropPool = totalSupply * (percent / 100);
      const estimatedLMTS = airdropPool * userShare;
      const estimatedValueUSD = estimatedLMTS * lmtsPrice;

      return {
        percent,
        lmts: estimatedLMTS,
        usd: estimatedValueUSD
      };
    });
  }, [projectedPoints, totalPoints, totalSupply, lmtsPrice]);

  return (
    <div className="sensitivity-table">
      <h3>📈 Sensitivity Analysis</h3>
      <p className="table-subtitle">Estimated rewards at different allocation percentages</p>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Allocation %</th>
              <th>LMTS Tokens</th>
              <th>USD Value</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <tr key={scenario.percent}>
                <td className="percent-cell">{scenario.percent}%</td>
                <td className="lmts-cell">{scenario.lmts.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                <td className="usd-cell">${scenario.usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensitivityTable;

