import React from 'react'
const Header = React.memo(() => {
  return (
    <header className='navbar' role="navigation">
      <div className='container'>
        <div className='navbar-brand'>
          <a className='navbar-item is-size-5' href='../'>
            FreightHub Shipments Search
          </a>
        </div>
      </div>
    </header>
  )
})
export default Header