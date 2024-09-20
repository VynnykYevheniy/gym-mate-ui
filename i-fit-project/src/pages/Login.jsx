export default function Login() {
    return (
        <>
    <main className="flex flex-col justify-center p-6 pb-12">
      <div className="mx-auto max-w-md">
        <svg className="mx-auto h-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path strokeLinecap={"round"} strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">Welcome back!</h2>
      </div>
      <div className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10">
        <div className="flex gap-3 rounded-md border border-red-500 bg-red-50 p-4 hidden">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule={"evenodd"} d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3 className="text-sm font-medium text-red-800">These credentials do not match our records.</h3>
        </div>
        <form action="#" autoComplete={"off"} className="mt-6 space-y-6">
          <div>
            <label for="login" className="block text-md font-medium text-gray-700">Login</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path strokeLinecap={"round"}  strokeLinejoin={"round"}  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <input type="login" id="login" name="login" className="w-full rounded-md border-gray-300 pl-10 text-md focus:border-green-500 focus:ring-green-500" placeholder="Login" />
            </div>
          </div>

          <div>
            <label for="password" className="block text-md font-medium text-gray-700">Password</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path strokeLinecap={"round"} strokeLinejoin={"round"} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <input type="password" id="password" name="password" minLength={"8"} className="w-full rounded-md border-gray-300 pl-10 text-md focus:border-green-500 focus:ring-green-500" placeholder="Minimum 8 characters" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" name="remember" className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <label for="remember" className="text-sm text-gray-900">Remember me</label>
            </div>
            <a href="forgot-password.html" className="text-sm font-medium text-green-600 hover:text-green-500">Forgot your password?</a>
          </div>

          <div>
            <a href="forgot-password.html" className="flex items-center justify-center rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Sign In</a>
          </div>
        </form>
      </div>
    </main>
        </>
    )
}