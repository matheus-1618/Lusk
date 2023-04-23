import React from "react";
import "./transcripts.css";
import { useEffect, useState, useRef } from 'react';
import { AiOutlineRead } from "react-icons/ai";
import { AiOutlineDelete,AiOutlineSearch,AiFillDatabase,AiOutlineCloudServer,AiOutlinePlayCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import LoadingSpinner from "../spinner/spinner";
import Bar from "../bar/bar";



export default function Transcripts(props) {
        return (
        <div className="Transcript">
          <header className="Transcript-header">
          <Bar home={false}/> 
          </header>
      </div>)
 }