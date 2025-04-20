import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CompetitorRedirect from '../Competitor/CompetitorRedirect';

const ConfiguratorContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[16]} ${theme.space[4]}`};
  background-color: ${({ theme }) => theme.colors.cardBg};
`;

const ConfiguratorContent = styled.div`
  max-width: ${({ theme }) => theme.sizes['4xl']};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space[8]};
  text-align: center;
`;

const FormContainer = styled(motion.div)`
  background-color: white;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.space[8]};
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const SectionHeading = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding-bottom: ${({ theme }) => theme.space[2]};
`;

// These styled components are defined but not currently used.
// Keeping them in case they're needed for future feature expansion:
/*
const OptionGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

interface OptionCardProps {
  selected?: boolean;
}

const OptionCard = styled(motion.div)<OptionCardProps>`
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.borderColor};
  background-color: ${({ theme, selected }) => selected ? `rgba(247, 147, 26, 0.1)` : 'white'};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.easeInOut};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const OptionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text};
`;
*/

const OptionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: 0;
`;

const SliderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const SliderTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const SliderValue = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.borderColor};
  outline: none;
  transition: ${({ theme }) => theme.transitions.easeInOut};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.easeInOut};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.easeInOut};
  }

  &:hover {
    &::-webkit-slider-thumb {
      transform: scale(1.2);
    }
    
    &::-moz-range-thumb {
      transform: scale(1.2);
    }
  }
`;

const PreviewContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBackground};
  color: white;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[8]};
`;

const PreviewTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: white;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.space[4]};
`;

const PreviewItem = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const PreviewLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const PreviewValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const SubmitButton = styled(motion.button)`
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[8]}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  width: 100%;
  margin-top: ${({ theme }) => theme.space[8]};
  transition: ${({ theme }) => theme.transitions.easeInOut};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const VaultPointsHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FormField = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(247, 147, 26, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(247, 147, 26, 0.2);
  }
`;

const RadioContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const RadioInput = styled.input`
  cursor: pointer;
  
  &:checked {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RadioLabel = styled.label`
  cursor: pointer;
