import Head from "next/head";
import React from "react";

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

            <div className="flex items-center justify-between mb-4">
              <div className="flex-column text-center">
                <h1 className="text-white text-center font-sans font-medium text-2xl mb-4">
                  What is Portfolio
                </h1>
                <p className="text-white my-1">
                  A portfolio is a collection of their work and projects that
                  showcases their skills and abilities to potential employers or
                  clients. A developer portfolio is an important tool for
                  establishing credibility and demonstrating their expertise in
                  a particular field or technology.
                </p>
              </div>
              <div className="flex-column text-center">
                <h1 className="text-white text-center font-sans font-medium text-2xl mb-4">
                  Why Use it
                </h1>
                <p className="text-white">
                  There are several reasons why someone might use a portfolio:
                  <li>
                    Diversification: By holding a mix of different types of
                    investments, a portfolio can help to spread out risk. This
                    way, if one investment performs poorly, the impact on the
                    overall portfolio is lessened.
                  </li>
                  <li>
                    Long-term growth: A well-constructed portfolio can help an
                    individual or organization achieve long-term growth in their
                    wealth.
                  </li>
                  <li>
                    Better returns: By including investments that have the
                    potential for higher returns, a portfolio can help to
                    increase overall returns.
                  </li>
                  <li>
                    Meeting financial goals: A portfolio can be tailored to meet
                    specific financial goals,
                  </li>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HowItWorks;
