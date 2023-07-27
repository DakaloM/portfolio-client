import React, { useEffect, useState } from 'react';
import "./project.scss";
import CloseIcon from '@mui/icons-material/Close';
import Content from '../content/Content';
import LanguageIcon from '@mui/icons-material/Language';
import PreviewIcon from '@mui/icons-material/Preview';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { fetcher } from '../../utils/apiRequests';
import Loading from '../loading/Loading';

const Project = ({setOpenProject, project}) => {

  const [extras, setExtras] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetcher(setLoading, setExtras, `extras/project/${project._id}`)
  }, [])
  return (
    <div className='project'>

      <div className="wrapper">

        <span className="close" onClick={() => setOpenProject(false)}><CloseIcon className='icon'/></span>

        {
          loading? <Loading color={"#6d7796"}/> :
          extras && extras.length > 0 ?
            <div className="list">

              {
                extras.map((item, count) => (

                  <Content data={item} reverse={count % 2 === 0}/>
                ))
              }

            </div>

            :
            <span className="noDataText">Nothing found</span>

        }


        <div className="links">
          <Link to={project.webLink} className='websiteLink redirectLink'><LanguageIcon className='icon'/>Full website</Link>
          <Link to={project.gitHubLink} className='gitLink redirectLink'><GitHubIcon className='icon'/>Source code</Link>
        </div>
      </div>
    </div>
  )
}

export default Project