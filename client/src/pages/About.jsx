// import React from 'react'
// import {
//   ArrowRight,
//   Award,
//   CheckCircle2,
//   Globe2,
//   Heart,
//   ShieldCheck,
//   Sparkles,
//   Store,
//   Users,
// } from 'lucide-react'

// import founderImage from '../assets/about-founder.jpeg'
// import aboutImage1 from '../assets/about-1.jpeg'
// import aboutImage2 from '../assets/about-2.jpeg'

// // ============================================================
// // ABOUT PAGE
// // ============================================================

// const About = () => {
//   return (
//     <main className="bg-white text-gray-900">

//       {/* ======================================================
//           HERO
//       ====================================================== */}

//       <section className="relative overflow-hidden bg-black text-white">

//         <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-gray-900" />

//         <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">

//           <div className="max-w-4xl">

//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
//               <Sparkles size={16} />
//               About ፈገግታ Fegegta
//             </div>

//             <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
//               Connecting people with
//               <span className="block text-gray-400">
//                 products they can trust.
//               </span>
//             </h1>

//             <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
//               Fegegta is built to bring customers and independent sellers
//               together through a trusted, modern marketplace where quality,
//               authenticity, and great service come first.
//             </p>

//           </div>

//           <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">

//             <div className="border-l border-white/20 pl-5">
//               <p className="text-3xl font-bold sm:text-4xl">10+</p>
//               <p className="mt-1 text-sm text-gray-400">
//                 Years of Experience
//               </p>
//             </div>

//             <div className="border-l border-white/20 pl-5">
//               <p className="text-3xl font-bold sm:text-4xl">100%</p>
//               <p className="mt-1 text-sm text-gray-400">
//                 Customer Focus
//               </p>
//             </div>

//             <div className="border-l border-white/20 pl-5">
//               <p className="text-3xl font-bold sm:text-4xl">24/7</p>
//               <p className="mt-1 text-sm text-gray-400">
//                 Marketplace Access
//               </p>
//             </div>

//             <div className="border-l border-white/20 pl-5">
//               <p className="text-3xl font-bold sm:text-4xl">1</p>
//               <p className="mt-1 text-sm text-gray-400">
//                 Growing Community
//               </p>
//             </div>

//           </div>

//         </div>
//       </section>


//       {/* ======================================================
//           OUR STORY
//       ====================================================== */}

//       <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

//         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

//           <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
//             <img
//               src={aboutImage1}
//               alt="Fegegta story"
//               className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
//             />
//           </div>

//           <div>

//             <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
//               <span className="h-px w-10 bg-gray-400" />
//               Our Story
//             </div>

//             <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
//               More than a marketplace.
//               <span className="block text-gray-500">
//                 A place to build trust.
//               </span>
//             </h2>

//             <p className="mt-7 text-base leading-8 text-gray-600">
//               Fegegta was created with a simple idea: shopping should feel
//               trustworthy, convenient, and personal. Customers should be able
//               to discover quality products while sellers should have a place
//               where they can grow their businesses and reach more people.
//             </p>

//             <p className="mt-5 text-base leading-8 text-gray-600">
//               With more than 10 years of experience behind our journey, we
//               understand the importance of quality, reliability, customer
//               relationships, and long-term business growth.
//             </p>

//             <div className="mt-8 space-y-4">

//               {[
//                 'Quality products and trusted sellers',
//                 'A simple and modern shopping experience',
//                 'Opportunities for independent businesses',
//                 'Long-term relationships with our customers',
//               ].map((item) => (
//                 <div
//                   key={item}
//                   className="flex items-start gap-3"
//                 >
//                   <CheckCircle2
//                     size={21}
//                     className="mt-1 shrink-0"
//                   />

//                   <span className="text-gray-700">
//                     {item}
//                   </span>
//                 </div>
//               ))}

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* ======================================================
//           FOUNDER / EXPERIENCE
//       ====================================================== */}

//       <section className="bg-gray-50">

//         <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

//           <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

//             <div className="relative">

//               <div className="absolute -inset-4 rounded-3xl bg-gray-200/70 blur-2xl" />

//               <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">

//                 <img
//                   src={founderImage}
//                   alt="Fegegta founder"
//                   className="h-[500px] w-full object-cover sm:h-[600px]"
//                 />

