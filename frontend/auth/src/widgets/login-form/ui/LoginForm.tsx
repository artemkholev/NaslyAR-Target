import React, { useState } from "react";
// import { useAuth } from "host/useAuth";

export const LoginForm = () => {
  // const { login, accessToken } = useAuth();
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // await login(loginInput, password);
      // console.log("✅ Login successful! Access Token:", accessToken);
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type='text'
        placeholder='Логин'
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        className='border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary'
        required
      />
      <input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary'
        required
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <button
        type='submit'
        className='bg-gradient-bg text-white py-2 rounded-2xl disabled:opacity-50'
        disabled={loading}>
        {loading ? "Входим..." : "Войти"}
      </button>
    </form>
  );
};
