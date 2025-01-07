import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useCurrentCourse } from '@/hooks/useCurrentCourse'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CheckoutDetailsPage = () => {
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse()
  const searchParam = useSearchParams()
  const showSignUp = searchParam.get('signup') === 'true'

  if (isLoading) {
    return <Loading />
  }

  if (isError || !selectedCourse) {
    return <Error isError={isError} courses={selectedCourse} />
  }

  return (
    <div>CheckoutDetailsPage</div>
  )
}

export default CheckoutDetailsPage
