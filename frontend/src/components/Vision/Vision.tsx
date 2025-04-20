import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const VisionContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[16]} ${theme.space[4]}`};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const VisionContent = styled.div`
  max-width: ${({ theme }) => theme.sizes['4xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space[8]};
  color: ${({ theme }) => theme.colors.text};
`;

const Box = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[8]};
  margin-bottom: ${({ theme }) => theme.space[10]};
  width: 100%;
`;

const BoxTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['xl']};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const BoxContent = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.tall};
  margin-bottom: 0;
`;

const ValuesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[4]};
`;

const ValueTag = styled(motion.span)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Vision: React.FC = () => {
  const boxVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        bounce: 0.4, 
        duration: 0.8 
      } 
    }
  };

  const valueVariants = {
    offscreen: { scale: 0.8, opacity: 0 },
    onscreen: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5 
      }
    })
  };

  const values = [
    "Compassion", 
    "Courage", 
    "Curiosity", 
    "Transparency", 
    "Financial Sovereignty"
  ];

  return (
    <VisionContainer id="vision">
      <VisionContent>
        <SectionTitle>Our Vision, Mission & Values</SectionTitle>
        
        <Box
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={boxVariants}
        >
          <BoxTitle>Vision</BoxTitle>
          <BoxContent>
            "On a Bitcoin Standard, everyone can self-bank with transparent, trustless credit."
          </BoxContent>
        </Box>
        
        <Box
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={boxVariants}
        >
          <BoxTitle>Mission</BoxTitle>
          <BoxContent>
            "Empower Bitcoiners and asset holders with compliant, self-custodial 
            lending solutions that prioritize sovereignty and transparency."
          </BoxContent>
        </Box>
        
        <Box
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={boxVariants}
        >
          <BoxTitle>Values</BoxTitle>
          <ValuesList>
            {values.map((value, index) => (
              <ValueTag
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={valueVariants}
              >
                {value}
              </ValueTag>
            ))}
          </ValuesList>
        </Box>
      </VisionContent>
    </VisionContainer>
  );
};

export default Vision;