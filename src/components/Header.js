import React from 'react';

function header() {
    return (
        <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a class="nav-link active" href="">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
    )
}

export default header;