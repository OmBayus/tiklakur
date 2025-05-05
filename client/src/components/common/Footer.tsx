import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-[#f9f9f9]">
      <div className="px-4 sm:px-8 lg:px-[144px] grid grid-cols-1 lg:grid-cols-12 gap-6 py-20 items-stretch">
        {/* Feedback (sol) */}
        <div className="lg:col-span-4 bg-white rounded-lg px-6 sm:px-10 py-10 flex flex-col justify-start">
          <h6 className="text-xs uppercase text-purple-600 mb-4">FEEDBACK</h6>
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl text-gray-400 leading-snug">
              Seeking personalized support?{' '}
              <span className="text-black">Request a call from our team</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 text-gray-700"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="+90 (500) 00 00"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 text-gray-700"
                />
              </div>
              <button className="w-fit px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors cursor-pointer">
                Send a request
              </button>
            </div>
          </div>
        </div>

        {/* Sağ taraf */}
        <div className="lg:col-start-6 lg:col-span-7 flex flex-col justify-between">
          {/* Üst bilgi kısmı */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {/* INFO */}
              <div>
                <h6 className="text-xs uppercase text-purple-600 mb-2">INFO</h6>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>
                    {' '}
                    <a href="#">Company</a>
                  </li>
                  <li>
                    {' '}
                    <a href="#">Products</a>
                  </li>
                  <li>
                    {' '}
                    <a href="#">Engineering</a>
                  </li>
                  <li>
                    {' '}
                    <a href="#">Services</a>
                  </li>
                  <li>
                    {' '}
                    <a href="#">Productions</a>
                  </li>
                </ul>
              </div>

              {/* ABOUT US */}
              <div>
                <h6 className="text-xs uppercase text-purple-600 mb-2">
                  ABOUT US
                </h6>

                <ul className="text-sm space-y-1 text-gray-700">
                  <li>
                    {' '}
                    <a href="#">Gallery</a>
                  </li>
                  <li>
                    {' '}
                    <a href="#">Technologies</a>
                  </li>
                  <li>
                    {' '}
                    <a href="#">Contacts</a>
                  </li>
                </ul>
              </div>

              {/* CONTACT US */}
              <div>
                <h6 className="text-xs uppercase text-purple-600 mb-2">
                  CONTACT US
                </h6>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>+1 (999) 999-99-99</li>
                  <li>hello@logoipsum.com</li>
                  <li>London</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Alt sosyal medya + telif (feedback ile aynı seviyeye hizalı) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
            <div>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'youtube', 'twitter'].map(
                  (icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-2 rounded-full border border-gray-200 hover:border-purple-600 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                  ),
                )}
              </div>
            </div>

            <div className="sm:col-start-3 flex justify-end items-center">
              <p className="text-sm text-gray-400">© 2023 — Copyright</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
