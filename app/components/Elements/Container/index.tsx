import React from 'react'

const index = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`${className} mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`}>
            {children}
        </div>
    )
}

export default index
