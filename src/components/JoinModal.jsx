import { motion, AnimatePresence } from 'framer-motion';
import './JoinModal.css';

const JoinModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="modal-content"
          >
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>

            <div className="modal-icon">🚀</div>
            
            <h2 className="modal-title">Haven't Joined Limitless Yet?</h2>
            
            <p className="modal-description">
              Start earning points today and maximize your airdrop allocation! 
              Join the Limitless community and get started with exclusive benefits.
            </p>

            <div className="modal-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✨</span>
                <span>Earn points through trading</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <span>Qualify for airdrops</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <span>Access exclusive features</span>
              </div>
            </div>

            <a
              href="https://limitless.exchange/?r=NSQSEKE13U"
              target="_blank"
              rel="noopener noreferrer"
              className="join-button"
            >
              Join Limitless Now
            </a>

            <button className="skip-button" onClick={onClose}>
              Maybe Later
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;

