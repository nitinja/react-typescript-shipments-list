import React from "react";
export function SearchBar({}) {
  return <div className='field has-addons'>
            <div className='control search-input-container'>
              <input className='input search-input' type='text' placeholder='Find a repository' />
            </div>
            <div className='control'>
              <a className='button is-info'>
              <i className='fas fa-search'></i>
              </a>
            </div>

        </div>;
}
