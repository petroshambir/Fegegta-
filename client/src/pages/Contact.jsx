import React, { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  Globe2,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSending(true)
    setStatus('')

    try {
      /*
       * Contact form is currently prepared for frontend testing.
       * Backend/email API can be connected here later.
       */

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus('success')

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <MessageCircle className="h-4 w-4" />
              We are here to help
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Have a question, need assistance, or want to learn more about
              Fegegta? Our team is ready to hear from you and help you with
              your needs.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT INFORMATION
      ========================================================== */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* PHONE */}
            <a
              href="tel:+251929180178"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <Phone className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">Call Us</h2>

              <p className="mt-3 text-sm text-gray-500">
                Speak directly with our team.
              </p>

              <div className="mt-4 space-y-1 text-sm font-medium text-gray-900">
                <p>+251 929 180 178</p>
                <p>+251 993 501 570</p>
              </div>
            </a>

            {/* EMAIL */}
            <a
              href="mailto:ibrobraat@gmail.com"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <Mail className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">Email Us</h2>

              <p className="mt-3 text-sm text-gray-500">
                Send us your questions or requests.
              </p>

              <p className="mt-4 break-all text-sm font-medium text-gray-900">
                ibrobraat@gmail.com
              </p>
            </a>

            {/* LOCATION */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <MapPin className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">Our Location</h2>

              <p className="mt-3 text-sm text-gray-500">
                Our office and operations.
              </p>

              <p className="mt-4 text-sm font-medium text-gray-900">
                Addis Ababa, Ethiopia
              </p>
            </div>

            {/* INTERNATIONAL */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <Globe2 className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                International
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Fegegta is built to connect customers and sellers beyond
                borders.
              </p>

              <p className="mt-4 text-sm font-medium text-gray-900">
                Global Marketplace
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT FORM + OFFICE INFORMATION
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* LEFT SIDE */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Get In Touch
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                We would love to hear from you.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600">
                Whether you have a question about our marketplace, need
                support with an order, want to work with us, or simply want
                to learn more about Fegegta, feel free to contact our team.
              </p>

              <div className="mt-10 space-y-7">
                {/* PHONE */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Phone className="h-5 w-5 text-gray-900" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Phone
                    </h3>

                    <a
                      href="tel:+251929180178"
                      className="mt-1 block text-sm text-gray-600 hover:text-black"
                    >
                      +251 929 180 178
                    </a>

                    <a
                      href="tel:+251993501570"
                      className="mt-1 block text-sm text-gray-600 hover:text-black"
                    >
                      +251 993 501 570
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Mail className="h-5 w-5 text-gray-900" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email
                    </h3>

                    <a
                      href="mailto:ibrobraat@gmail.com"
                      className="mt-1 block break-all text-sm text-gray-600 hover:text-black"
                    >
                      ibrobraat@gmail.com
                    </a>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <MapPin className="h-5 w-5 text-gray-900" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Office
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                {/* HOURS */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Clock3 className="h-5 w-5 text-gray-900" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Customer Support
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Contact us by phone or email and our team will assist
                      you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Fill out the form below and we will get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* NAME + EMAIL */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                </div>

                {/* SUCCESS */}
                {status === 'success' && (
                  <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                    <div>
                      <p className="font-semibold">
                        Message received
                      </p>

                      <p className="mt-1 text-green-700">
                        Your message has been prepared successfully.
                      </p>
                    </div>
                  </div>
                )}

                {/* ERROR */}
                {status === 'error' && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    Something went wrong. Please try again.
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERNATIONAL SECTION
      ========================================================== */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                <Globe2 className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Connecting people beyond borders.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
                Fegegta is designed as a modern marketplace where customers
                and independent sellers can connect. Our goal is to make
                shopping and selling simple, trusted, and accessible across
                borders.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-400">
                    Head Office
                  </p>

                  <p className="mt-2 font-semibold">
                    Addis Ababa, Ethiopia
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <a
                    href="mailto:ibrobraat@gmail.com"
                    className="mt-2 block break-all font-semibold hover:underline"
                  >
                    ibrobraat@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Phone
                  </p>

                  <a
                    href="tel:+251929180178"
                    className="mt-2 block font-semibold hover:underline"
                  >
                    +251 929 180 178
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Additional Phone
                  </p>

                  <a
                    href="tel:+251993501570"
                    className="mt-2 block font-semibold hover:underline"
                  >
                    +251 993 501 570
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Have more questions?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Our team is available to help you. Reach out through phone or
            email and we will be happy to assist you.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:+251929180178"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>

            <a
              href="mailto:ibrobraat@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact