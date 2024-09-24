import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <>
  <div className="swm-site-loader" />
  <div id="swm-page">
    <div id="swm-outer-wrap" className="clear">
      <div id="swm-wrap" className="clear">
        <div
          id="content"
          className="swm-main-container swm-site-content swm-anim"
        >
          <div className="swm_site_content_wrap swm-container" />
          {children}
          <div className="clear" />
        </div>
        {/* .swm-main-container */}
      </div>
      {/* #swm-wrap */}
    </div>
    {/* #swm-outer-wrap */}
  </div>
  {/* end #swm-page */}
</>

  )
}

export default HomeLayout