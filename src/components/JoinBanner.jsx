import { motion } from 'framer-motion';
import './JoinBanner.css';

const JoinBanner = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="join-banner"
    >
      <button className="banner-close" onClick={onClose}>
        ✕
      </button>

      <div className="banner-icon">🚀</div>
      
      <h3 className="banner-title">Haven't Joined Limitless Yet?</h3>
      
      <p className="banner-description">
        Participate in prediction market events on Limitless
      </p>

      <div className="banner-benefits">
        <div className="benefit-item">
          <span className="benefit-icon">📊</span>
          <span>Earn points by predicting</span>
        </div>
        <div className="benefit-item">
          <span className="benefit-icon">🎁</span>
          <span>Qualify for the $LMTS airdrop</span>
        </div>
        <div className="benefit-item">
          <span className="benefit-icon">🔓</span>
          <span>Access exclusive prediction markets</span>
        </div>
      </div>

      <div className="banner-buttons">
        <a
          href="https://limitless.exchange/?r=NSQSEKE13U"
          target="_blank"
          rel="noopener noreferrer"
          className="join-button primary"
        >
          Join Limitless Exchange
        </a>

        <a
          href="https://app.wallchain.xyz/leaderboards?ref=web3wikis"
          target="_blank"
          rel="noopener noreferrer"
          className="join-button secondary"
        >
          Join Wallchain Campaign
        </a>
      </div>
    </motion.div>
  );
};

export default JoinBanner;

