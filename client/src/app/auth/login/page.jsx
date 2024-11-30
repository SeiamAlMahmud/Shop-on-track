import Select from '@/components/Select';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div>
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                Seamless Login for Exclusive Access
              </h2>
              <p className="text-sm mt-6 text-gray-800">
                Immerse yourself in a hassle-free login journey with our
                intuitively designed login form. Effortlessly access your
                account.
              </p>
              <p className="text-sm mt-12 text-gray-800">
                Don't have an account{' '}
                <Link
                  href="/auth/signup"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
            </div>

            <form className="max-w-md md:ml-auto w-full">
              <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                Sign in
              </h3>

              <div className="space-y-4">
             
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="jajvascript:void(0);"
                      className="text-blue-600 hover:text-blue-500 font-semibold"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