//               </div>

//               <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/85 p-5 text-white backdrop-blur-md">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
//                     <Award size={21} />
//                   </div>

//                   <div>
//                     <p className="font-bold">
//                       10+ Years
//                     </p>

//                     <p className="text-sm text-gray-300">
//                       Experience &amp; dedication
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>


//             <div>

//               <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
//                 <span className="h-px w-10 bg-gray-400" />
//                 Experience Behind Fegegta
//               </div>

//               <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
//                 Built on experience.
//                 <span className="block text-gray-500">
//                   Driven by purpose.
//                 </span>
//               </h2>

//               <p className="mt-7 text-base leading-8 text-gray-600">
//                 Behind Fegegta is a journey shaped by more than a decade of
//                 experience, learning, working with people, understanding
//                 customers, and building relationships that last.
//               </p>

//               <p className="mt-5 text-base leading-8 text-gray-600">
//                 That experience has taught us that a successful business is
//                 not only about selling products. It is about earning trust,
//                 delivering value, listening to customers, and creating
//                 opportunities for others.
//               </p>

//               <div className="mt-10 grid gap-5 sm:grid-cols-2">

//                 <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                   <Award size={27} />

//                   <h3 className="mt-4 font-bold">
//                     10+ Years Experience
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-gray-500">
//                     Experience that continues to shape how we serve customers
//                     and businesses.
//                   </p>

//                 </div>

//                 <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                   <Users size={27} />

//                   <h3 className="mt-4 font-bold">
//                     People First
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-gray-500">
//                     Our customers and sellers are at the heart of everything
//                     we build.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* ======================================================
//           MISSION / VISION
//       ====================================================== */}

//       <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

//         <div className="mx-auto max-w-3xl text-center">

//           <div className="mb-5 flex justify-center">
//             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
//               <Sparkles size={25} />
//             </div>
//           </div>

//           <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
//             Our Mission &amp; Vision
//           </h2>

//           <p className="mt-5 leading-8 text-gray-600">
//             We are building Fegegta for the long term — with a clear focus on
//             trust, quality, opportunity, and a better experience for everyone.
//           </p>

//         </div>


//         <div className="mt-14 grid gap-6 md:grid-cols-2">

//           <div className="rounded-3xl bg-black p-8 text-white sm:p-10">

//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
//               <Globe2 size={24} />
//             </div>

//             <h3 className="mt-7 text-2xl font-bold">
//               Our Mission
//             </h3>

//             <p className="mt-4 leading-8 text-gray-300">
//               To create a trusted marketplace where customers can discover
//               quality products and independent sellers can build and grow
//               sustainable businesses.
//             </p>

//           </div>


//           <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-10">

//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
//               <Heart size={24} />
//             </div>

//             <h3 className="mt-7 text-2xl font-bold">
//               Our Vision
//             </h3>

//             <p className="mt-4 leading-8 text-gray-600">
//               To become a trusted marketplace that connects people,
//               businesses, and communities through meaningful products and
//               reliable experiences.
//             </p>

//           </div>

//         </div>

//       </section>


//       {/* ======================================================
//           VALUES
//       ====================================================== */}

//       <section className="bg-black text-white">

//         <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

//           <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

//             <div>

//               <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
//                 <span className="h-px w-10 bg-gray-500" />
//                 What We Believe
//               </div>

//               <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
//                 The principles behind everything we do.
//               </h2>

//               <p className="mt-6 leading-8 text-gray-400">
//                 Every part of Fegegta is designed around creating value for
//                 customers, sellers, and the wider community.
//               </p>

//             </div>


//             <div className="grid gap-4 sm:grid-cols-2">

//               <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

//                 <ShieldCheck size={28} />

//                 <h3 className="mt-5 text-xl font-bold">
//                   Trust
//                 </h3>

//                 <p className="mt-3 text-sm leading-7 text-gray-400">
//                   We believe trust is the foundation of every successful
//                   relationship.
//                 </p>

//               </div>


//               <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

//                 <Award size={28} />

//                 <h3 className="mt-5 text-xl font-bold">
//                   Quality
//                 </h3>

//                 <p className="mt-3 text-sm leading-7 text-gray-400">
//                   We aim to make quality and reliability part of every
//                   customer experience.
//                 </p>

//               </div>


//               <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

