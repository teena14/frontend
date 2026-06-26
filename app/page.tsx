// =============================================================================
// Page — Main page composition
// All memoized sections are assembled here.
// Pricing section holds its own state — no rerenders to siblings.
// =============================================================================

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Problem from '@/components/sections/Problem';
import Solutions from '@/components/sections/Solutions';
import BentoFeatures from '@/components/sections/BentoFeatures';
import PerformanceMetrics from '@/components/sections/PerformanceMetrics';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TrustedBy />
        <Problem />
        <Solutions />
        <BentoFeatures />
        <PerformanceMetrics />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
