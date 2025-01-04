"use client"

import Loading from '@/components/Loading';
import WizardStepper from '@/components/WizardStepper';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import { useUser } from '@clerk/nextjs'
import React from 'react'

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) {
    return <Loading />;
  }

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return "Details"
      case 2:
        return "Payment"
      case 3:
        return "Completed"
      default:
        return "Details"
    }
  }

  return (
    <div className='checkout'><WizardStepper currentStep={checkoutStep} />{renderStep()}</div>
  )
}

export default CheckoutWizard
