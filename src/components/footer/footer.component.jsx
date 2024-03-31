import "./footer.style.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  return (
    <footer className="footer">
      <a
        className="footer-link"
        href="https://www.instagram.com/hoophouse.lb"
        target="_blank"
      >
        Contact us on Instagram
      </a>

      {/*<a href="tel:0096176692293" target="_blank">
        <CallIcon />
      </a>

      <a
        href="https://wa.me/96176692293?text=I'm%20interested%20in%20your%20amazing%20shoes"
        target="_blank"
      >
        <WhatsAppIcon />
  </a>*/}
    </footer>
  );
}
