import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <footer className="main_footer">
      <span>
        @Copyright | <b>Villanueva, Francisco</b>
      </span>

      <div className="redes_footer">
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
    </footer>
  );
}
