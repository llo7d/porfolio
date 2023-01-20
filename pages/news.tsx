import Head from 'next/head'
import React from 'react'

const News = () => {
    return (
        <div>
            <div>
                <Head>
                    <title>News</title>
                    <meta property="og:title" content="News" key="news" />
                    <link rel="icon" href="/images/favicon.png" />
                </Head>

                <main className="bg-gray-900 min-h-screen py-14 px-28">
                    {/* Top bar */}
                    <div className="w-[960px] mx-auto">
                        {/* Create a text that is in the center of the page, that says My POSTS */}
                        <div className="flex items-center justify-center ">
                            <h1 className="text-4xl font-bold text-white">News</h1>

                        </div>


                        <div className="flex items-center justify-between mb-16">


                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default News