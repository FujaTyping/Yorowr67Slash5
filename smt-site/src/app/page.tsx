"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Timetable from './assets/Timetable.png'

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
      <div className="container">
        <h1 style={{ marginBottom: '15px' }} className="border-b">📢 ประกาศ - Announcement</h1>
        <h2 className="gap-3 centered-text-h2">
          <Marquee pauseOnHover={true}>
            {data}
          </Marquee>
        </h2>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: '10px' }} className="border-b">📅 ตารางเรียน - Timetable</h1>
        <h2 style={{ fontSize: '18px' }}>ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง ครั้งที่ 3  <span style={{ color: 'red' }}>เริ่มใช้ตั้งแต่วันอังคารที่ 18 มิถุนายน พ.ศ.  2567 เป็นต้นไป</span><br></br>กรณีพบข้อผิดพลาด สามารถแจ้งข้อมูลได้ที่ สนง.วิชาการ 2</h2>
        <img style={{ margin: 'auto', marginTop: '10px' }} src={Timetable.src}></img>
      </div>
    </>
  );
}
