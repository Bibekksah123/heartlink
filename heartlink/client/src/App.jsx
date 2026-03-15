import React from 'react'
import './App.css'
import { AppRouter } from './routes/routes/Routes';
import { useEffect } from 'react';
import {  Toaster } from "react-hot-toast";


function App() {
 useEffect(() => {
   /* cursor animation */
   const dot = document.getElementById("cursor-dot");
   const ring = document.getElementById("cursor-ring");
   let mx = 0,
     my = 0,
     rx = 0,
     ry = 0;
   const onMouseMove = (e) => {
     mx = e.clientX;
     my = e.clientY;
   };
   function animCursor() {
     if (!dot || !ring) return;
     dot.style.left = mx + "px";
     dot.style.top = my + "px";
     rx += (mx - rx) * 0.12;
     ry += (my - ry) * 0.12;
     ring.style.left = rx + "px";
     ring.style.top = ry + "px";
     requestAnimationFrame(animCursor);
   }
   document.addEventListener("mousemove", onMouseMove);
   animCursor();

   const hoverEls = [];
   const onHover = () => {
     if (!ring || !dot) return;
     ring.style.width = "54px";
     ring.style.height = "54px";
     ring.style.borderColor = "rgba(224,123,138,0.8)";
     dot.style.transform = "translate(-50%,-50%) scale(0)";
   };
   const onLeave = () => {
     if (!ring || !dot) return;
     ring.style.width = "36px";
     ring.style.height = "36px";
     ring.style.borderColor = "rgba(224,123,138,0.5)";
     dot.style.transform = "translate(-50%,-50%) scale(1)";
   };
   const addHover = () => {
     document
       .querySelectorAll("button, a, .profile-card, .social-btn, .icon-btn")
       .forEach((el) => {
         el.addEventListener("mouseenter", onHover);
         el.addEventListener("mouseleave", onLeave);
         hoverEls.push(el);
       });
   };
   addHover();

   /* reveal on scroll */
   const observer = new IntersectionObserver(
     (entries) => {
       entries.forEach((e) => {
         if (e.isIntersecting) {
           e.target.classList.add("visible");
           observer.unobserve(e.target);
         }
       });
     },
     { threshold: 0.15 },
   );
   document
     .querySelectorAll("[data-reveal]")
     .forEach((el) => observer.observe(el));

   return () => {
     document.removeEventListener("mousemove", onMouseMove);
     hoverEls.forEach((el) => {
       el.removeEventListener("mouseenter", onHover);
       el.removeEventListener("mouseleave", onLeave);
     });
   };
 }, []);
  
 
  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      <canvas id="particles"></canvas>
      <AppRouter />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App