//                 <Store size={28} />

//                 <h3 className="mt-5 text-xl font-bold">
//                   Opportunity
//                 </h3>

//                 <p className="mt-3 text-sm leading-7 text-gray-400">
//                   We give independent sellers a place to showcase their
//                   products and grow.
//                 </p>

//               </div>


//               <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

//                 <Heart size={28} />

//                 <h3 className="mt-5 text-xl font-bold">
//                   Community
//                 </h3>

//                 <p className="mt-3 text-sm leading-7 text-gray-400">
//                   We want Fegegta to be more than shopping — we want it to be
//                   a growing community.
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ======================================================
//           SECOND IMAGE / EXPERIENCE
//       ====================================================== */}

//       <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

//         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

//           <div>

//             <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
//               <span className="h-px w-10 bg-gray-400" />
//               Growing Together
//             </div>

//             <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
//               Creating opportunities,
//               <span className="block text-gray-500">
//                 one connection at a time.
//               </span>
//             </h2>

//             <p className="mt-7 leading-8 text-gray-600">
//               Fegegta brings customers and sellers into one marketplace where
//               products can be discovered, businesses can grow, and meaningful
//               relationships can develop.
//             </p>

//             <p className="mt-5 leading-8 text-gray-600">
//               As we grow, our commitment remains the same: build with
//               integrity, listen to our community, and continue improving the
//               experience for everyone.
//             </p>

//             <div className="mt-8">

//               <a
//                 href="/products"
//                 className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 Explore Products
//                 <ArrowRight size={18} />
//               </a>

//             </div>

//           </div>


//           <div className="overflow-hidden rounded-3xl">

//             <img
//               src={aboutImage2}
//               alt="Fegegta community and marketplace"
//               className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
//             />

//           </div>

//         </div>

//       </section>


//       {/* ======================================================
//           CTA
//       ====================================================== */}

//       <section className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28">

//         <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-100">

//           <div className="px-7 py-14 text-center sm:px-12 sm:py-20">

//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
//               <Store size={25} />
//             </div>

//             <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
//               Be part of the Fegegta journey.
//             </h2>

//             <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
//               Whether you are looking for something special or building your
//               own business, Fegegta is here to connect you with new
//               opportunities.
//             </p>

//             <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

//               <a
//                 href="/products"
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
//               >
//                 Start Shopping
//                 <ArrowRight size={18} />
//               </a>

//               <a
//                 href="/contact"
//                 className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
//               >
//                 Contact Us
//               </a>

//             </div>

//           </div>

//         </div>

//       </section>

//     </main>
//   )
// }

// export default About


import React from 'react'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Globe2,
  Heart,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  ShoppingBag,
  Scissors,
  Gem,
  HandHeart,
  Truck,
} from 'lucide-react'

import founderImage from '../assets/about-founder.jpeg'
import aboutImage1 from '../assets/about-1.jpeg'
import aboutImage2 from '../assets/about-2.jpeg'
import aboutImage3 from '../assets/about-11.jpeg'
import aboutImage4 from '../assets/about-4.jpeg'
import aboutImage5 from '../assets/about-5.jpeg'
import aboutImage6 from '../assets/about-6.jpeg'
import aboutImage7 from '../assets/about-7.jpeg'
import aboutImage8 from '../assets/about-8.jpeg'
import aboutImage9 from '../assets/about-9.jpeg'
import aboutImage10 from '../assets/about-10.jpeg'
import aboutImage14 from '../assets/about-14.jpeg'

// ============================================================
// ABOUT PAGE
// ============================================================

