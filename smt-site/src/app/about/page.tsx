"use client";

import { useState } from "react";
import { Carousel } from "flowbite-react";
import { Button } from "flowbite-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import About1 from "../assets/Carousel/About1.webp";
import About2 from "../assets/Carousel/About2.webp";
import { RiInstagramFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";

export default function About() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับห้องเรา");
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div
        style={{ marginTop: "25px" }}
        className="h-56 sm:h-64 xl:h-80 2xl:h-96 animate__animated animate__jackInTheBox"
      >
        <Carousel slideInterval={5000}>
          <img src={About1.src} alt="AboutBanner"></img>
          <img src={About2.src} alt="AboutBanner"></img>
        </Carousel>
      </div>
      <div className="container">
        <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>
          พวกเรา ม.4/5 👫
        </h1>
        <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
          ห้องเรียน 4/5 SMT
          ของพวกเราเป็นห้องเรียนที่มีจุดมุ่งหมายในการพัฒนาความสามารถทางด้านวิศวกรรมนอกจากนี้
          ยังมุ่งเน้นการเสริมสร้างความรู้ในด้านวิทยาศาสตร์ คณิตศาสตร์
          และเทคโนโลยี
          เพื่อเตรียมความพร้อมให้กับนักเรียนในการเผชิญกับความท้าทายในโลกยุคใหม่
          และยังมีการจัดกิจกรรมเสริม เช่น การแข่งขันด้านต่างๆ
          เพื่อให้นักเรียนได้พัฒนาทักษะการแข่งขันและเรียนรู้การทำงานภายใต้ความกดดัน
          นอกจากนี้
          เรายังมีการเชิญวิทยากรจากภายนอกมาให้ความรู้และแชร์ประสบการณ์ต่างๆ
          เพื่อเปิดมุมมองใหม่ให้กับนักเรียน
        </h2>
        <Button
          className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
          style={{ maxWidth: "220px", margin: "auto" }}
          as={Link}
          href="https://www.instagram.com/seetubhazadaimod/"
          color="blue"
        >
          <RiInstagramFill
            style={{ margin: "auto", marginRight: "5px" }}
            className="mr-3 h-4 w-4"
          />
          Instagram
        </Button>
        <Marquee style={{ marginTop: '20px' }} gradient={true} gradientColor="white" gradientWidth={25}>
          <p className="title">เรื่องคิดเลขอ่ะเกรดหนึ่ง เรื่องคิดถึงอ่ะเกรดสี่</p><FaStar />
          <p className="title">การบ้านเท่าภูเขา ความโง่เขลาเท่าจักรวาล</p><FaStar />
          <p className="title">งานเลี้ยงย่อมมีวันเลิกรา อาจาร์ยเข้าช้า ไม่มีวันเลิกเร็ว</p><FaStar />
          <p className="title">คำที่ครูบอกออกสอบ มักจะไม่เจอในข้อสอบเสมอ</p><FaStar />
          <p className="title">เรื่องเรียนเป็นเรื่องตลก สอบตกเป็นเรื่องธรรมดา</p><FaStar />
        </Marquee>
      </div>
    </>
  );
}
