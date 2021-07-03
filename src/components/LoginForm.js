import React from 'react'

const LoginForm = ({
   handleSubmit,
   handleEmailChange,
   handlePasswordChange,
   email,
   password
  }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Email</p>
            <input
            class ="rounded border-2 border-gray-300 bg-blue-50"
            type="text"
            value={email}
            name="Email"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <p>Password</p>
            <input
            class ="rounded border-2 border-gray-300 bg-blue-50"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" class="bg-blue-600 hover:opacity-80 text-white rounded-full px-6 mt-2">Log In</button>
      </form>
    </div>
  )
}

export default LoginForm