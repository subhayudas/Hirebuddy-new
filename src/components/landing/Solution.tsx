export const Solution = () => {
  return (
    <section className="w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center bg-[#d35c65]">
      {/* Badge */}
      <div className="inline-flex items-center rounded-full bg-[#e59ca2] px-4 py-1.5 mb-8">
        <span className="text-sm font-medium text-[#ffffff]">The Solution</span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-mabry font-semibold text-white text-center max-w-4xl mb-16">
        Experience a hassle-free way to secure your{" "}
        <span className="underline decoration-4 underline-offset-8">
          dream role
        </span>
        .
      </h2>

      {/* Cards Container */}
      <div className="w-full max-w-7xl bg-[#fff7f8] rounded-3xl p-8 md:p-16 border-8 md:border-16 border-[#ffb8b8]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative w-full aspect-square">
              <img
                src="/solution/first.svg"
                alt="Save time illustration"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-light text-[#403334]">
              Save time on applications and invest{" "}
              <span className="hidden md:inline">
                <br />
              </span>
              it in more productive pursuits.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative w-full aspect-square">
              <img
                src="/solution/second.svg"
                alt="Stand out illustration"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-light text-[#403334]">
              Stand out with tailored applications{" "}
              <span className="hidden md:inline">
                <br />
              </span>
              that highlight your strengths.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative w-full aspect-square">
              <img
                src="/solution/third.svg"
                alt="Feel secure illustration"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-light text-[#403334]">
              Feel secure knowing your job search{" "}
              <span className="hidden md:inline">
                <br />
              </span>
              is expertly handled for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 