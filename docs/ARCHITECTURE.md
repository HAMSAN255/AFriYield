# 🏗️ AFriYield Smart Contract Architecture

## System Overview

AFriYield consists of 5 interconnected smart contracts working together to provide a complete DeFi ecosystem:

```
┌─────────────────────────────────────────────┐
│         MainContract.sol                    │
│    (Orchestrator & Admin Functions)         │
└────────────┬────────────────────────────────┘
             │
    ┌────────┼────────┬─────────────┬──────────┐
    │        │        │             │          │
    ▼        ▼        ▼             ▼          ▼
┌─────┐ ┌────────┐ ┌──────┐ ┌──────────┐ ┌──────────┐
│ AFY │ │Staking │ │Yield │ │Affiliate │ │Treasury  │
│Token│ │Contract│ │Farming│ │Contract  │ │Manager   │
└─────┘ └────────┘ └──────┘ └──────────┘ └──────────┘
  ERC20   Rewards  LP Pools  Commission   Revenue
           Pool    Manager     System     Distribution
```

## Contract Specifications

### 1. AFYToken.sol - ERC20 Token

**Purpose**: Standard ERC20 token implementation

**Specifications**:
- Total Supply: 100,000,000 AFY
- Decimals: 18
- Standard: ERC20 (OpenZeppelin)
- Features: Burnable, Pausable, Mintable
- Owner: Multi-sig admin wallet

**Key Functions**:
```solidity
function transfer(address recipient, uint256 amount) public returns (bool)
function approve(address spender, uint256 amount) public returns (bool)
function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)
function burn(uint256 amount) public
function pause() public onlyAdmin
function unpause() public onlyAdmin
function mint(address to, uint256 amount) public onlyAdmin
```

**Events**:
- Transfer(from, to, value)
- Approval(owner, spender, value)
- Burn(account, amount)

---

### 2. StakingContract.sol - Staking & Rewards

**Purpose**: Handle staking and daily reward distribution

**Configuration**:
```
Minimum Stake: 100 AFY
Maximum Stake: 10,000,000 AFY
Withdrawal Period: 7 days
Reward Distribution: Daily (auto-compounding optional)
```

**Tier System**:
| Tier | Amount Staked | Daily Return |
|------|--------------|--------------|
| 1 | 0 - 1,000 AFY | 0.5% |
| 2 | 1,001 - 10,000 AFY | 1.0% |
| 3 | 10,001+ AFY | 2.0% |

**Data Structure**:
```solidity
struct StakeInfo {
    uint256 stakedAmount;
    uint256 startTime;
    uint256 lastClaimTime;
    uint256 totalRewardsClaimed;
    bool autoCompound;
    uint256 tier;
}
```

**Key Functions**:
```solidity
function stake(uint256 amount, bool _autoCompound) external
function unstake(uint256 amount) external
function claimRewards() external returns (uint256)
function getStakeInfo(address user) external view returns (StakeInfo)
function calculateReward(address user) external view returns (uint256)
function getTierRate(uint256 amount) external pure returns (uint256)
function emergencyWithdraw() external
```

---

### 3. YieldFarmingContract.sol - Liquidity Pools

**Purpose**: Manage liquidity pools and yield farming

**Pools**:
```
Pool 1: AFY/BNB
  - Initial Liquidity: 12,500,000 AFY
  - Target APY: 150-300%
  - Duration: 24 months

Pool 2: AFY/BUSD
  - Initial Liquidity: 12,500,000 AFY
  - Target APY: 150-300%
  - Duration: 24 months
```

**Data Structure**:
```solidity
struct PoolInfo {
    address tokenA;
    address tokenB;
    uint256 totalLiquidity;
    uint256 rewardRate;
    uint256 lastRewardBlock;
    uint256 accRewardPerShare;
    bool active;
}

struct UserPoolInfo {
    uint256 lpAmount;
    uint256 lpDeposited;
    uint256 rewardDebt;
}
```

**Key Functions**:
```solidity
function addLiquidity(uint256 poolId, uint256 amountA, uint256 amountB) external
function removeLiquidity(uint256 poolId, uint256 lpAmount) external
function claimFarmingRewards(uint256 poolId) external returns (uint256)
function getPoolInfo(uint256 poolId) external view returns (PoolInfo)
function getPoolAPY(uint256 poolId) external view returns (uint256)
function emergencyWithdraw(uint256 poolId) external
```

---

### 4. AffiliateContract.sol - Referral System

**Purpose**: Manage 6-level referral system and commission distribution

**Commission Rates**:
```
Level 1: 15%
Level 2: 8%
Level 3: 4%
Level 4: 1%
Level 5: 1%
Level 6: 1%
Total: 30%
```

**Data Structure**:
```solidity
struct ReferralInfo {
    address referrer;
    uint256 referralTime;
    uint256 totalStaked;
    uint256 totalCommissionEarned;
    bool isActive;
}

struct CommissionRecord {
    uint256 level;
    uint256 amount;
    uint256 timestamp;
    address fromUser;
}
```

**Key Functions**:
```solidity
function setReferrer(address referrer) external
function recordStakingActivity(uint256 amount) external
function calculateCommissions(uint256 reward) external returns (uint256[6] memory)
function distributeCommissions(address user, uint256 totalReward) external
function claimCommission() external returns (uint256)
function getReferralTree(address user) external view returns (address[] memory)
function getCommissionStats(address user) external view returns (CommissionRecord[] memory)
```

---

### 5. MainContract.sol - Master Orchestrator

