import React from "react";
export function Header({}) {
  return <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <a className='navbar-item' href='../'>
              FreightHub Shipments Search
            </a>
            <span className='navbar-burger burger' data-target='navbarMenu'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id='navbarMenu' className='navbar-menu'>
            <div className='navbar-end'>
              <div className=' navbar-item'></div>
              <a className='navbar-item is-active is-size-5 has-text-weight-semibold'>
                About
              </a>
            </div>
          </div>
        </div>
      </nav>;
}
