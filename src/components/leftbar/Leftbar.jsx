import React from 'react'
import "./leftbar.scss";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

const Leftbar = () => {
  return (
    <div className='leftbar'>
        <ul className="icons">

          <Link to="https://github.com/DakaloM" style={{textDecoration: "none", color: "inherit"}}>
            <li><GitHubIcon className='icon'/></li>
          </Link>
          <Link to="https://www.linkedin.com/in/dakalo-mbulaheni-021a5b242/" style={{textDecoration: "none", color: "inherit"}}>
            <li><LinkedInIcon className='icon' /></li>
          </Link>
        </ul>
    </div>
  )
}

export default Leftbar