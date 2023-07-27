import React, { useEffect, useRef, useState } from 'react';
import "./home.scss";
import CodeIcon from '@mui/icons-material/Code';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguageIcon from '@mui/icons-material/Language';
import PreviewIcon from '@mui/icons-material/Preview';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from '../../components/footer/Footer';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import NorthIcon from '@mui/icons-material/North';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Project from '../../components/project/Project';
import { variants } from '../../utils/data';
import { notifySuccess, notifyError } from '../../utils/methods';
import { handleScroll, scrollToTop, sendEmail } from '../../utils/methods';
import { fetcher } from '../../utils/apiRequests';
import Loading from '../../components/loading/Loading';
import { HashLink as Link } from 'react-router-hash-link';
import ViewImage from '../../components/viewImage/ViewImage';

const Home = () => {

  const [opneMenu, setOpenMenu] = useState(false)
  const [occupationActive, setOccupationActive] = useState(false)
  const [aboutActive, setAboutActive] = useState(false)
  const [actionActive, setActionActive] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [openProject, setOpenProject] = useState(false)
  const [projectId, setProjectId] = useState("")
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false)
  const [mailLoading, setMailLoading] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const [image, setImage] = useState("")

  const { scrollYProgress } = useScroll();
  const form = useRef();


  const handleOpenProject = (project) => {
    setProjectId(project);
    setOpenProject(true)
  }

  const handleImageClick = (image) => {
    setImage(image)
    setOpenImage(true)
  }

  useEffect(() => {
    fetcher(setLoading, setProjects, "projects");
  },[])



  const animate = useAnimation()

  const sendEmail = (e) => {
    e.preventDefault();
    setMailLoading(true)

    const emailId = process.env.REACT_APP_EMAIL_ID;
    const templateId = process.env.REACT_APP_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

    emailjs.sendForm(emailId, templateId, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          e.target.reset()
          setMessageSuccess(true)
          setMailLoading(false)
      }, (error) => {
          console.log(error.text);
          setMessageError(true)
          setMailLoading(false)
      });
  };

  useEffect(() => {
    if (messageSuccess === true){
      notifySuccess();
      setTimeout(()=> {
        setMessageSuccess(false)
      }, 5000)

    } else if (messageError === true){
      notifyError();
      setTimeout(()=> {
        setMessageError(false)
      }, 5000)
    }
  }, [messageSuccess, messageError])





   useEffect(() =>{
        if(scrollPosition < 1000) {
          animate.start ({
            y: 100,
            opacity: 0
          })
        }else {
          animate.start({
            y: 0,
            opacity: 1
          })
        }
   },[scrollPosition])



    useEffect(() => {
        window.addEventListener("scroll", () => handleScroll(setScrollPosition), {passive: true});
        
        return () => {
            window.removeEventListener("scroll", () => handleScroll(setScrollPosition))
        }
    }, [])


  
  useEffect(() => {
    setTimeout(()=>{
      setOccupationActive(true)

      setTimeout(()=>{
        setAboutActive(true)

        setTimeout(()=>{
          setActionActive(true)
    
          
        }, 1000)
        
      }, 500)
      
    }, 500)
  })




  return (
    <div className='home'>
      <ToastContainer />

      {openImage && <ViewImage setOpenImage={setOpenImage} image={image}/>}

      {openProject && <Project setOpenProject={setOpenProject} project={projectId}/>}

        <div className="container">


          <motion.span className={scrollPosition > 888 ? "scrollTop active" : "scrollTop"}
           
            animate={animate}
            whileHover={{backgroundColor :"#6d77967a", scale: 1.1}}


            onClick={scrollToTop}
          
          >
            <NorthIcon className='icon'/>
          </motion.span>


          <div className="intro height" id='intro'>

            <motion.div className="grouped"
            
                initial={{translateY: "-100%", opacity: 0}}
                animate={{translateY: "0%", opacity:1}}
                transition={{duration: 2, easing: "ease-in-out"}}
            >
              <span className="tag">
                Hi, My name is
              </span>
              <h1 className="name">Dakalo Mbulaheni.</h1>
            </motion.div>
            
            <motion.h2 className="occupation"
              initial={{translateX: "-100%", opacity: 0}}
              animate={occupationActive && {translateX: "0%", opacity:1}}
              transition={{duration: 2, easing: "ease-in-out"}}
            >
              I am a full stack web developer.
            </motion.h2>
            <motion.p className="aboutMe"
              initial={{translateX: "100%", opacity: 0}}
              animate={aboutActive && {translateX: "0%", opacity:1}}
              transition={{duration: 2, easing: "ease-in-out"}}
            >
              I'm developing creative and interactive web applications. As a front-end developer, i build interactive and user friendly apps
                using cutting-edge technologies to produce high-quality web applications. As a Back-end developer, i build APIs and and databases to process data from 
                and to the the client applications to provide full functionality that solve real world problems.
            
            </motion.p>
            <motion.a href="#projects" className='introBtn'

              initial={{translateY: "100%", opacity: 0}}
              animate={actionActive && {translateY: "0%", opacity:1}}
              whileHover={{backgroundColor: "#6d7796", color: "white"}}
              transition={{duration: 0.5, easing: "ease-in-out"}}
            >
              Check out my work
            </motion.a>
          </div>


          <motion.div className="skills height" id='skills'
            initial="skillOffscreen"
            whileInView={"skillOnscreen"}
            transition={{ ease: "easeInOut", duration: 2 }}
           
          >
            <span className="title">
              <pre>
              &lt;Skills&gt;
              </pre>
            </span>
            <span className="desc">An overview of my technical skills</span>
            
            
            <div className="skillContainer">
                <motion.div className="skill"
                  initial={{y:"50%"}}
                  whileInView={{y:0}}
                  transition={{ ease: "easeInOut", duration: 1 }}
                >
                    <div className="top">
                      <TerminalIcon className='icon' />
                      <span className="skillTitle">Frontend Developer</span>
                      <p className="skillInfo">
                        I like to code things from scratch, and enjoy bringing ideas to life in the browser.
                      </p>
                    </div>

                    <div className="languages">
                      
                      <ul>
                        <li>
                          <div className="wrapper">
                            <img src="/img/html-5.png" alt="" />
                            <span>HTML</span>
                          </div>
                        </li>
                        <li>
                          <div className="wrapper">
                            <img src="/img/css3.png" alt="" />
                            <span>CSS</span>
                          </div>
                        </li>
                        <li>
                          <div className="wrapper">
                            <img src="/img/javascript.png" alt="" />
                            <span>JavaScript</span>
                          </div>
                        </li>

                        <li>
                          <div className="wrapper">
                            <img src="/img/react1.png" alt="" />
                            <span>React</span>
                          </div>
                        </li>
                        <li>
                          <div className="wrapper">
                            <img src="/img/mui.png" alt="" />
                            <span>Material UI</span>
                          </div>
                        </li>
                        <li>
                          <div className="wrapper">
                            <img src="/img/redux.png" alt="" />
                            <span>Redux</span>
                          </div>
                        </li>
                        <li>
                          <div className="wrapper">
                            <img src="/img/typescript.png" alt="" />
                            <span>Typescript</span>
                          </div>
                        </li>
                        
                        
                      </ul>
                    </div>

                    
                </motion.div>
                <motion.div className="skill"
                     initial={{x:"50%"}}
                     whileInView={{x:0}}
                     transition={{ ease: "easeInOut", duration: 1 }}
                >
                    <div className="top">
                      <CodeIcon className='icon' />
                      <span className="skillTitle">Backend Developer</span>
                      <p className="skillInfo">
                        I like how data is processed behind the scenes, and i enjoy building my own APIs
                      </p>
                    </div>

                    <div className="languages">
                      
                      <ul>
                      <li>
                          <div className="wrapper">
                            <img src="/img/javascript.png" alt="" />
                            <span>JavaScript</span>
                          </div>
                        </li>
                        <li>
                            <div className="wrapper">
                              <img src="/img/node-js.png" alt="" />
                              <span>Node</span>
                            </div>
                          </li>
                          <li>
                            <div className="wrapper">
                            <img src="/img/node-js.png" alt="" />
                              <span>Epress</span>
                            </div>
                          </li>
                          <li>
                            <div className="wrapper">
                              <img src="/img/mongodb.png" alt="" />
                              <span>MongoDb</span>
                            </div>
                          </li>
                          
                      </ul>
                    </div>

                    
                </motion.div>
            </div>

            <span className="title last">
              <pre>
              &lt;Skills/&gt;
              </pre>
            </span>
          </motion.div>

          <div className="projects" id="projects"
              
          >
            <span className="title">
              <pre>
              &lt;My Latest Work&gt;
              </pre>
            </span>
            {/* <p className="desc">
              The projects below include full website access, a detailed information for 
              each project and a youtube video where i test each project
            </p> */}

            {
              loading? <Loading /> :
              projects && projects.length > 0 ?
              <div className="projectList">
                
                {
                  projects.map((item, count) => (

                    <motion.div className={count % 2 === 0 ?  "listItem even" : "listItem "} 
                      initial={count % 2 === 0 ? "projectsOffscreenRight" : "projectsOffscreenLeft"}
                      whileInView="onscreen"
                      variants={variants}
                      transition={{ ease: "easeOut", duration: 1 }}
                      
                      key={item._id}
                    >
                      {
                        item.image &&
                        <div className="imgContainer">
                          <img src={item.image} 
                            alt="project Image" onClick={() => handleImageClick(item.image)}/>
                        </div>
}                     
                      <div className="info">
                        <span className="type">{item.category}</span>
                        <span className="projectTitle">{item.title}</span>
                        <p className='productDesc'>
                         {item.desc}
                        </p>


                        <div className="actions">
                          <Link to={item.webLink} className='website link'><LanguageIcon className='icon'/>Full wbsite</Link>
                          <Link to={item.gitHubLink} className='git link'><GitHubIcon className='icon'/>Source code</Link>
                          <span className='details' onClick={() => handleOpenProject(item)}><PreviewIcon className='icon'/>Project Detail</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                }
                
                
                
                
                
              </div>
              :
              <span className="noDataText">Nothing found!</span>

            }
            <span className="title last">
              <pre>
              &lt;/My Latest Work&gt;
              </pre>
            </span>
          </div>

          <div className="contactSection" id='contact'>

            <span className="title">
              <pre>
                &lt;Get in touch&gt;
              </pre>
            </span>

            <div className="wrapper">
              <motion.div className="left"
                  initial="leftOffscreen"
                  whileInView="leftOnscreen"
                  variants={variants}
                  transition={{ ease: "easeOut", duration: 1 }}
              >
                {/* <span className='talkTitle'>Talk to me</span> */}
                <div className="listItem">
                    <img src="/img/email.png" alt="" />
                    <span className='social'>Email</span>
                    <span className='value'>mbulahenidev@gmail.com</span>

                    <span className="action">
                      Write me 
                      <ArrowForwardIcon className='icon'/>
                    </span>
                </div>
                
                <div className="listItem">
                    <PhoneInTalkOutlinedIcon className='icon'/>
                    <span className='social' >Phone Call</span>
                    <span className='value'>(+27) 072 134 4014</span>

                    
                </div>

              </motion.div>

              <motion.div className="right"
                  initial="rightOffscreen"
                  whileInView="rightOnscreen"
                  variants={variants}
                  transition={{ ease: "easeOut", duration: 1 }}
              >
                  <div className="formContainer">
                      <form action="" ref={form} onSubmit={sendEmail}>

                        <span className="header">Talk to me</span>
                        <div className="inputGroup">
                          <label htmlFor="name"> Name</label>
                          <input type="text" required placeholder='John Doe' name='user_name' />
                        </div>
                        <div className="inputGroup">
                          <label htmlFor="email"> Email</label>
                          <input type="email" required placeholder='JohnDoe@gmail.com' name='user_email'/>
                        </div>
                        <div className="inputGroup">
                          <label htmlFor="message"> Message</label>
                          <textarea className='textarea' required placeholder='Enter your message here' name='user_message'></textarea>
                        </div>

                        <button>
                          {
                            mailLoading ? <Loading size={25} color={"white"}/> :
                            <>
                              Send message  <SendIcon className='icon' type="submit"/>
                            </>
                          }
                        </button>
                        
                      </form>
                  </div>
              </motion.div>
            </div>

            <span className="title last">
              <pre>
                &lt;/Get in touch&gt;
              </pre>
            </span>
          </div>

          <Footer />
        </div>
    </div>
  )
}

export default Home