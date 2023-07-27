
import { ToastContainer, toast } from 'react-toastify';



export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

export const handleScroll = (setScrollPosition) => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }
export const notifySuccess = () => {
    toast.success('Message sent successfuly', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

export  const notifyError = () => {
    toast.error('Error! Somethiong went wrong', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
