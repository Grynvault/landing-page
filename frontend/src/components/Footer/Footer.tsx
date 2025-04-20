import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[8]} ${theme.space[4]}`};
  background-color: ${({ theme }) => theme.colors.darkBackground};
  color: white;
`;

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.sizes['4xl']};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.colors.primary};
`;

const LinksContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[8]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  flex-wrap: wrap;
  justify-content: center;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 160px;
`;

const LinkTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.primary};
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const BottomBar = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.space[6]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Copyright = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.6);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
`;

const LegalLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>Grynvault</Logo>
        
        <LinksContainer>
          <LinkColumn>
            <LinkTitle>Company</LinkTitle>
            <LinkList>
              <LinkItem><Link href="#">About</Link></LinkItem>
              <LinkItem><Link href="#">Team</Link></LinkItem>
              <LinkItem><Link href="#">Careers</Link></LinkItem>
              <LinkItem><Link href="#">Blog</Link></LinkItem>
            </LinkList>
          </LinkColumn>
          
          <LinkColumn>
            <LinkTitle>Products</LinkTitle>
            <LinkList>
              <LinkItem><Link href="#configurator">Bitcoin Loans</Link></LinkItem>
              <LinkItem><Link href="#white-glove">White-Glove Service</Link></LinkItem>
              <LinkItem><Link href="#orderbook">Orderbook</Link></LinkItem>
              <LinkItem><Link href="#">Wealth Management</Link></LinkItem>
            </LinkList>
          </LinkColumn>
          
          <LinkColumn>
            <LinkTitle>Resources</LinkTitle>
            <LinkList>
              <LinkItem><Link href="#">Documentation</Link></LinkItem>
              <LinkItem><Link href="#">API</Link></LinkItem>
              <LinkItem><Link href="#">Help Center</Link></LinkItem>
              <LinkItem><Link href="#">Community</Link></LinkItem>
            </LinkList>
          </LinkColumn>
          
          <LinkColumn>
            <LinkTitle>Contact</LinkTitle>
            <LinkList>
              <LinkItem><Link href="mailto:support@grynvault.com">support@grynvault.com</Link></LinkItem>
              <LinkItem><Link href="#">+1 (555) 123-4567</Link></LinkItem>
              <LinkItem><Link href="#">Twitter</Link></LinkItem>
              <LinkItem><Link href="#">Discord</Link></LinkItem>
            </LinkList>
          </LinkColumn>
        </LinksContainer>
        
        <BottomBar>
          <Copyright>© {currentYear} Grynvault. All rights reserved.</Copyright>
          
          <LegalLinks>
            <LegalLink href="#">Terms of Service</LegalLink>
            <LegalLink href="#">Privacy Policy</LegalLink>
            <LegalLink href="#">Cookie Policy</LegalLink>
            <LegalLink href="#">Disclosures</LegalLink>
          </LegalLinks>
        </BottomBar>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;