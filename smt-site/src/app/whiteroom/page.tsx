'use client';

import { useState } from "react"
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import TreeImg from "../assets/About/Tree.webp"
import VeinImg from "../assets/About/Vein.webp"

export default function Whiteroom() {
    const [title] = useState("Hatyaiwit - ห้องเรียนสีขาว");
    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <Alert style={{ width: '80%', margin: 'auto', marginTop: '20px' }} color="failure" icon={HiInformationCircle}>
                <span className="font-medium">แจ้งเตือน !</span> อยู่ระหว่างการปรับปรุ่งข้อมูล
            </Alert>
            <div className="container">
                <h1 style={{ marginBottom: "15px" }} className="border-b">
                    🏫 ห้องเรียนสีขาว - White classroom
                </h1>
                <h2 style={{ fontSize: '18px' }}>ห้องเรียนสีขาวเป็นห้องเรียนที่มีแหล่งเรียนรู้ ดูแลช่วยเหลือ เอื้อเฟื้อด้วยคุณธรรม สร้างสรรค์ด้วยกิจกรรม โดยมีการจัดองค์กรภายในห้องเรียน ประกอบด้วยโครงสร้างของแกนนำ นักเรียนแบ่งออกเป็น 4 ฝ่าย คือ ฝ่ายการเรียน ฝ่ายการงาน ฝ่ายสารวัตรนักเรียน และฝ่ายกิจกรรม</h2>
                <img
                    alt="MemberTree"
                    width={1024}
                    height={768}
                    style={{ margin: "auto", marginTop: "10px" }}
                    src={TreeImg.src}
                ></img>
            </div>
            <div className="container">
                <h1 style={{ marginBottom: "15px" }} className="border-b">
                    🎍 ตารางการทำเวร (ทำความสะอาด)
                </h1>
                <h2 style={{ fontSize: '18px' }}>ตารางการทำเวร (ทำความสะอาด) ในห้องเรียนมีความสำคัญเพื่อรักษาสภาพแวดล้อมที่เรียบร้อยและสะอาดสำหรับการเรียนการสอนของนักเรียน</h2>
                <img
                    width={1024}
                    height={768}
                    alt="CleaningVein"
                    style={{ margin: "auto", marginTop: "10px" }}
                    src={VeinImg.src}
                ></img>
            </div>
        </>
    )
}