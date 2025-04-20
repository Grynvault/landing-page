# PRD: Grynvault Interactive Landing Page

## 1. Overview
A dynamic, single‑page React application that:
- Educates visitors on Grynvault’s unique Bitcoin‑backed lending model.
- Captures term preferences via an intuitive configurator.
- Displays a transparent, live marketplace of demand and supply.

**Scope:** This PRD covers the public‑facing landing page, term configurator, live orderbook, competitor redirects, and white‑glove financing features.

### 1.1 Vision, Mission & Values
**Purpose:** Instill immediate clarity on Grynvault’s guiding principles and ethos.  
**Content:**  
- **Vision:** “On a Bitcoin Standard, everyone can self‑bank with transparent, trustless credit.”  
- **Mission:** “Empower Bitcoiners and asset holders with compliant, self‑custodial lending solutions that prioritize sovereignty and transparency.”  
- **Values:** Compassion • Courage • Curiosity • Transparency • Financial Sovereignty  
**Placement:** Directly below the Hero section and above the Configurator.  
**User Stories:**  
- As a first‑time visitor, I immediately understand Grynvault’s purpose and values before configuring a loan.  
**Metrics:** Engagement rate (time on section), scroll completion to configurator.

## 2. Goals & Objectives
- **Acquire early adopters** by guiding visitors to configure and sign up for loans.  
- **Engage potential lenders** by letting them express yield‑seeking preferences.  
- **Demonstrate transparency** via real‑time orderbook of open requests and committed funds.  
- **Offer long‑term white‑glove financing with cross-collateralized real-world assets to eliminate liquidation risk.**  
- **Ensure interest rates are capped at 10% APR to comply with most US state lending regulations without licensing requirements.**

## 3. Personas
- **Borrower Brad:** Needs quick BTC‑backed loans, cares about custody, KYC, LTV, and term flexibility.  
- **Lender Lara:** Wants to deploy capital on preferred terms, values yield transparency and controls risk.  
- **Explorer Eli:** Just learning about BTC credit, wants to see market depth and compare competitors.

## 4. Features

### 4.1 Landing Hero
**Purpose:** First impression; convey mission and live stats.  
**User Stories:**  
- As a visitor, I want to see total demand and supply so I trust Grynvault’s traction.  
- As a first‑timer, I want a clear CTA to start configuring or explore the orderbook.  
**Functional Requirements:**  
- Display real‑time counters: “$X demand | Y BTC supply.”  
- Two primary CTAs: Configure Loan / Earn Yield.  
**Acceptance Criteria:**  
- Counters update within 5 seconds of new data.  
- CTA buttons scroll or route to respective sections.  
**Metrics:** CTA click‑through rate, scroll‑to‑configurator rate.

### 4.2 Loan Configurator
**Purpose:** Let borrowers define desired terms and join waitlist.  
**User Stories:**  
- As Borrower Brad, I pick custody, KYC, currency, LTV, term, chain, and repayment style.  
- As a user, I see estimated matching speed and queue position.  
- As a borrower selecting interest-bearing rates above 10% APR, I’m informed that Grynvault will redirect me to partner platforms that can serve my terms immediately.  
- As a small-transaction borrower with no additional collateral, I want an upfront discounted Bitcoin “Sale Undertaking” option so I can secure funding quickly with built-in profit potential.  
**Functional Requirements:**  
- Form with dropdowns/toggles for each preference.  
- Dynamic preview: estimated interest rate, match time, and VaultPoints.  
- “Sweeten my offer” slider to adjust rate vs speed.  
- Submit saves signed JSON payload or email capture.  
**Acceptance Criteria:**  
- All form fields validate inputs.  
- Preview updates instantly on change.  
- Submission confirmation with summary modal.  
**Metrics:** Configurator completion rate, drop‑off points.

