"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Timetable from "./assets/Timetable.webp";

export default function Home() {
  const [data, setData] = useState("ยินดีต้อนรับเข้าสู่เว็ปไซต์");
  const [title] = useState("Hatyaiwit - ม.4/5");

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/announcement`)
      .then((response) => {
        setData(response.data.Text);
      })
      .catch((error) => {
        setData(`${error}`);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="hbanner animate__animated animate__tada">
        <h1 className="title text-3xl lg:text-5xl mb-3">ม.4/5 - โครงการ SMT</h1>
        <p className="text-base lg:text-2xl" style={{ maxWidth: "45rem" }}>
          เว็ปไซต์ ม.4/5 ของเราเป็นเว็ปไซต์สำหรับรวมรวบข้อมูลต่างๆ เพื่อนำมาช่วยเหลือนักเรียนภายในห้อง
          เพื่อให้จัดการงานภายในห้องที่ได้รับมอบหมาย หรือตรวจสอบการขาดลาและอื่นๆอีกมากมาย
        </p>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📢 ประกาศ - Announcement
        </h1>
        <p style={{ marginBottom: '10px', display: 'none' }}>ยินดีต้อนรับเข้าสู่เว็ปไซต์ ห้องเรียน โครงการพิเศษ SMT โรงเรียนหาดใหญ่วิทยาลัย (ม.4/5)</p>
        <h2 className="gap-3 centered-text-h2">
          <Marquee gradient={true} gradientColor="white" gradientWidth={25} pauseOnHover={true}>{data}</Marquee>
        </h2>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "10px" }} className="border-b">
          📅 ตารางเรียน - Timetable
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง ครั้งที่ 3{" "}
          <span style={{ color: "red" }}>
            เริ่มใช้ตั้งแต่วันอังคารที่ 18 มิถุนายน พ.ศ. 2567 เป็นต้นไป
          </span>
          <br></br>กรณีพบข้อผิดพลาด สามารถแจ้งข้อมูลได้ที่ สนง.วิชาการ 2 โรงเรียนหาดใหญ่วิทยาลัย
        </h2>
        <img
          width={999}
          height={682}
          alt="Timetable"
          style={{ margin: "auto", marginTop: "10px" }}
          src={Timetable.src}
        ></img>
      </div>
    </>
  );
}
