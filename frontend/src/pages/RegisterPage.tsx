import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialData: RegisterData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  useDocumentTitle("Kayıt Ol");
  const [formData, setFormData] = useState<RegisterData>(initialData);
  const [errors, setErrors] = useState<Partial<RegisterData>>({});
  const [success, setSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccess(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: Partial<RegisterData> = {};
    if (formData.name.trim().length < 3) {
      found.name = "Ad soyad en az 3 karakter olmalıdır.";
    }
    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      found.email = "Geçerli bir e-posta adresi giriniz.";
    }
    if (formData.password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }
    if (formData.confirmPassword !== formData.password) {
      found.confirmPassword = "Şifreler eşleşmiyor.";
    }
    setErrors(found);
    const ok = Object.keys(found).length === 0;
    setSuccess(ok);
    if (ok) setFormData(initialData);
  }

  function field(
    name: keyof RegisterData,
    label: string,
    type: "text" | "email" | "password",
  ) {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          aria-invalid={errors[name] ? true : undefined}
        />
        {errors[name] && (
          <p className="hata-mesaji" role="alert">{errors[name]}</p>
        )}
      </>
    );
  }

  return (
    <>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit} noValidate>
        {field("name", "Ad Soyad", "text")}
        {field("email", "E-posta", "email")}
        {field("password", "Şifre", "password")}
        {field("confirmPassword", "Şifre (tekrar)", "password")}
        <button type="submit">Kayıt Ol</button>
        {success && (
          <p className="basari" role="status">
            Kayıt başarılı! (demo)
          </p>
        )}
      </form>
      <p>
        Zaten hesabınız var mı? <Link to="/login">Giriş yap</Link>
      </p>
    </>
  );
}

export default RegisterPage;
