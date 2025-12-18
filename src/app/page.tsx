import { Hero } from "src/components/sections/Hero/Hero";
import { HowItWorks } from "src/components/sections/HowItWorks/HowItWorks";
import { Props } from "src/components/sections/Props/Props";
import { Partners } from "src/components/sections/Prtners/Partners";
import { Services } from "src/components/sections/Services/Services";
import { WorkFlow } from "src/components/sections/WorkFlow/WorkFlow";
import { Testimonials } from "src/components/sections/Testimonials/Testimonials";
import { Solutions } from "src/components/sections/Solutions/Solutions";
import { CtaSection } from "src/components/sections/CtaSection/CtaSection";
import { HeroPlug } from "src/components/sections/Hero/HeroPlug";
import { SectionWrapper } from "src/components/Animation/SectionWrapper";
import { GetHomePages } from "src/lib/api/getHome";
import { draftMode } from "next/headers";
import { Gallery } from "src/components/sections/Gallery/Gallery";
import { JsonLd } from "src/components/seo/JsonLd";

export default async function Home() {
  const { isEnabled: isDraftMode } = await draftMode();
  // console.log(isDraftMode);
  const api = new GetHomePages("cough-monitor-suite", "home", isDraftMode);
  const hero = await api.getHero();
  const workflow = await api.getWorkflow();
  const partners = await api.getPartners();
  const props = await api.getProps();
  const services = await api.getServices();
  const howItWorks = await api.getHowItWorks();
  const testimonials = await api.getTestimonials();
  const solutions = await api.getSolutions();
  const cta = await api.getCta();
  const gallery = await api.getGallery();
  const seo = await api.geSEO();
  console.log(seo?.structured_data);
  return (
    <>
      {seo?.structured_data ? <JsonLd data={seo.structured_data} /> : null}
      <Hero data={hero} isDraft={isDraftMode} />
      <HeroPlug />
      <SectionWrapper>
        <WorkFlow data={workflow} />
      </SectionWrapper>
      <Partners data={partners} />
      <Props data={props} />
      <Services data={services} />
      <HowItWorks data={howItWorks} />
      <Gallery data={gallery} />
      <Testimonials data={testimonials} />
      <Solutions data={solutions} />
      <CtaSection data={cta} />
    </>
  );
}
