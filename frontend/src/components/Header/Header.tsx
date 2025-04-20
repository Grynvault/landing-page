import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  width: 100%;
  height: 70px;
  padding: ${({ theme }) => `0 ${theme.space[4]}`};
  background-color: ${({ scrolled, theme }) => 
    scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(8px)' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  box-shadow: ${({ scrolled, theme }) => 
    scrolled ? theme.shadows.sm : 'none'};
`;

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.sizes['6xl']};
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a<{ scrolled: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ scrolled, theme }) => 
    scrolled ? theme.colors.primary : 'white'};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    text-decoration: none;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a<{ scrolled: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ scrolled, theme }) => 
    scrolled ? theme.colors.text : 'white'};
  margin-left: ${({ theme }) => theme.space[6]};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

interface ButtonProps {
  scrolled: boolean;
  primary?: boolean;
}

const Button = styled(motion.a)<ButtonProps>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[5]}`};
  margin-left: ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  background-color: ${({ scrolled, primary, theme }) => {
    if (primary && scrolled) return theme.colors.primary;
    if (primary && !scrolled) return 'white';
    if (!primary && scrolled) return 'transparent';
    return 'transparent';
  }};
  
  color: ${({ scrolled, primary, theme }) => {
    if (primary && scrolled) return 'white';
    if (primary && !scrolled) return theme.colors.primary;
    if (!primary && scrolled) return theme.colors.text;
    return 'white';
  }};
  
  border: 1px solid ${({ scrolled, primary, theme }) => {
    if (primary && scrolled) return theme.colors.primary;
    if (primary && !scrolled) return 'white';
    if (!primary && scrolled) return theme.colors.borderColor;
    return 'white';
  }};
  
  &:hover {
    transform: translateY(-2px);
    text-decoration: none;
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const MenuButton = styled.button<{ scrolled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
  display: none;
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: ${({ scrolled, theme }) => 
      scrolled ? theme.colors.text : 'white'};
    border-radius: ${({ theme }) => theme.radii.full};
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: ${({ theme }) => theme.transitions.easeInOut};
    
    &:nth-child(1) {
      top: 6px;
    }
    
    &:nth-child(2), &:nth-child(3) {
      top: 15px;
    }
    
    &:nth-child(4) {
      top: 24px;
    }
  }
  
  &.open {
    span {
      &:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
      
      &:nth-child(2) {
        transform: rotate(45deg);
      }
      
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
      
      &:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
      }
    }
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
`;

const MobileNavLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: white;
  margin: ${({ theme }) => theme.space[4]} 0;
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.easeInOut};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo scrolled={scrolled} href="#">Grynvault</Logo>
        
        <NavContainer>
          <NavLink scrolled={scrolled} href="#vision">About</NavLink>
          <NavLink scrolled={scrolled} href="#configurator">Loans</NavLink>
          <NavLink scrolled={scrolled} href="#white-glove">White-Glove</NavLink>
          <NavLink scrolled={scrolled} href="#orderbook">Orderbook</NavLink>
          <Button 
            scrolled={scrolled} 
            href="#configurator"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </Button>
          <Button 
            scrolled={scrolled} 
            primary
            href="#configurator"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </Button>
        </NavContainer>
        
        <MenuButton 
          scrolled={scrolled} 
          className={mobileMenuOpen ? 'open' : ''} 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
      </HeaderContent>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLink href="#vision" onClick={closeMobileMenu}>About</MobileNavLink>
        <MobileNavLink href="#configurator" onClick={closeMobileMenu}>Loans</MobileNavLink>
        <MobileNavLink href="#white-glove" onClick={closeMobileMenu}>White-Glove</MobileNavLink>
        <MobileNavLink href="#orderbook" onClick={closeMobileMenu}>Orderbook</MobileNavLink>
        <MobileNavLink href="#configurator" onClick={closeMobileMenu}>Sign In</MobileNavLink>
        <Button 
          scrolled={false} 
          primary
          href="#configurator"
          onClick={closeMobileMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: '20px' }}
        >
          Get Started
        </Button>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;