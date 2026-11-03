import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function NotFoundPage() {
  useDocumentTitle("Sayfa Bulunamadı");

  return (
    <section className="hata">
      <h2>404 – Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/">Ana sayfaya dön</Link>
    </section>
  );
}

export default NotFoundPage;
