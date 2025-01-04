import Loading from '@/components/Loading';
import { useUser } from '@clerk/nextjs'
import React from 'react'

const CheckoutWizard = () => {
  const { isLoaded } = useUser();

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
    
    <div className='checkout'>{renderStep()}</div>
  )
}

export default CheckoutWizard
