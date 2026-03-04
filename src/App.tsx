import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/about/Team'));
const Philosophy = lazy(() => import('./pages/about/Philosophy'));
const Services = lazy(() => import('./pages/Services'));
const MutualFunds = lazy(() => import('./pages/services/MutualFunds'));
const Insurance = lazy(() => import('./pages/services/Insurance'));
const Stocks = lazy(() => import('./pages/services/Stocks'));
const FinancialPlanning = lazy(() => import('./pages/services/FinancialPlanning'));
const Retirement = lazy(() => import('./pages/services/Retirement'));
const GoalBased = lazy(() => import('./pages/services/GoalBased'));
const Taxation = lazy(() => import('./pages/services/Taxation'));
const FixedDeposits = lazy(() => import('./pages/services/FixedDeposits'));
const Calculators = lazy(() => import('./pages/Calculators'));
const SIPCalculator = lazy(() => import('./pages/calculators/SIPCalculator'));
const LumpsumCalculator = lazy(() => import('./pages/calculators/LumpsumCalculator'));
const SWPCalculator = lazy(() => import('./pages/calculators/SWPCalculator'));
const RetirementCalculator = lazy(() => import('./pages/calculators/RetirementCalculator'));
const GoalCalculator = lazy(() => import('./pages/calculators/GoalCalculator'));
const InflationCalculator = lazy(() => import('./pages/calculators/InflationCalculator'));
const AllocationCalculator = lazy(() => import('./pages/calculators/AllocationCalculator'));
const Research = lazy(() => import('./pages/Research'));
const RiskProfile = lazy(() => import('./pages/RiskProfile'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQs = lazy(() => import('./pages/FAQs'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const Disclosures = lazy(() => import('./pages/legal/Disclosures'));
const NotFound = lazy(() => import('./pages/NotFound'));


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="about/team" element={<Team />} />
              <Route path="about/philosophy" element={<Philosophy />} />
              <Route path="services" element={<Services />} />
              <Route path="services/mutual-funds" element={<MutualFunds />} />
              <Route path="services/insurance" element={<Insurance />} />
              <Route path="services/stocks" element={<Stocks />} />
              <Route path="services/financial-planning" element={<FinancialPlanning />} />
              <Route path="services/retirement" element={<Retirement />} />
              <Route path="services/goal-based" element={<GoalBased />} />
              <Route path="services/taxation" element={<Taxation />} />
              <Route path="services/fixed-deposits" element={<FixedDeposits />} />
              <Route path="calculators" element={<Calculators />} />
              <Route path="calculators/sip" element={<SIPCalculator />} />
              <Route path="calculators/lumpsum" element={<LumpsumCalculator />} />
              <Route path="calculators/swp" element={<SWPCalculator />} />
              <Route path="calculators/retirement" element={<RetirementCalculator />} />
              <Route path="calculators/goal" element={<GoalCalculator />} />
              <Route path="calculators/inflation" element={<InflationCalculator />} />
              <Route path="calculators/allocation" element={<AllocationCalculator />} />
              <Route path="research" element={<Research />} />
              <Route path="risk-profile" element={<RiskProfile />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faqs" element={<FAQs />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="disclosures" element={<Disclosures />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
