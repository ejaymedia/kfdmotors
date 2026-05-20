import {
  Navbar,
  Hero,
  StatsBar,
  HotDeals,
  WhyChooseUs,
  Services,
  Testimonials,
  ContactCTA,
  Footer,
} from "../components";

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="stats">
          <StatsBar />
        </section>
        <section id="hotdeals">
          <HotDeals />
        </section>
        <section id="why-us">
          <WhyChooseUs />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <ContactCTA />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;