`;

const Configurator: React.FC = () => {
  // State for form values
  const [custody, setCustody] = useState<'self' | 'third-party'>('self');
  const [kyc, setKyc] = useState<'required' | 'not-required'>('not-required');
  const [ltv, setLtv] = useState<number>(60);
  const [termDays, setTermDays] = useState<number>(90);
  const [liquidationRisk, setLiquidationRisk] = useState<'yes' | 'no'>('yes');
  const [btcChain, setBtcChain] = useState<'L1' | 'bridged'>('L1');
  const [walletType, setWalletType] = useState<string>('own wallet');
  const [currency, setCurrency] = useState<string>('USDC');
  const [loanAmount, setLoanAmount] = useState<string>('50000');
  const [email, setEmail] = useState<string>('');
  const [userRate, setUserRate] = useState<number>(7);
  
  // Computed values
  const estimatedMatchTime = (): string => {
    let baseTime = 7; // days
    
    // Adjust based on LTV
    if (ltv <= 50) baseTime -= 2;
    else if (ltv >= 70) baseTime += 3;
    
    // Adjust based on custody
    if (custody === 'self') baseTime += 1;
    
    // Adjust based on liquidation risk
    if (liquidationRisk === 'no') baseTime += 4;
    
    // Adjust based on user rate
    baseTime -= (userRate - 7) * 0.5;
    
    baseTime = Math.max(1, Math.min(baseTime, 21));
    
    if (baseTime <= 3) return 'Fast (1-3 days)';
    if (baseTime <= 7) return 'Average (4-7 days)';
    if (baseTime <= 14) return 'Slow (8-14 days)';
    return 'Very Slow (15+ days)';
  };
  
  const vaultPoints = (): number => {
    let points = 100;
    
    // More points for conservative LTV
    points += (70 - ltv);
    
    // More points for longer terms
    points += termDays / 30 * 10;
    
    // More points for accepting KYC
    if (kyc === 'required') points += 50;
    
    // More points for accepting liquidation risk
    if (liquidationRisk === 'yes') points += 30;
    
    return Math.round(points);
  };
  
  const calculatedAPR = (): number => {
    // Base rate adjusted by user preference
    return userRate;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would submit the data to the backend
    alert('Your loan configuration has been submitted! You will be notified when a match is found.');
    
    // Here we would normally reset the form or navigate to a confirmation page
  };
  
  // Render either a competitor redirect or full configurator based on app rules
  const shouldShowCompetitorRedirect = (): boolean => {
    // Per PRD: Redirect to competitors if rate is above 10% APR
    return userRate > 10;
  };
  
  return (
    <ConfiguratorContainer id="configurator">
      <ConfiguratorContent>
        <SectionTitle>Configure Your Bitcoin-Backed Loan</SectionTitle>
        
        <FormContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionHeading>Loan Amount & Contact</SectionHeading>
              <FormRow>
                <FormField>
                  <Label htmlFor="loanAmount">Desired Loan Amount (USD)</Label>
                  <Input 
                    id="loanAmount" 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(e.target.value)}
                    min="5000"
                    required
                  />
                </FormField>
                
                <FormField>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="We'll notify you when matched"
                    required
                  />
                </FormField>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <SectionHeading>Custody & Regulatory Preferences</SectionHeading>
              
              <Label>Custody Preference</Label>
              <RadioContainer>
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="selfCustody" 
                    name="custody" 
                    checked={custody === 'self'} 
                    onChange={() => setCustody('self')}
                  />
                  <RadioLabel htmlFor="selfCustody">Self-Custody</RadioLabel>
                </RadioGroup>
                
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="thirdPartyCustody" 
                    name="custody" 
                    checked={custody === 'third-party'} 
                    onChange={() => setCustody('third-party')}
                  />
                  <RadioLabel htmlFor="thirdPartyCustody">Third-Party Custody</RadioLabel>
                </RadioGroup>
              </RadioContainer>
              
              <Label>KYC Requirements</Label>
              <RadioContainer>
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="kycRequired" 
                    name="kyc" 
                    checked={kyc === 'required'} 
                    onChange={() => setKyc('required')}
                  />
                  <RadioLabel htmlFor="kycRequired">KYC Acceptable</RadioLabel>
                </RadioGroup>
                
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="kycNotRequired" 
                    name="kyc" 
                    checked={kyc === 'not-required'} 
                    onChange={() => setKyc('not-required')}
                  />
                  <RadioLabel htmlFor="kycNotRequired">No KYC Preferred</RadioLabel>
                </RadioGroup>
              </RadioContainer>
            </FormSection>
            
            <FormSection>
              <SectionHeading>Loan Parameters</SectionHeading>
              
              <SliderContainer>
                <SliderLabel>
                  <SliderTitle>Loan-to-Value (LTV) Ratio</SliderTitle>
                  <SliderValue>{ltv}%</SliderValue>
                </SliderLabel>
                <StyledSlider 
                  type="range" 
                  min="30" 
                  max="80" 
                  value={ltv} 
                  onChange={(e) => setLtv(parseInt(e.target.value))}
                />
                <OptionDescription>Higher LTV means more liquidity but increased risk</OptionDescription>
              </SliderContainer>
              
              <FormRow>
                <FormField>
                  <Label htmlFor="termDays">Loan Term</Label>
                  <Select 
                    id="termDays" 
                    value={termDays} 
                    onChange={(e) => setTermDays(parseInt(e.target.value))}
                  >
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">180 Days</option>
                    <option value="365">365 Days</option>
                  </Select>
                </FormField>
                
                <FormField>
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Select 
                    id="currency" 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                    <option value="DAI">DAI</option>
                    <option value="EUR">EUR</option>
                  </Select>
                </FormField>
              </FormRow>
              
              <Label>Liquidation Risk</Label>
              <RadioContainer>
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="liquidationYes" 
                    name="liquidation" 
                    checked={liquidationRisk === 'yes'} 
                    onChange={() => setLiquidationRisk('yes')}
                  />
                  <RadioLabel htmlFor="liquidationYes">Accept Liquidation Risk</RadioLabel>
                </RadioGroup>
                
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="liquidationNo" 
                    name="liquidation" 
                    checked={liquidationRisk === 'no'} 
                    onChange={() => setLiquidationRisk('no')}
                  />
                  <RadioLabel htmlFor="liquidationNo">No Liquidation (Cross-Collateral)</RadioLabel>
                </RadioGroup>
              </RadioContainer>
              
              {liquidationRisk === 'no' && (
                <OptionDescription>
                  No-liquidation requires white-glove service with additional real-world assets as collateral.
                  Our team will contact you to discuss options.
                </OptionDescription>
              )}
            </FormSection>
            
            <FormSection>
              <SectionHeading>Technical Preferences</SectionHeading>
              
              <Label>Bitcoin Chain</Label>
              <RadioContainer>
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="l1btc" 
                    name="btcChain" 
                    checked={btcChain === 'L1'} 
                    onChange={() => setBtcChain('L1')}
                  />
                  <RadioLabel htmlFor="l1btc">L1 Bitcoin</RadioLabel>
                </RadioGroup>
                
                <RadioGroup>
                  <RadioInput 
                    type="radio" 
                    id="bridgedBtc" 
                    name="btcChain" 
                    checked={btcChain === 'bridged'} 
                    onChange={() => setBtcChain('bridged')}
                  />
                  <RadioLabel htmlFor="bridgedBtc">Bridged BTC (WBTC, renBTC, etc.)</RadioLabel>
                </RadioGroup>
              </RadioContainer>
              
              <FormField>
                <Label htmlFor="walletType">Wallet Type</Label>
                <Select 
                  id="walletType" 
                  value={walletType} 
                  onChange={(e) => setWalletType(e.target.value)}
                >
                  <option value="own wallet">Own Wallet</option>
                  <option value="browser wallet">Browser Wallet</option>
                  <option value="multisig">Multisig</option>
                  <option value="custodial">Custodial</option>
                </Select>
              </FormField>
            </FormSection>
            
            <FormSection>
              <SectionHeading>Interest Rate & Matching Speed</SectionHeading>
              <OptionDescription>
                Adjust your offered interest rate to change matching speed.
                Higher rates get matched faster.
              </OptionDescription>
              
              <SliderContainer>
                <SliderLabel>
                  <SliderTitle>Offered Interest Rate (APR)</SliderTitle>
                  <SliderValue>{userRate}%</SliderValue>
                </SliderLabel>
                <StyledSlider 
                  type="range" 
                  min="4" 
                  max="15" 
                  step="0.5"
                  value={userRate} 
                  onChange={(e) => setUserRate(parseFloat(e.target.value))}
                />
              </SliderContainer>
            </FormSection>
            
            {shouldShowCompetitorRedirect() ? (
              <CompetitorRedirect 
                preferences={{
                  custody: custody === 'self' ? false : true,
                  kyc: kyc === 'required',
                  minLTV: ltv,
                  termDays: termDays,
                  noLiquidation: liquidationRisk === 'no',
                  l1BTC: btcChain === 'L1',
                  walletType: walletType,
                  currency: currency
                }}
              />
            ) : (
              <>
                <PreviewContainer>
                  <PreviewTitle>Your Loan Summary</PreviewTitle>
                  <PreviewGrid>
                    <PreviewItem>
                      <PreviewLabel>Amount</PreviewLabel>
                      <PreviewValue>${parseInt(loanAmount).toLocaleString()}</PreviewValue>
                    </PreviewItem>
                    
                    <PreviewItem>
                      <PreviewLabel>LTV Ratio</PreviewLabel>
                      <PreviewValue>{ltv}%</PreviewValue>
                    </PreviewItem>
                    
                    <PreviewItem>
                      <PreviewLabel>Term Length</PreviewLabel>
                      <PreviewValue>{termDays} Days</PreviewValue>
                    </PreviewItem>
                    
                    <PreviewItem>
                      <PreviewLabel>Currency</PreviewLabel>
                      <PreviewValue>{currency}</PreviewValue>
                    </PreviewItem>
                    
                    <PreviewItem>
                      <PreviewLabel>Estimated APR</PreviewLabel>
                      <PreviewValue>{calculatedAPR()}%</PreviewValue>
                    </PreviewItem>
                    
                    <PreviewItem>
                      <PreviewLabel>Matching Speed</PreviewLabel>
                      <PreviewValue>{estimatedMatchTime()}</PreviewValue>
                    </PreviewItem>
                    
                    <PreviewItem>
                      <PreviewLabel>VaultPoints</PreviewLabel>
                      <PreviewValue>
                        <VaultPointsHighlight>+{vaultPoints()}</VaultPointsHighlight>
                      </PreviewValue>
                    </PreviewItem>
                  </PreviewGrid>
                </PreviewContainer>
                
                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Loan Request
                </SubmitButton>
              </>
            )}
          </form>
        </FormContainer>
      </ConfiguratorContent>
    </ConfiguratorContainer>
  );
};

export default Configurator;