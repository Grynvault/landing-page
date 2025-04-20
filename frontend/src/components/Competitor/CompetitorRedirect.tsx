import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CompetitorRedirectProps {
  preferences: {
    custody?: boolean;
    kyc?: boolean;
    minLTV?: number;
    termDays?: number;
    noLiquidation?: boolean;
    l1BTC?: boolean;
    walletType?: string;
    currency?: string;
  };
}

interface Competitor {
  id: string;
  name: string;
  url: string;
  features: {
    custody: boolean;
    nonCustody: boolean;
    kycRequired: boolean;
    maxLTV: number;
    minTermDays: number;
    maxTermDays: number;
    liquidationRisk: boolean;
    bridgedBTC: boolean;
    l1BTC: boolean;
    supportedWallets: string[];
    supportedCurrencies: string[];
    maxAPR: number;
  };
  tagline: string;
  logo?: string;
}

const RedirectContainer = styled.div`
  background-color: ${({ theme }) => `rgba(247, 147, 26, 0.1)`};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[8]};
`;

const RedirectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.primary};
`;

const RedirectDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const CompetitorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.space[4]};
`;

const CompetitorCard = styled(motion.a)`
  display: block;
  background-color: white;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[4]};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    text-decoration: none;
  }
`;

const CompetitorName = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.text};
`;

const CompetitorTagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space[2]};
`;

const Feature = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.lightText};
`;

const FeatureValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const APRBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space[2]};
  right: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
  border-radius: ${({ theme }) => theme.radii.full};
`;

const CardWrapper = styled.div`
  position: relative;
`;

const RedirectFooter = styled.div`
  margin-top: ${({ theme }) => theme.space[6]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space[8]};
  
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }) => theme.colors.borderColor};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const CompetitorRedirect: React.FC<CompetitorRedirectProps> = ({ preferences }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // In a real implementation, this would call the actual API
  // For now, we'll use a mock implementation that returns the top 3 competitors
  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, we would use the matchCompetitors endpoint
        // const response = await api.matchCompetitors(preferences);
        
        // Mock implementation
        // Normally we'd get this from the API, but for this demo we'll just hardcode some results
        const mockCompetitors: Competitor[] = [
          {
            id: "hodlhodl",
            name: "HodlHodl",
            url: "https://hodlhodl.com/",
            features: {
              custody: false,
              nonCustody: true,
              kycRequired: false,
              maxLTV: 50,
              minTermDays: 1,
              maxTermDays: 90,
              liquidationRisk: true,
              bridgedBTC: false,
              l1BTC: true,
              supportedWallets: ["own wallet"],
              supportedCurrencies: ["USD", "EUR", "GBP"],
              maxAPR: 18
            },
            tagline: "Global P2P Bitcoin lending platform"
          },
          {
            id: "nexo",
            name: "Nexo",
            url: "https://nexo.com/borrow",
            features: {
              custody: true,
              nonCustody: false,
              kycRequired: true,
              maxLTV: 50,
              minTermDays: 1,
              maxTermDays: 365,
              liquidationRisk: true,
              bridgedBTC: false,
              l1BTC: true,
              supportedWallets: ["custodial"],
              supportedCurrencies: ["USD", "EUR", "GBP", "USDC", "USDT"],
              maxAPR: 13.9
            },
            tagline: "Instant crypto credit lines"
          },
          {
            id: "sovryn",
            name: "Sovryn",
            url: "https://sovryn.com/",
            features: {
              custody: false,
              nonCustody: true,
              kycRequired: false,
              maxLTV: 50,
              minTermDays: 1,
              maxTermDays: 30,
              liquidationRisk: true,
              bridgedBTC: true,
              l1BTC: false,
              supportedWallets: ["metamask", "wallet connect"],
              supportedCurrencies: ["USDT", "USDC", "RBTC"],
              maxAPR: 16
            },
            tagline: "Bitcoin-native financial operating system"
          }
        ];
        
        setCompetitors(mockCompetitors);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching competitors:', err);
        setError('Failed to load competitors. Please try again.');
        setLoading(false);
      }
    };
    
    fetchCompetitors();
  }, [preferences]);
  
  const handleSubmitAnyway = () => {
    alert('Your loan request has been submitted to Grynvault. We\'ll notify you when we can accommodate your terms.');
  };
  
  if (loading) {
    return <Loader />;
  }
  
  if (error) {
    return <RedirectDescription>Error: {error}</RedirectDescription>;
  }
  
  return (
    <RedirectContainer>
      <RedirectTitle>Immediate Options Available</RedirectTitle>
      <RedirectDescription>
        Based on your preferred interest rate (above 10% APR), we can recommend the following 
        services that might meet your needs immediately. You can also submit your request to 
        Grynvault, and we'll notify you when we can accommodate your terms.
      </RedirectDescription>
      
      <CompetitorGrid>
        {competitors.map((competitor) => (
          <CardWrapper key={competitor.id}>
            <CompetitorCard 
              href={competitor.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <CompetitorName>{competitor.name}</CompetitorName>
              <CompetitorTagline>{competitor.tagline}</CompetitorTagline>
              
              <APRBadge>Up to {competitor.features.maxAPR}% APR</APRBadge>
              
              <FeatureGrid>
                <Feature>
                  Custody: <FeatureValue>{competitor.features.custody ? 'Third-party' : 'Self-custody'}</FeatureValue>
                </Feature>
                <Feature>
                  KYC: <FeatureValue>{competitor.features.kycRequired ? 'Required' : 'Not required'}</FeatureValue>
                </Feature>
                <Feature>
                  Max LTV: <FeatureValue>{competitor.features.maxLTV}%</FeatureValue>
                </Feature>
                <Feature>
                  Max Term: <FeatureValue>{competitor.features.maxTermDays} days</FeatureValue>
                </Feature>
                <Feature>
                  BTC Chain: <FeatureValue>{competitor.features.l1BTC ? 'L1' : 'Bridged'}</FeatureValue>
                </Feature>
                <Feature>
                  Liquidation: <FeatureValue>{competitor.features.liquidationRisk ? 'Yes' : 'No'}</FeatureValue>
                </Feature>
              </FeatureGrid>
            </CompetitorCard>
          </CardWrapper>
        ))}
      </CompetitorGrid>
      
      <SubmitButton
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmitAnyway}
      >
        Submit to Grynvault Anyway
      </SubmitButton>
      
      <RedirectFooter>
        We'll notify you when Grynvault can accommodate your preferred terms.
        Grynvault caps interest rates at 10% APR to comply with US lending regulations.
      </RedirectFooter>
    </RedirectContainer>
  );
};

export default CompetitorRedirect;