import React from 'react'

function Footer() {
  return (
    <>
<footer>
  <div>
    <div className="footer-logo">HeartLink<span>.</span></div>
    <p className="footer-tagline">Where meaningful connections happen every day. For people who believe in real love.</p>
    <div className="footer-socials">
      <div className="social-btn">𝕏</div>
      <div className="social-btn">in</div>
      <div className="social-btn">ig</div>
    </div>
  </div>
  <div className="footer-col">
    <h4>Product</h4>
    <ul>
      <li><a href="#">How It Works</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Success Stories</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>Company</h4>
    <ul>
      <li><a href="#">About Us</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Press</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>Legal</h4>
    <ul>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms of Service</a></li>
      <li><a href="#">Cookie Policy</a></li>
      <li><a href="#">Safety Tips</a></li>
    </ul>
  </div>
</footer>
<div className="footer-bottom">
  <div className="footer-copy">© 2025 Velour Inc. All rights reserved.</div>
  <div className="footer-copy">Made with ♥ for people who believe in love</div>
</div>  
    </>
  )
}


export default Footer