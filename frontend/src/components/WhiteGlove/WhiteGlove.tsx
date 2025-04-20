import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WhiteGloveContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[16]} ${theme.space[4]}`};
  background-color: ${({ theme }) => theme.colors.darkBackground};
  color: white;
`;

const WhiteGloveContent = styled.div`
  max-width: ${({ theme }) => theme.sizes['4xl']};
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space[6]};
  color: white;
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[12]};
  max-width: ${({ theme }) => theme.sizes['2xl']};
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.space[8]};
  margin-bottom: ${({ theme }) => theme.space[12]};
`;

const FeatureCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[8]};
  text-align: left;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.9;
  margin-bottom: 0;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[8]}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const WhiteGlove: React.FC = () => {
  const featureVariants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
      }
    }
  };
  
  return (
    <WhiteGloveContainer id="white-glove">
      <WhiteGloveContent>
        <SectionTitle>White-Glove Cross-Collateral Service</SectionTitle>
        <SectionSubtitle>
          Premium long-term Bitcoin-backed loans with zero liquidation risk
        </SectionSubtitle>
        
        <FeaturesGrid>
          <FeatureCard
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
          >
            <FeatureTitle>Real-World Asset Backing</FeatureTitle>
            <FeatureDescription>
              Combine your Bitcoin with select real-world assets as collateral to access 
              long-term financing without margin calls or liquidation risk.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
          >
            <FeatureTitle>Zero Liquidation Risk</FeatureTitle>
            <FeatureDescription>
              Our cross-collateralization model ensures your Bitcoin is secure regardless 
              of market fluctuations, giving you peace of mind during volatile periods.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
          >
            <FeatureTitle>Extended Terms</FeatureTitle>
            <FeatureDescription>
              Access multi-year financing with flexible repayment schedules tailored to your 
              specific needs, without the constraints of traditional crypto loans.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
          >
            <FeatureTitle>Compliant Structure</FeatureTitle>
            <FeatureDescription>
              Transparent and fully compliant loan structures with interest rates capped at 10% APR, 
              meeting regulatory requirements across most US states.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
          >
            <FeatureTitle>Personalized Service</FeatureTitle>
            <FeatureDescription>
              Work directly with our team of experts who will guide you through the entire process 
              from asset evaluation to final loan disbursement.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
          >
            <FeatureTitle>Seamless Experience</FeatureTitle>
            <FeatureDescription>
              Grynvault applies a markup on the real-world asset's purchase price, holding 
              Bitcoin solely as collateral to ensure a seamless process with no liquidation risk.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
        
        <CTAButton 
          href="#configurator"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Configure White-Glove Loan
        </CTAButton>
      </WhiteGloveContent>
    </WhiteGloveContainer>
  );
};

export default WhiteGlove;