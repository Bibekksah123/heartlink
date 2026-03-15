import React from 'react'

function ScrollingTransition() {
  const marqueeItems = [
    "Real Connections",
    "Intelligent Matching",
    "4.2M+ Members",
    "Verified Profiles",
    "Privacy First",
    "Success Stories",
    "Deep Compatibility",
    "98K Couples Formed",
  ];
  
  return (
    <div className="marquee-wrap">
      <div className="marquee-track" id="marquee">
        {marqueeItems.map((item, index) => (
          <div className="marquee-item" key={index}>
            {item}
            <div className="marquee-dot">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollingTransition