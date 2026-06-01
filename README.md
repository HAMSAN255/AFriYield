# 🌾 AFriYield - DeFi Staking & Yield Farming Protocol

AFriYield is a comprehensive DeFi protocol built on Binance Smart Chain (BSC) that combines staking, yield farming, and an affiliate program to create sustainable passive income opportunities for African communities.

## 🎯 Key Features

- **Staking**: 0.5% - 2% daily profit margins
- **Yield Farming**: 150-300% APY on liquidity pools
- **Affiliate Program**: 6-level referral system with attractive commissions
- **Total Supply**: 100,000,000 AFY tokens
- **Token Type**: Utility Token (ERC20)
- **Blockchain**: Binance Smart Chain (BSC)

## 📊 Tokenomics Overview

| Allocation | Amount | Percentage |
|-----------|--------|-----------|
| Staking Reserve | 30,000,000 AFY | 30% |
| Yield Farming | 25,000,000 AFY | 25% |
| Affiliate Rewards | 20,000,000 AFY | 20% |
| Team & Development | 15,000,000 AFY | 15% |
| Marketing & Community | 10,000,000 AFY | 10% |
| **TOTAL SUPPLY** | **100,000,000 AFY** | **100%** |

## 💰 Staking Tiers

| Tier | Amount | Daily Return |
|------|--------|--------------|
| Tier 1 | 0 - 1,000 AFY | 0.5% |
| Tier 2 | 1,001 - 10,000 AFY | 1% |
| Tier 3 | 10,001+ AFY | 2% |

## 👥 Affiliate Commission Structure (6 Levels)

| Level | Commission | Relationship |
|-------|-----------|--------------|
| Level 1 | 15% | Direct referral |
| Level 2 | 8% | Your referral's referral |
| Level 3 | 4% | Level 2's referral |
| Level 4 | 1% | Level 3's referral |
| Level 5 | 1% | Level 4's referral |
| Level 6 | 1% | Level 5's referral |
| **TOTAL** | **30%** | **Commission Pool** |

## 🏗️ Project Structure

```
AFriYield/
├── contracts/
│   ├── AFYToken.sol              # ERC20 Token Implementation
│   ├── StakingContract.sol        # Staking with 0.5-2% daily returns
│   ├── YieldFarmingContract.sol   # Yield Farming pools
│   ├── AffiliateContract.sol      # 6-level referral system
│   ├── MainContract.sol           # Master coordinating contract
│   └── interfaces/
│       └── IERC20.sol             # ERC20 interface
├── tests/
│   ├── AFYToken.test.js
│   ├── StakingContract.test.js
│   ├── YieldFarmingContract.test.js
│   └── AffiliateContract.test.js
├── scripts/
│   ├── deploy.js                  # Deployment script
│   └── verify.js                  # Verification script
├── docs/
│   ├── TOKENOMICS.md              # Detailed tokenomics
│   ├── REFERRAL_SYSTEM.md         # Affiliate program details
│   ├── ARCHITECTURE.md            # Smart contract architecture
│   └── DEPLOYMENT.md              # Deployment guide
├── hardhat.config.js              # Hardhat configuration
├── package.json                   # Dependencies
├── .env.example                   # Environment variables template
└── LICENSE                        # MIT License
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- Hardhat

### Installation

```bash
# Clone the repository
git clone https://github.com/HAMSAN255/AFriYield.git
cd AFriYield

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to BSC Testnet
npx hardhat run scripts/deploy.js --network bscTestnet

# Deploy to BSC Mainnet
npx hardhat run scripts/deploy.js --network bsc
```

## 📚 Smart Contracts

### 1. AFYToken.sol
- ERC20 standard token
- Total Supply: 100,000,000 AFY
- Decimals: 18
- Features: Burnable, Pausable

### 2. StakingContract.sol
- Daily Returns: 0.5% - 2% (tier-based)
- Auto-compounding option
- 7-day withdrawal cooling period
- Minimum stake: 100 AFY

### 3. YieldFarmingContract.sol
- Liquidity pools: AFY/BNB, AFY/BUSD
- APY: 150-300% (dynamic)
- Lock period: 7 days
- Emergency withdrawal available

### 4. AffiliateContract.sol
- 6-level referral system
- Real-time commission calculation
- Multi-level payout distribution
- Anti-fraud mechanisms

### 5. MainContract.sol
- Coordinates all modules
- Admin functions
- Emergency pause mechanism
- Protocol treasury management

## 💼 Compensation Plan

### Revenue Distribution
1. **Daily Staking Returns**: 0.5% - 2% to stakers
2. **Affiliate Commissions**: 30% pool distributed across 6 levels
3. **Protocol Fee**: 5% of rewards (sustainability)
4. **LP Rewards**: APY from yield farming pools

### Example Earnings (1,000 AFY staked)

**Direct Staking (Tier 1 - 0.5% daily)**
- Day 1: 5 AFY earned
- Day 7: 35.06 AFY earned
- Day 30: 164.62 AFY earned
- Year 1: 6,170.78 AFY earned

**Referral Commissions**
- 1 referral (1,000 AFY): 0.75 AFY/day from Level 1
- 10 referrals: 7.50 AFY/day
- 100 referrals: 75 AFY/day

## 🌐 Network Configuration

**Blockchain**: Binance Smart Chain (BSC)

### Mainnet
- Chain ID: 56
- RPC: https://bsc-dataseed.binance.org/
- Block Explorer: https://bscscan.com/
- Block Time: ~3 seconds

### Testnet
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-1.binance.org:8545/
- Block Explorer: https://testnet.bscscan.com/
- Test BNB: https://testnet.binance.org/faucet-smart

## 📖 Documentation

- **[Tokenomics](./docs/TOKENOMICS.md)** - Complete token economics breakdown
- **[Referral System](./docs/REFERRAL_SYSTEM.md)** - Affiliate program detailed guide
- **[Architecture](./docs/ARCHITECTURE.md)** - Smart contract technical architecture
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Step-by-step deployment instructions

## 🔒 Security

- Internal code review completed
- Smart contract audit planned
- Bug bounty program available
- Rate limiting & circuit breakers
- Multi-signature admin controls
- Emergency pause mechanism

## 📋 Deployment Checklist

- [ ] All tests passing (95%+ coverage)
- [ ] Code audit completed
- [ ] Security review approved
- [ ] Testnet deployment successful
- [ ] Mainnet configuration verified
- [ ] Liquidity pools created
- [ ] Community notified
- [ ] Support team trained

## 🤝 Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](./CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Submit Pull Request

## ⚠️ Security Vulnerabilities

For security concerns, please email: **security@afriyield.com**

Do not open public issues for security vulnerabilities.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 💬 Support & Community

- **Discord**: [Join Community](#)
- **Telegram**: [Join Channel](#)
- **Twitter**: [@AFriYield](#)
- **Email**: support@afriyield.com
- **GitHub Issues**: [Report Bugs](#)

## 🎯 Roadmap

- **Q1 2024**: Contract development & testing
- **Q2 2024**: Security audit & testnet launch
- **Q3 2024**: Mainnet deployment & liquidity pools
- **Q4 2024**: Community marketing & expansion

---

**Built with ❤️ for African Communities**

*Disclaimer: AFriYield is a DeFi protocol and carries inherent risks. Users should conduct their own due diligence before participating. The development team is not responsible for losses resulting from smart contract bugs, market volatility, or user error.*