const About = () => {
  const galleryImages = [
    {
      image: aboutImage3,
      title: 'From an idea to something real',
      description:
        'Every product begins with an idea, a skill, and the desire to create something meaningful. Fegegta brings those ideas closer to the people who value them.',
    },
    {
      image: aboutImage4,
      title: 'Crafted with care',
      description:
        'Behind every finished product are people who invest time, creativity, patience, and attention to detail into what they create.',
    },
    {
      image: aboutImage5,
      title: 'From making to finishing',
      description:
        'We believe the journey matters. From the first stage of making a product to the final details, quality should remain at the center.',
    },
    {
      image: aboutImage6,
      title: 'Products with a story',
      description:
        'A product can be more than something you buy. It can represent creativity, culture, hard work, and the story of the person who made it.',
    },
    {
      image: aboutImage7,
      title: 'Independent sellers',
      description:
        'Fegegta gives independent sellers an opportunity to present their work professionally and reach customers beyond their immediate community.',
    },
    {
      image: aboutImage8,
      title: 'A better shopping experience',
      description:
        'Our goal is to make discovering products simple, clear, convenient, and trustworthy for every customer.',
    },
    {
      image: aboutImage9,
      title: 'Connecting people',
      description:
        'At the heart of Fegegta are people — customers looking for something special and sellers who want their work to be discovered.',
    },
    {
      image: aboutImage10,
      title: 'Growing together',
      description:
        'As Fegegta grows, we want customers and sellers to grow with us through trust, opportunity, service, and long-term relationships.',
    },
  ]

  return (
    <main className="bg-white text-gray-900">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-gray-900" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles size={16} />
              About ፈገግታ Fegegta
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
              Connecting people with
              <span className="block text-gray-400">
                products they can trust.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Fegegta is built to bring customers and independent sellers
              together through a trusted, modern marketplace where quality,
              authenticity, and great service come first.
            </p>

          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <div className="border-l border-white/20 pl-5">
              <p className="text-3xl font-bold sm:text-4xl">10+</p>
              <p className="mt-1 text-sm text-gray-400">
                Years of Experience
              </p>
            </div>

            <div className="border-l border-white/20 pl-5">
              <p className="text-3xl font-bold sm:text-4xl">100%</p>
              <p className="mt-1 text-sm text-gray-400">
                Customer Focus
              </p>
            </div>

            <div className="border-l border-white/20 pl-5">
              <p className="text-3xl font-bold sm:text-4xl">24/7</p>
              <p className="mt-1 text-sm text-gray-400">
                Marketplace Access
              </p>
            </div>

            <div className="border-l border-white/20 pl-5">
              <p className="text-3xl font-bold sm:text-4xl">1</p>
              <p className="mt-1 text-sm text-gray-400">
                Growing Community
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          OUR STORY
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-xl">

            <img
              src={aboutImage1}
              alt="Fegegta story"
              className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
            />

          </div>

          <div>

            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
              <span className="h-px w-10 bg-gray-400" />
              Our Story
            </div>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              More than a marketplace.
              <span className="block text-gray-500">
                A place to build trust.
              </span>
            </h2>

            <p className="mt-7 text-base leading-8 text-gray-600">
              Fegegta was created with a simple idea: shopping should feel
              trustworthy, convenient, and personal. Customers should be able
              to discover quality products while sellers should have a place
              where they can grow their businesses and reach more people.
            </p>

            <p className="mt-5 text-base leading-8 text-gray-600">
              From the first idea and the first piece created, to the finished
              product ready for a customer, we believe every stage matters.
              Behind every product is a person, a skill, a story, and hard work.
            </p>

            <div className="mt-8 space-y-4">

              {[
                'Quality products and trusted sellers',
                'A simple and modern shopping experience',
                'Opportunities for independent businesses',
                'Long-term relationships with our customers',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0"
                  />

                  <span className="text-gray-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          JOURNEY IMAGE
      ====================================================== */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            <div>

              <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
                <span className="h-px w-10 bg-gray-400" />
                The Journey
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                From the first idea
                <span className="block text-gray-500">
                  to the finished product.
                </span>
              </h2>

              <p className="mt-7 leading-8 text-gray-600">
                Great products do not simply appear. They begin with an idea,
                move through careful work and creativity, and eventually become
                something customers can see, use, enjoy, and trust.
              </p>

              <p className="mt-5 leading-8 text-gray-600">
                Fegegta wants to make that entire journey visible and valuable
                by creating a marketplace where the people behind products can
                connect directly with people looking for something meaningful.
              </p>

            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

              <img
                src={aboutImage2}
                alt="From creation to finished product"
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
              />

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          FOUNDER / EXPERIENCE
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

            <div className="relative">

              <div className="absolute -inset-4 rounded-3xl bg-gray-200/70 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">

                <img
                  src={founderImage}
                  alt="Fegegta founder"
                  className="h-[500px] w-full object-cover sm:h-[600px]"
                />

              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/85 p-5 text-white backdrop-blur-md">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                    <Award size={21} />
                  </div>

                  <div>
                    <p className="font-bold">
                      10+ Years
                    </p>

                    <p className="text-sm text-gray-300">
                      Experience & dedication
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div>

              <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
                <span className="h-px w-10 bg-gray-400" />
                Experience Behind Fegegta
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Built on experience.
                <span className="block text-gray-500">
                  Driven by purpose.
                </span>
              </h2>

              <p className="mt-7 text-base leading-8 text-gray-600">
                Behind Fegegta is a journey shaped by more than a decade of
                experience, learning, working with people, understanding
                customers, and building relationships that last.
              </p>

              <p className="mt-5 text-base leading-8 text-gray-600">
                That experience has taught us that a successful business is
                not only about selling products. It is about earning trust,
                delivering value, listening to customers, and creating
                opportunities for others.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">

                  <Award size={27} />

                  <h3 className="mt-4 font-bold">
                    10+ Years Experience
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Experience that continues to shape how we serve customers
                    and businesses.
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">

                  <Users size={27} />

                  <h3 className="mt-4 font-bold">
                    People First
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Our customers and sellers are at the heart of everything
                    we build.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          MAKING / CRAFT / PRODUCT STORY
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
              <Scissors size={25} />
            </div>
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            The work behind every product.
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            From the first material and first cut to the final detail,
            craftsmanship deserves to be seen, appreciated, and connected
            with the right customer.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">

          <div className="group overflow-hidden rounded-3xl bg-gray-100">

            <img
              src={aboutImage3}
              alt="Product creation and craftsmanship"
              className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="p-7 sm:p-9">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <Scissors size={23} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                From an idea to something real
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Every product begins somewhere. Fegegta celebrates the
                creativity and effort that turn an idea into something real.
              </p>

            </div>

          </div>


          <div className="group overflow-hidden rounded-3xl bg-gray-100">

            <img
              src={aboutImage4}
              alt="Carefully crafted products"
              className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="p-7 sm:p-9">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <Gem size={23} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Crafted with care
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Quality comes from attention to detail. We want customers to
                discover products made with care and genuine effort.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          PHOTO STORY
      ====================================================== */}

      <section className="bg-black text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              <span className="h-px w-10 bg-gray-500" />
              Our Product Story
            </div>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Every product has
              <span className="block text-gray-500">
                something behind it.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              The images below represent the journey we want Fegegta to
              celebrate — creativity, craftsmanship, finished products,
              sellers, customers, and the connections created through them.
            </p>

          </div>


          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {galleryImages.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ======================================================
          MISSION / VISION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
              <Sparkles size={25} />
            </div>
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Our Mission & Vision
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            We are building Fegegta for the long term — with a clear focus on
            trust, quality, opportunity, and a better experience for everyone.
          </p>

        </div>


        <div className="mt-14 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-black p-8 text-white sm:p-10">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
              <Globe2 size={24} />
            </div>

            <h3 className="mt-7 text-2xl font-bold">
              Our Mission
            </h3>

            <p className="mt-4 leading-8 text-gray-300">
              To create a trusted marketplace where customers can discover
              quality products and independent sellers can build and grow
              sustainable businesses.
            </p>

          </div>


          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-10">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
              <Heart size={24} />
            </div>

            <h3 className="mt-7 text-2xl font-bold">
              Our Vision
            </h3>

            <p className="mt-4 leading-8 text-gray-600">
              To become a trusted marketplace that connects people,
              businesses, and communities through meaningful products and
              reliable experiences.
            </p>

          </div>

        </div>

      </section>


      {/* ======================================================
          VALUES
      ====================================================== */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>

              <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
                <span className="h-px w-10 bg-gray-400" />
                What We Believe
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                The principles behind everything we do.
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Every part of Fegegta is designed around creating value for
                customers, sellers, and the wider community.
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

                <ShieldCheck size={28} />

                <h3 className="mt-5 text-xl font-bold">
                  Trust
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  We believe trust is the foundation of every successful
                  relationship.
                </p>

              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

                <Award size={28} />

                <h3 className="mt-5 text-xl font-bold">
                  Quality
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  We aim to make quality and reliability part of every
                  customer experience.
                </p>

              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

                <Store size={28} />

                <h3 className="mt-5 text-xl font-bold">
                  Opportunity
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  We give independent sellers a place to showcase their
                  products and grow.
                </p>

              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

                <Heart size={28} />

                <h3 className="mt-5 text-xl font-bold">
                  Community
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  We want Fegegta to be more than shopping — we want it to be
                  a growing community.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          SELLER + CUSTOMER CONNECTION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="overflow-hidden rounded-3xl">

            <img
              src={aboutImage5}
              alt="Fegegta seller and product journey"
              className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
            />

          </div>

          <div>

            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
              <span className="h-px w-10 bg-gray-400" />
              Sellers & Customers
            </div>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              One marketplace.
              <span className="block text-gray-500">
                Many stories.
              </span>
            </h2>

            <p className="mt-7 leading-8 text-gray-600">
              Fegegta is designed as a marketplace where independent sellers
              can build their own presence while customers can discover
              products from different businesses in one place.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              We believe this connection creates more opportunities for
              sellers and gives customers more choice, discovery, and
              convenience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold">
                <Store size={17} />
                Independent Sellers
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold">
                <ShoppingBag size={17} />
                More Choice
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold">
                <HandHeart size={17} />
                Trusted Connections
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          MORE PRODUCT STORY
      ====================================================== */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

              <img
                src={aboutImage6}
                alt="Fegegta products"
                className="h-80 w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="p-7">

                <h3 className="text-xl font-bold">
                  Products with a story
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  We want customers to discover products that represent
                  creativity, effort, skill, and meaning.
                </p>

              </div>

            </div>


            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

              <img
                src={aboutImage7}
                alt="Independent Fegegta sellers"
                className="h-80 w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="p-7">

                <h3 className="text-xl font-bold">
                  Supporting sellers
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Independent businesses deserve a professional place where
                  their products can be discovered.
                </p>

              </div>

            </div>


            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

              <img
                src={aboutImage8}
                alt="Fegegta customer experience"
                className="h-80 w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="p-7">

                <h3 className="text-xl font-bold">
                  Serving customers
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Every part of the marketplace is designed to make shopping
                  clearer, easier, and more enjoyable.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          GROWING TOGETHER
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div>

            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
              <span className="h-px w-10 bg-gray-400" />
              Growing Together
            </div>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Creating opportunities,
              <span className="block text-gray-500">
                one connection at a time.
              </span>
            </h2>

            <p className="mt-7 leading-8 text-gray-600">
              Fegegta brings customers and sellers into one marketplace where
              products can be discovered, businesses can grow, and meaningful
              relationships can develop.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              As we grow, our commitment remains the same: build with
              integrity, listen to our community, and continue improving the
              experience for everyone.
            </p>

            <div className="mt-8">

              <a
                href="/products"
                className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Explore Products
                <ArrowRight size={18} />
              </a>

            </div>

          </div>


          <div className="overflow-hidden rounded-3xl">

            <img
              src={aboutImage9}
              alt="Fegegta community and marketplace"
              className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
            />

          </div>

        </div>

      </section>


      {/* ======================================================
          FINAL IMAGE / FUTURE
      ====================================================== */}

      <section className="bg-black text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            <div className="overflow-hidden rounded-3xl">

              <img
                src={aboutImage10}
                alt="The future of Fegegta"
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
              />

            </div>

            <div>

              <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
                <span className="h-px w-10 bg-gray-500" />
                The Future
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                We are only
                <span className="block text-gray-500">
                  getting started.
                </span>
              </h2>

              <p className="mt-7 leading-8 text-gray-300">
                Fegegta is being built for the long term. Our goal is to
                continue bringing more products, more sellers, and more
                opportunities together in one trusted marketplace.
              </p>

              <p className="mt-5 leading-8 text-gray-400">
                The journey will continue to evolve, but the principles will
                remain the same: trust, quality, opportunity, service, and
                people.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm">
                  <ShieldCheck size={17} />
                  Trust
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm">
                  <Award size={17} />
                  Quality
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm">
                  <Truck size={17} />
                  Better Service
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-100">

          <div className="px-7 py-14 text-center sm:px-12 sm:py-20">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
              <Store size={25} />
            </div>

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Be part of the Fegegta journey.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              Whether you are looking for something special or building your
              own business, Fegegta is here to connect you with new
              opportunities.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <a
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Start Shopping
                <ArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Contact Us
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default About