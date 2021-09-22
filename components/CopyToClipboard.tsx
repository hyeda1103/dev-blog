import React, { useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDarkMode from 'use-dark-mode'

import { LinkIcon } from '@/styles/copyToClipboard'

export default function CopyToClipboard() {
  const darkmode = useDarkMode(true)

  const notify = () => toast("클립보드에 이 글의 주소가 복사되었습니다.");
  
  const handleClick = () => {    
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
    notify()
  }
  
  return (
    <>
      <LinkIcon onClick={handleClick} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme={darkmode.value ? 'dark' : 'light'}
        style={{ fontSize: "13px" }}
      />
    </>
  )
}
