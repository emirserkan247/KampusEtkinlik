import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordPage() {
  useDocumentTitle("Şifremi Unuttum");
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      setError("Geçerli bir e-posta adresi giriniz.");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
  }

  return (
    <>
      <h2>Şifremi Unuttum</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
        />
        {error && <p className="hata-mesaji" role="alert">{error}</p>}
        <button type="submit">Sıfırlama bağlantısı gönder</button>
        {success && (
          <p className="basari" role="status">
            Sıfırlama bağlantısı gönderildi! (demo)
          </p>
        )}
      </form>
      <p>
        <Link to="/login">Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;
