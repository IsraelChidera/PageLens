import React from 'react'

const index = ({ children, className }: { children: React.ReactNode, className?: string, id?: any }) => {
    return (
        <div className={`${className} mx-auto max-w-[1300px] w-11/12`}>
            {children}
        </div>
    )
}

export default index