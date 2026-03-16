"use client"

import { useEffect } from "react"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ChargesCancellationPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-28 md:pt-32">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
              Charges & Cancellation Policy
            </h1>
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> July 11, 2025
              <br />
              <strong>Last Updated:</strong> July 11, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              At Flying Passport, we strive to offer exceptional experiences to our customers. However, we understand
              that travel plans can change due to various circumstances. This policy outlines all charges, cancellation
              conditions, and refund rules that apply to group tours and other travel packages booked through Flying
              Passport.
            </p>
            <p className="text-lg mb-6">By booking a tour with us, you agree to abide by the following terms.</p>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">1. Booking Deposit and Initial Charges</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>An initial deposit of ₹25,000 per person is required to confirm any booking.</li>
                <li>
                  This deposit is strictly non-refundable under any circumstances, including visa rejection or voluntary
                  cancellation.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">2. Cancellation Policy (By the Customer)</h2>
              <p className="mb-4">Cancellations must be made in writing via email to contact@flyingpassports.com.</p>

              <h3 className="font-serif font-bold text-xl mb-3">⏳ Cancellation Timeline and Charges:</h3>
              <div className="bg-muted p-6 rounded-lg mb-4">
                <ul className="list-disc pl-6">
                  <li>
                    <strong>90+ days before departure:</strong> 25% of total trip cost
                  </li>
                  <li>
                    <strong>60–89 days before departure:</strong> 50% of total trip cost (excluding the non-refundable
                    ₹25,000)
                  </li>
                  <li>
                    <strong>45–59 days before departure:</strong> 75% of total trip cost (excluding the non-refundable
                    ₹25,000)
                  </li>
                  <li>
                    <strong>Less than 45 days before departure:</strong> 100% of the total trip cost (No refund)
                  </li>
                </ul>
              </div>
              <p className="text-sm italic">
                <strong>Important Note:</strong> Regardless of when the booking is made, these cancellation timelines
                and charges will be strictly applicable to all customers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">3. Special Visa & Immigration-Related Conditions</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>No cancellation or refund is permitted once the visa is approved.</li>
                <li>
                  If the visa arrives late, you may be required to travel with the next available group, and no refunds
                  will be given.
                </li>
                <li>
                  If only some members of a family/friend group receive visa approval and others are rejected, those
                  with approved visas are expected to travel. No cancellation or refund will be provided for choosing
                  not to travel in such cases.
                </li>
                <li>
                  In the case of visa rejection, ₹25,000 will be deducted, and the remaining amount will be refunded.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">4. Amendment or Cancellation (By Flying Passport)</h2>
              <p className="mb-4">
                Flying Passport reserves the right to alter, amend, or cancel your booking due to unforeseen or
                unavoidable circumstances such as government rules, low participation, natural disasters, flight issues,
                etc.
              </p>
              <p className="mb-4">In such cases:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>You will be given the option to:</li>
                <ul className="list-circle pl-6 mt-2">
                  <li>Travel on alternate tour dates, or</li>
                  <li>
                    Travel individually (outside the group) — any additional expenses must be borne by the customer.
                  </li>
                </ul>
                <li>
                  If neither option is acceptable, the company will refund your amount (excluding any non-refundable
                  expenses) within 120 working days from the date of cancellation.
                </li>
              </ul>
              <p className="text-sm italic">
                <strong>Please Note:</strong> Flying Passport will not be liable for any loss, damage, interest, or
                consequential costs incurred due to changes beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">5. Airline, Hotel, and Supplier Responsibility</h2>
              <p className="mb-4">If airlines, hotels, or any third-party suppliers:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Change rules, cancel or reschedule services,</li>
                <li>Impose entry restrictions, or</li>
                <li>Modify their COVID-19 or other health & safety protocols,</li>
              </ul>
              <p className="mb-4">
                Flying Passport shall not be held liable. Any additional costs arising from such changes must be borne
                entirely by the customer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">6. Government Actions or Deportation</h2>
              <p className="mb-4">If a traveler is:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Deported by immigration authorities, or</li>
                <li>Faces entry denial due to government regulations or documentation issues,</li>
              </ul>
              <p className="mb-4">Flying Passport will not be responsible for any consequences.</p>
              <p className="mb-4">
                In the event of an illegal overstay beyond visa validity, the passenger will be liable to pay ₹10,00,000
                as compensation to Flying Passport Tours Pvt. Ltd.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">7. Amendments (By the Customer)</h2>
              <p className="mb-4">
                If a customer wishes to modify their booking (e.g., change of travel date, package, or name), we will
                try to accommodate the request. However:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Such changes are subject to availability</li>
                <li>
                  Cancellation charges as per policy will still apply, depending on the proximity to the departure date
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">8. General Terms</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  All services including flights, hotels, ground transportation, and activities are pre-booked in
                  advance for group tours.
                </li>
                <li>
                  In case of any modifications, reschedules, or restrictions by airlines, hotels, or suppliers, Flying
                  Passport shall act only as a facilitator and will not be responsible for any resulting losses.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">9. Refund Processing Timeline</h2>
              <p className="mb-4">
                Any eligible refund will be processed within 120 working days from the date of cancellation, excluding:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Non-refundable deposit (₹25,000)</li>
                <li>Visa and flight charges already incurred</li>
                <li>Any service fees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">10. Acknowledgment</h2>
              <p className="mb-4">
                By booking a trip with Flying Passport, you acknowledge that you have read, understood, and agreed to
                this Charges and Cancellation Policy.
              </p>
              <p className="mb-4">For all queries related to cancellations or changes, contact us at:</p>
              <div className="bg-muted p-6 rounded-lg">
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
