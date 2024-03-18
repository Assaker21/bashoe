import "./footer.style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://www.instagram.com" target="_blank">
        Check us out on instagram
      </a>
      <span>—</span>
      <a href="tel:0096181749649" target="_blank">
        Give use a call
      </a>
      <span>—</span>
      <a
        href="https://wa.me/96181749649?text=I'm%20interested%20in%20your%20amazing%20shoes"
        target="_blank"
      >
        Contact us on Whatsapp
      </a>
    </footer>
  );
}
