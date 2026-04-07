import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { TrustBar, Reviews } from '@/components/Reviews'
import Products from '@/components/Products'
import ParallaxDivider from '@/components/ParallaxDivider'
import HowItWorks from '@/components/HowItWorks'
import OrderForm from '@/components/OrderForm'
import ServiceAreas from '@/components/ServiceAreas'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <ParallaxDivider />
        <HowItWorks />
        <OrderForm />
        <ServiceAreas />
        <Reviews />
      </main>
      <Footer />
    </>
  )
}
