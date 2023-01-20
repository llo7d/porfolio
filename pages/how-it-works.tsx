import Head from 'next/head'
import React from 'react'

const HowItWorks = () => {
    return (
        <div>
            <div>
                <Head>
                    <title>How it works</title>
                    <meta property="og:title" content="How it works" key="howitworks" />
                    <link rel="icon" href="/images/favicon.png" />
                </Head>

                <main className="bg-gray-900 min-h-screen py-14 px-28">
                    {/* Top bar */}
                    <div className="w-[960px] mx-auto">
                        {/* Create a text that is in the center of the page, that says My POSTS */}
                        <div className="flex items-center justify-center ">
                            <h1 className="text-4xl font-bold text-white">How it works</h1>

                        </div>


                        <div className="flex items-center justify-between mb-16">


                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default HowItWorks