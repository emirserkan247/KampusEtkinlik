import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface LoginData {
  email: string;
  password: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  useDocumentTitle("Giriş Yap");
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [success, setSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccess(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: Partial<LoginData> = {};
    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      found.email = "Geçerli bir e-posta adresi giriniz.";
    }
    if (formData.password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }
    setErrors(found);
    setSuccess(Object.keys(found).length === 0);
  }

  return (
    <>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && <p className="hata-mesaji" role="alert">{errors.email}</p>}

        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          aria-invalid={errors.password ? true : undefined}
        />
        {errors.password && (
          <p className="hata-mesaji" role="alert">{errors.password}</p>
        )}

        <button type="submit">Giriş Yap</button>
        {success && (
          <p className="basari" role="status">
            Giriş başarılı! (demo)
          </p>
        )}
      </form>
      <p>
        <Link to="/forgot-password">Şifremi unuttum</Link> ·{" "}
        <Link to="/register">Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;