### 4.3 Live Orderbook
**Purpose:** Show transparency of active demands & supplies.  
**User Stories:**  
- As Explorer Eli, I filter orderbook by custody, KYC, LTV, chain.  
- As Lender Lara, I click on demand rows to express interest.  
**Functional Requirements:**  
- Tabular view of current requests and commitments.  
- Filters and sorting controls.  
- WebSockets/Socket.io for real‑time updates.  
- Clickable rows linking back to Configurator or lender flow.  
**Acceptance Criteria:**  
- Updates propagate within 2 seconds.  
- Filters apply without full‑page reload.  
**Metrics:** Filter usage, row click rate, time on orderbook.

### 4.4 Competitor Redirect Logic
**Purpose:** Provide immediate alternatives when Grynvault isn’t ready.  
**User Stories:**  
- As urgent user, I get tailored competitor suggestions based on my inputs.  
- As transparency‑seeker, I appreciate direct links to Xapo, Nexo, HodlHodl, etc.  
**Functional Requirements:**  
- Ruleset engine mapping input combos → competitor list.  
- UI component on Configurator and confirmation screens.  
- “Need it now?” section with competitor cards and links.  
**Acceptance Criteria:**  
- Suggestions update based on final config.  
- All competitor links open in new tabs.  
**Metrics:** Competitor link click rate, bounce reduction.

### 4.5 White‑Glove Cross‑Collateral Service
**Purpose:** Provide long-term financing secured by real-world assets, eliminating liquidation risk.  
**User Stories:**  
- As a high-net-worth user, I want to pledge real-world assets and set longer terms without margin calls.  
- As a white‑glove user, I expect Grynvault to apply a markup on the real‑world asset’s purchase price, holding Bitcoin solely as collateral to ensure no liquidation risk while keeping the process seamless.  
**Functional Requirements:**  
- Option in Configurator for “White‑Glove RWA Collateral.”  
- UI explanation of cross-collateral process.  
- Admin workflow to vet and approve RWA collateral types.  
**Acceptance Criteria:**  
- Selection shows collateral guidelines and no-liquidation guarantee.  
**Metrics:** Adoption rate of white-glove option, volume financed.

## 5. Non‑Functional Requirements
- **Performance:** <2 s initial load; <100 ms config interactions.  
- **Scalability:** Support 10k concurrent live users.  
- **Accessibility:** WCAG 2.1 AA compliance.  
- **Security:** Hardened against XSS/CSRF; signed payloads for config.

## 6. Dependencies
- Wallet integrations (Wagmi/Viem or custom PSBT).  
- Real‑time backend (Node.js + Socket.io).  
- Database (Postgres) for queue and orderbook.  
- Competitor ruleset datastore (JSON).

## 7. Timeline & Milestones
- **Week 1:** Style guide, component library, design mocks.  
- **Week 2:** Hero + CTAs + static Configurator.  
- **Week 3:** Live data integration + orderbook.  
- **Week 4:** Competitor redirect + QA + launch beta.

## 8. Analytics & Tracking
- **Tools:** Google Analytics, Segment, Hotjar.  
- **Metrics:** Unique visitors, funnel conversions, drop-off rates in configurator, orderbook interactions.

## 9. Legal & Compliance
- **Interest Cap:** 10% APR for US compliance.  
- **Disclosures:** Terms of Service, Privacy Policy links in footer.  
- **Data Protection:** GDPR and CCPA compliance for user data.

## 10. Admin & Maintenance
- **CMS for Competitor Ruleset:** Update mapping JSON via admin panel.  
- **Monitoring:** Logging for real-time API, health checks.  
- **Support:** In-app feedback widget, chat integration.

## 11. Next Steps
- **UI Mockups:** Create high-fidelity designs (Figma or Sketch) for:
  - Hero section and real-time counters
  - Vision/Mission block
  - Loan Configurator and competitor redirect component
  - Live Orderbook with filters
  - White‑Glove RWA collateral selector

- **GitHub Repo Setup:** Initialize a monorepo with:
  - `/frontend` (React + TypeScript) and `/backend` (Node + Express)
  - CI pipeline (`GitHub Actions`) for linting, testing, and deployment
  - `README.md` with project overview, setup instructions, and contribution guidelines
  - Branch protection rules and pull request templates
