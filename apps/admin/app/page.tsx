"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardPage } from "@/components/pages/dashboard"
import { ContactFormPage } from "@/components/pages/contact-form"
import { EarlyAccessFormPage } from "@/components/pages/early-access-form"
import { TourBookingFormPage } from "@/components/pages/tour-booking-form"
import { HomepageEnquiryFormPage } from "@/components/pages/homepage-enquiry-form"
import { FamilyPackageNotifyFormPage } from "@/components/pages/family-package-notify-form"
import { AnalyticsPage } from "@/components/pages/analytics"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "contact-form":
        return <ContactFormPage />
      case "early-access":
        return <EarlyAccessFormPage />
      case "tour-booking":
        return <TourBookingFormPage />
      case "homepage-enquiry":
        return <HomepageEnquiryFormPage />
      case "family-package":
        return <FamilyPackageNotifyFormPage />
      case "analytics":
        return <AnalyticsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  )
}
