import React from 'react';
import './button.css';


export function  Button() {

    addEventListener('click', function() {
        document.body.classList.toggle('nav-open');
    });
    return (
        <button className="navbar-toggle" aria-label="Abrir menú">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
    )

}