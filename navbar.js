// navbar.js
class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar a {
          color:white;
          text-decoration:none;
        }
        
        .navbar a:hover {
          text-decoration:underline;
        }
        
        .navbar {
          background:#1d6894;
          color:white;
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          gap:20px;
          padding:20px;
          align-items:center;
        }
        
        .mainitems {
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          gap:20px;
          font-size:25pt;
        }
        
        .tokens {
          float:right;
          border:2px solid white;
          border-radius:10px;
          padding:10px;
          font-size:20pt;
          transition:background 0.3s ease, color 0.3s ease;
        }
        
        .tokens:hover {
          text-decoration:none !important;
          background:white;
          color:black;
        }
      </style>
      <div class="navbar">
        <div class="mainitems">
          <a style="display:flex;align-items:center;" href="/" class="item"><img style="height:50px;" src="chickencoop.png"></a>
          <a href="/games" class="item">All Games</a>
        </div>
        <a href="/tokens.html" class="item tokens">0 tokens</a>
      </div>
    `;
  }
}

customElements.define('nav-bar', NavBar);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('nav-bar').shadowRoot.querySelector('.tokens').innerText=(localStorage.getItem('tokens')||0)+' tokens'
})