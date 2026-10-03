import { MotionConfig } from "framer-motion";
import { HeroSection } from "@/components/ui/hero-section-2";
import { About } from "@/components/sections/about";
import { Contacts } from "@/components/sections/contacts";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { MenuSection } from "@/components/sections/menu";
import { Nastoyki } from "@/components/sections/nastoyki";
import { Navbar } from "@/components/sections/navbar";
import { Reviews } from "@/components/sections/reviews";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <HeroSection
          id="top"
          title={
            <>
              <span className="line">Атмосфера</span>
              <span className="line">хорошей кухни</span>
            </>
          }
          subtitle="Вкусная еда, авторские блюда, уютный интерьер и внимательный сервис — всё, чтобы вы наслаждались каждым моментом."
          callToAction={{
            text: "Перейти в меню",
            href: "#menu",
          }}
          backgroundImage="/images/hero-ref.jpg"
        />
        <About />
        <MenuSection />
        <Nastoyki />
        <Gallery />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
