
import { useState } from 'react';
import ChattingIllustration from '../../assets/chatting.svg?react';
import Logo from '../../assets/logo.svg?react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export default function LoginPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* LEFT PANEL */}
      <div className="flex flex-col flex-1 px-12 lg:px-20 py-10">
        <div className="flex items-center">
          <Logo className='w-10 h-10' />
          <span className="text-sm font-semibold text-gray-800">Sphere</span>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-sm">
          <h1 className="text-5xl font-black text-gray-900 leading-tight mb-3">
            Holla,<br />Welcome Back
          </h1>
          <p className="text-gray-400 text-sm mb-10">
            Hey, welcome back to your special place
          </p>
          <div className="space-y-4 mb-5">
            {isLoginForm ? <LoginForm setIsLogin={setIsLoginForm} /> : <RegisterForm setIsLogin={setIsLoginForm} />}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:block md:w-[40%] lg:w-[45%] xl:w-[48%] p-4">
        <div className="flex items-center justify-center w-full h-full rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #b48ef5 0%, #8b5cf6 35%, #6d28d9 70%, #5b21b6 100%)"
          }}
        >
          <ChattingIllustration className="h-4/5 w-auto max-w-full lg:p-10" />
        </div>
      </div>
    </div>
  )
}