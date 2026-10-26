import React, { Suspense } from 'react'
import FetchDetails from '../components/FetchDetails'

export const metadata = {
    title: "Website Audit | Page Lens",
}

const page = () => {
    return (
        <main>
            {/* useSearchParams in FetchDetails requires a Suspense boundary */}
            <Suspense>
                <FetchDetails />
            </Suspense>
        </main>
    )
}

export default page