**Purpose**: Coordinate all contracts and manage protocol parameters

**Key Features**:
- Single entry point for users
- Manages all modules
- Admin functions
- Emergency controls
- Protocol fee management

**Data Structure**:
```solidity
struct ProtocolConfig {
    uint256 stakingReserve;
    uint256 yieldFarmingReserve;
    uint256 affiliateReserve;
    uint256 protocolFeePercentage;
    bool paused;
    bool emergencyMode;
}
```

**Key Functions**:
```solidity
function stake(uint256 amount) external
function unstake(uint256 amount) external
function claimAllRewards() external
function addLiquidityPool(address tokenA, address tokenB) external onlyAdmin
function pauseProtocol() external onlyAdmin
function unpauseProtocol() external onlyAdmin
function withdrawFromTreasury(uint256 amount) external onlyTreasurer
function updateTierRates(uint256 rate1, uint256 rate2, uint256 rate3) external onlyAdmin
```

---

## Contract Interaction Flow

### User Staking Flow

```
1. User calls MainContract.stake(1000 AFY)
   ↓
2. MainContract.approve() to StakingContract
   ↓
3. MainContract transfers tokens from user to StakingContract
   ↓
4. StakingContract records stake
   - Calculates tier rate
   - Starts reward timer
   - Records start time
   ↓
5. If referral exists:
   - AffiliateContract records activity
   - Commission calculated across 6 levels
   - Commissions queued for distribution
   ↓
6. Daily: Automatic reward calculation
   - User's daily reward calculated (0.5-2%)
   - Added to claimable balance
   ↓
7. User calls claimRewards() or auto-compounds
   ↓
8. After 7-day cooling period: Can unstake
```

### Commission Distribution Flow

```
1. User stakes 1,000 AFY at Tier 1 (0.5% daily)
   ↓
2. Daily Staking Reward: 1,000 × 0.5% = 5 AFY
   ↓
3. AffiliateContract calculates commissions:
   - Level 1 referrer: 5 × 15% = 0.75 AFY
   - Level 2 referrer: 5 × 8% = 0.40 AFY
   - Level 3 referrer: 5 × 4% = 0.20 AFY
   - Level 4 referrer: 5 × 1% = 0.05 AFY
   - Level 5 referrer: 5 × 1% = 0.05 AFY
   - Level 6 referrer: 5 × 1% = 0.05 AFY
   ↓
4. Total distributed: 1.50 AFY (30%)
   Staker keeps: 3.50 AFY (70%)
   ↓
5. Commissions added to referrers' claimable balance
   ↓
6. Referrers call claimCommission() for payout
   ↓
7. 5% protocol fee deducted
   ↓
8. Tokens sent to referrer wallets
```

---

## Security Architecture

### Access Control

**Roles**:
- `OWNER`: Full system control
- `ADMIN`: Configuration & parameters
- `TREASURER`: Revenue management
- `EMERGENCY_ADMIN`: Pause/unpause only

**Implementation**: OpenZeppelin AccessControl

### Security Measures

1. **Reentrancy Guards**: Prevents reentrancy attacks
2. **Safe Math**: Overflow/underflow protection
3. **Rate Limiting**: Prevents abuse
4. **Emergency Pause**: Stop all functions if needed
5. **Multi-sig Control**: Critical operations require multi-sig
6. **Audit Trail**: All major events logged

---

## Gas Optimization

### Optimization Techniques

1. **Batching**: Multiple operations in single transaction
2. **Caching**: Store frequently accessed data
3. **Events**: Use for off-chain tracking
4. **View Functions**: No state changes
5. **Uint Packing**: Smaller types when possible

### Estimated Gas Costs (BSC)

| Operation | Gas Cost |
|-----------|----------|
| Stake (100 AFY) | 150,000 - 200,000 |
| Unstake | 100,000 - 150,000 |
| Claim Rewards | 80,000 - 120,000 |
| Claim Commission | 100,000 - 150,000 |
| Add Liquidity | 200,000 - 300,000 |

---

## Testing Strategy

### Test Coverage

- **Unit Tests**: 95%+ coverage
- **Integration Tests**: All interactions
- **Security Tests**: Common vulnerabilities
- **Load Tests**: Gas optimization
- **Scenario Tests**: Real-world usage

### Testing Framework

- Hardhat + Ethers.js
- Chai assertions
- Waffle fixtures

---

## Deployment Architecture

### Network: Binance Smart Chain

**Mainnet**:
- Chain ID: 56
- RPC: https://bsc-dataseed.binance.org/
- Explorer: https://bscscan.com/
- Gas Token: BNB
- Block Time: ~3 seconds

**Testnet**:
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-1.binance.org:8545/
- Explorer: https://testnet.bscscan.com/

---

## Contract Upgrade Strategy

### Proxy Pattern

Using transparent proxy pattern for future upgrades:
- Implementation contract (logic)
- Proxy contract (storage)
- ProxyAdmin (upgrade control)

### Upgrade Process

1. Deploy new implementation
2. Multi-sig approval
3. Update proxy to new implementation
4. Maintain backward compatibility

---

## Conclusion

AFriYield's architecture is designed to be:

✅ **Modular**: Independent, composable contracts
✅ **Secure**: Multiple layers of protection
✅ **Efficient**: Optimized for gas costs
✅ **Scalable**: Support for network growth
✅ **Auditable**: Clear, well-documented code

For deployment details, see [Deployment Guide](./DEPLOYMENT.md)
