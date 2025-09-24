"use client"

import { useEffect } from "react"
import WhatsAppButton from "@/components/whatsapp-button"

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-28 md:pt-32">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> July 11, 2025
              <br />
              <strong>Last Updated:</strong> July 11, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              At Flying Passport, accessible from https://flyingpassports.com, the privacy of our visitors is one of our
              top priorities. This Privacy Policy document outlines the types of personal information that is collected,
              recorded, used, and protected by Flying Passport and how we handle it.
            </p>

            <p className="mb-8">By using our website, you agree to the terms outlined in this Privacy Policy.</p>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">1. Who We Are</h2>
              <p className="mb-4">
                Flying Passport is a travel agency based in Bangalore, India, offering international group tours and
                personalized family tour packages. Our official website is https://flyingpassports.com.
              </p>
              <p className="mb-4">For any questions or concerns regarding this policy, you may contact us:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>📧 Email: contact@flyingpassports.com</li>
                <li>📞 Phone: +91 77955 38639</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                We collect only the essential personal information required to serve you better and confirm your
                interest in our travel packages. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
              </ul>
              <p>
                We do not collect any sensitive information such as passport numbers, Aadhaar numbers, or payment
                details directly through our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">3. How We Collect Information</h2>
              <p className="mb-4">We collect personal information through the following means:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  When users fill out forms on our website (e.g., expressing interest in upcoming group tours or family
                  travel packages)
                </li>
                <li>
                  When users contact us through the WhatsApp icon, which redirects them to our official WhatsApp account
                </li>
                <li>
                  When users browse our website, basic non-identifying information is collected through cookies and
                  Google Analytics to improve the user experience
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">4. Why We Collect Your Information</h2>
              <p className="mb-4">We collect your information solely for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>To respond to inquiries related to group tours or travel packages</li>
                <li>To contact you regarding your travel preferences</li>
                <li>
                  To provide relevant marketing communications (such as tour announcements and promotional updates)
                </li>
                <li>To improve our services and website functionality</li>
              </ul>
              <p>We do not sell or rent your personal data to any third party.</p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">5. Use of Third-Party Services</h2>
              <p className="mb-4">We make use of the following third-party services:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Google Analytics:</strong> Helps us understand how users interact with our website so we can
                  improve its usability and effectiveness.
                </li>
                <li>
                  <strong>WhatsApp Business Chat Widget:</strong> Enables visitors to directly contact our team through
                  WhatsApp. Clicking on this widget will redirect users to WhatsApp's platform.
                </li>
              </ul>
              <p>
                We do not control how third-party services collect or use your data, and their use is subject to their
                own privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">6. Data Sharing Policy</h2>
              <p className="mb-4">
                We do not share any personal information submitted on our website with third-party service providers,
                vendors, or external agencies.
              </p>
              <p>The only exception to this would be if required by law, regulation, or legal process.</p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">7. How We Protect Your Information</h2>
              <p className="mb-4">
                We take your privacy seriously and have implemented industry-standard security measures to protect your
                data, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>SSL Encryption:</strong> All data transmitted via our website is encrypted using SSL (Secure
                  Socket Layer) technology to prevent unauthorized access
                </li>
                <li>
                  <strong>Access Restrictions:</strong> Personal information is accessible only to authorized team
                  members who are bound by confidentiality
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">8. Data Retention Policy</h2>
              <p className="mb-4">We retain your personal data for an extended period so we can:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintain communication with you for future tour promotions</li>
                <li>Offer relevant travel deals and updates</li>
                <li>Improve our service quality and customer relationships</li>
              </ul>
              <p>
                If you wish to have your data deleted from our records, you can contact us at
                contact@flyingpassports.com and we will process your request promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">9. Your Rights</h2>
              <p className="mb-4">As a user, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Right to access:</strong> You can request to see the data we have about you.
                </li>
                <li>
                  <strong>Right to correction:</strong> You may request corrections to any inaccurate or incomplete
                  data.
                </li>
                <li>
                  <strong>Right to deletion:</strong> You can request the deletion of your personal information from our
                  records.
                </li>
                <li>
                  <strong>Right to object:</strong> You may object to our use of your data for marketing purposes at any
                  time.
                </li>
              </ul>
              <p>To exercise any of these rights, simply email us at contact@flyingpassports.com.</p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">10. Cookies & Tracking Technologies</h2>
              <p className="mb-4">We use cookies and Google Analytics to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Track user interactions</li>
                <li>Monitor website traffic</li>
                <li>Understand user preferences</li>
              </ul>
              <p>
                Cookies do not collect personal information, and you may disable them in your browser settings if you
                prefer not to be tracked.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">11. Children's Privacy</h2>
              <p>
                Our website and services are not intended for children under the age of 13, and we do not knowingly
                collect personal information from children. If we become aware that we have collected data from a child
                without parental consent, we will take immediate steps to remove that information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. Any updates will be posted on this page with the revised
                date.
              </p>
              <p>
                We encourage you to periodically review this policy to stay informed about how we are protecting your
                information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, comments, or concerns about this Privacy Policy or how your information is
                handled, please feel free to contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <p className="font-bold mb-2">Flying Passport</p>
                <p>📍 Bangalore, India</p>
                <p>📧 Email: contact@flyingpassports.com</p>
                <p>📞 Phone: +91 77955 38639</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
