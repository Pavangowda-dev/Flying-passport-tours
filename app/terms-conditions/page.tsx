"use client"

import { useEffect } from "react"
import WhatsAppButton from "@/components/whatsapp-button"

export default function TermsConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-28 md:pt-32">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">
              <strong>Effective Date:</strong> July 11, 2025
              <br />
              <strong>Last Updated:</strong> July 11, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              Welcome to Flying Passport Tours Pvt. Ltd. By booking a tour with us via our website or any other official
              channel, you agree to comply with and be bound by the following Terms and Conditions. Please read them
              carefully before proceeding.
            </p>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">1. Booking and Payment</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  The minimum booking amount is ₹75,000 per person, required to reserve your slot and initiate the
                  booking process.
                </li>
                <li>
                  100% of the total tour cost must be paid within 40 days of the travel date to confirm your
                  participation and begin visa processing.
                </li>
                <li>The initial booking amount and any advance payment are non-refundable under any circumstances.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">2. Passport and Travel Documents</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  It is the customer’s responsibility to ensure their passport is valid for at least 6 months from the
                  date of departure.
                </li>
                <li>
                  The customer must obtain all necessary visas, re-entry permits, vaccination certificates, and other
                  travel documentation as per the requirements of destination countries.
                </li>
                <li>
                  Any loss, delay, or failure due to improper or missing travel documents is solely the customer’s
                  responsibility. Flying Passport is not liable for any resulting expenses or denied entry.
                </li>
                <li>
                  All travel documents and airline tickets will be issued in the name exactly as per the passport or
                  government-issued ID. Any mismatch may lead to cancellation without refund.
                </li>
                <li>
                  Our team may assist with travel documentation guidance, but the final responsibility lies with the
                  customer.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">3. Inclusions in Tour Package</h2>
              <p className="mb-4">Your tour package includes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Round-trip economy class flights</li>
                <li>4-star hotel accommodations</li>
                <li>Daily breakfast, lunch, and dinner</li>
                <li>Free travel insurance (only for travelers under 60 years of age)</li>
                <li>Visa fees</li>
                <li>Kannada-speaking tour manager</li>
                <li>Luxury 4x4 Land Cruiser</li>
                <li>2 nights in a 4-star hotel in Nairobi</li>
                <li>2 nights in a 4-star hotel in Masai Mara</li>
                <li>1 night in a 4-star hotel in Naivasha</li>
                <li>All sightseeing entry tickets as per itinerary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">4. Exclusions from Tour Package</h2>
              <p className="mb-4">The following are not included in your package:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal expenses (laundry, minibar, phone calls, drinks, etc.)</li>
                <li>Tips: $5 per day per person for guide and driver (i.e., $25 per person total for 5 days)</li>
                <li>Any meals or services not mentioned in the itinerary</li>
                <li>Additional entrance fees, guides, or optional excursions not listed in the inclusions</li>
                <li>Any visa-related fees not specified</li>
                <li>5% GST and 5% TCS (not included in displayed package cost)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">5. Airline Policies</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Flying Passport Tours Pvt. Ltd. reserves the right to alter airline arrangements, including flight
                  sector, route, boarding/arrival locations, and connections.
                </li>
                <li>
                  Changes may be made due to airline policies, availability, or group needs, and are not always
                  communicated in advance.
                </li>
                <li>Customers are responsible for any additional expenses resulting from such airline changes.</li>
                <li>
                  If delays or cancellations occur, the itinerary may be adjusted. Any customer arriving via a separate
                  flight must arrange to join the group independently.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">6. Visa Process and Responsibility</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>The company will provide all necessary supporting documents for visa applications.</li>
                <li>
                  Visa processing times and approvals are entirely at the discretion of the respective embassies or
                  consulates.
                </li>
                <li>The company cannot guarantee visa approval and is not responsible for delays or rejections.</li>
                <li>
                  In the event of visa rejection, the booking amount and visa fees are non-refundable, but any
                  additional balance paid will be refunded within 7 working days.
                </li>
                <li>If the visa arrives late, the traveler must join the next available group, without refund.</li>
                <li>
                  If one member of a group receives the visa and others do not, those with approved visas are still
                  expected to travel. No refunds will be issued for cancellations under these circumstances.
                </li>
                <li>Applicants must attend VFS or embassy appointments and biometric sessions at their own cost.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">7. Cancellation and Refunds</h2>
              <p className="mb-4">
                Please refer to our Charges and Cancellation Policy for detailed timelines and fees. In summary:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Booking deposit (₹75,000) is non-refundable.</li>
                <li>
                  Refunds (excluding non-refundable charges) will be processed within 7 working days in case of visa
                  rejection, and within 120 days for company-initiated cancellations.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">8. Tour Amendments by the Company</h2>
              <p className="mb-4">
                Flying Passport may amend or cancel tours due to unforeseen circumstances such as government orders,
                natural disasters, or low group size.
              </p>
              <p className="mb-4">In such cases, customers may opt for:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Alternative tour dates</li>
                <li>Travel as individual customers (additional costs borne by customer)</li>
                <li>Refund (after deduction of actual expenses)</li>
              </ul>
              <p>The company is not liable for damages or compensation beyond the amount paid.</p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">9. Health, Safety, and Conduct</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Travelers must be in good health and capable of participating in the group tour.</li>
                <li>Customers are expected to maintain respectful behavior throughout the trip.</li>
                <li>
                  Flying Passport reserves the right to refuse service or remove a traveler if conduct endangers the
                  group or violates local laws.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">10. Liability and Force Majeure</h2>
              <p className="mb-4">
                Flying Passport is not responsible for any loss, injury, delay, or inconvenience caused by:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Natural calamities</li>
                <li>Airline changes or flight cancellations</li>
                <li>Political unrest</li>
                <li>Acts of government or border authorities</li>
                <li>Any third-party service disruptions</li>
              </ul>
              <p>In such events, any extra expenses incurred will be the customer's responsibility.</p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">11. Acknowledgment</h2>
              <p className="mb-4">By booking a tour with Flying Passport Tours Pvt. Ltd., you acknowledge that:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>You have read, understood, and agreed to the Terms and Conditions</li>
                <li>You are responsible for reviewing your travel documents</li>
                <li>You accept the risks involved in international travel</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif font-bold text-2xl mb-4">For assistance, reach us at:</h2>
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
