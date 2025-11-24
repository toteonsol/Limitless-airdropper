import './EmissionBreakdown.css';

const EmissionBreakdown = ({ globalData }) => {
  const periods = [
    { name: 'Sept 22 - Oct 20', value: globalData.breakdown.period1, color: '#8b5cf6' },
    { name: 'Oct 20 - Nov 17', value: globalData.breakdown.period2, color: '#a78bfa' },
    { name: 'Nov 17 - Dec 15', value: globalData.breakdown.period3, color: '#c4b5fd' },
    { name: 'Dec 15 - Jan 13', value: globalData.breakdown.period4, color: '#ddd6fe' },
    { name: 'Jan 13 - Jan 26', value: globalData.breakdown.period5, color: '#ede9fe' }
  ];

  const maxValue = Math.max(...periods.map(p => p.value));

  return (
    <div className="emission-breakdown">
      <h2 className="card-title">
        <span className="icon">📅</span>
        Emission Breakdown
      </h2>

      <div className="total-points">
        <span>Projected Total Points</span>
        <span className="total-value">
          {(globalData.projectedGlobalPoints / 1000000).toFixed(2)}M PPTS
        </span>
      </div>

      <div className="periods-list">
        {periods.map((period, index) => (
          <div key={index} className="period-item">
            <div className="period-header">
              <span className="period-name">{period.name}</span>
              <span className="period-value">
                {(period.value / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="period-bar-container">
              <div 
                className="period-bar"
                style={{
                  width: `${(period.value / maxValue) * 100}%`,
                  background: `linear-gradient(90deg, ${period.color}, ${period.color}dd)`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmissionBreakdown;

