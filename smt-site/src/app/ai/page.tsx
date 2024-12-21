'use client';

import { useState, useEffect } from "react"
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, List, Accordion, Modal, Button, Checkbox, Label } from "flowbite-react";
import Cynthia from '../assets/chat/Cynthia.jpg'
import Aether from '../assets/chat/Aether.jpg'
import { AiFillExperiment } from "react-icons/ai";
import useLocalStorge from "../lib/localstorage-db";
import useSound from 'use-sound';
import { FaCheckSquare } from "react-icons/fa";

export default function smtAI() {
    const [title] = useState("Hatyaiwit - AI");
    const [CynthiaV] = useSound("/assets/Sound/Cynthia.wav");
    const { isLogin } = useLocalStorge(false);
    const [stTOS, setStTOS] = useState(false);
    const [checkTOS, setCheckTOS] = useState(false);

    function acceptTOS() {
        if (checkTOS) {
            setStTOS(false);
            try {
                localStorage.setItem("aiTOS", "true");
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        }
    }

    useEffect(() => {
        try {
            const storedSTOS = localStorage.getItem("aiTOS");
            if (storedSTOS == "true") {
                setStTOS(false);
            } else {
                setStTOS(true);
            }
        } catch (error) {
            console.error("Error reading data from localStorage:", error);
        }
    }, []);

    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <Alert style={{ width: '80%', margin: 'auto', marginTop: '20px' }} color="failure" icon={HiInformationCircle}>
                <span className="font-medium">แจ้งเตือน !</span> AI ทั้งหมดนี้กำลังอยู่ในช่วงการพัฒนา คำตอบหรือคำแนะนำที่ให้มานั้นอาจไม่ถูกต้องหรือครอบคลุมทุกกรณี ขอแนะนำให้ใช้อย่างระมัดระวังและตรวจสอบข้อมูลเพิ่มเติมเมื่อจำเป็น
            </Alert>
            <div className="container">
                <h1 style={{ marginBottom: "15px" }} className="border-b">
                    🤖 เลือกผู้ช่วยที่ใช่สำหรับคุณ - AI
                </h1>
                <h2 style={{ fontSize: '18px' }}>ผู้ช่วย AI อัจฉริยะที่พร้อมตอบคำถาม ช่วยแก้ปัญหาการเรียน และให้คำแนะนำ ไม่ว่าจะเป็นด้านคณิตศาสตร์ วิทยาศาสตร์ หรือกลยุทธ์การเรียนรู้ ทุกอย่างเพื่อช่วยให้คุณก้าวสู่เป้าหมายได้ง่ายขึ้น</h2>
                <div className="flex flex-col md:flex-row justify-center items-center rounded-lg mt-10 gap-10">
                    <Link onClick={() => { if (isLogin) { CynthiaV(); } }} href="/chat/cynthia" style={{ maxWidth: '20rem', height: '27rem' }} className="rounded-lg group relative block bg-black animate__animated animate__bounceIn">
                        <img
                            alt="Cythia"
                            src={Cynthia.src}
                            className="rounded-lg absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8 rounded-lg">
                            <p className="text-white text-sm font-medium uppercase tracking-widest">AI Assistant</p>
                            <p className="text-xl font-bold text-white sm:text-2xl">Cynthia</p>
                            <div style={{ marginTop: '17.5rem' }}>
                                <div
                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white">
                                        ที่ปรึกษาส่วนตัว AI อบอุ่น ใส่ใจ พร้อมช่วยทุกปัญหาการเรียน
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/chat/aether" style={{ maxWidth: '20rem', height: '27rem' }} className="rounded-lg group relative block bg-black animate__animated animate__bounceIn">
                        <img
                            alt="Aether"
                            src={Aether.src}
                            className="rounded-lg absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8 rounded-lg">
                            <p className="text-white text-sm font-medium uppercase tracking-widest">AI Assistant</p>
                            <p className="text-xl font-bold text-white sm:text-2xl flex items-center">Aether <AiFillExperiment className="ml-1" /></p>
                            <div style={{ marginTop: '17.5rem' }}>
                                <div
                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white">
                                        ที่ปรึกษา AI อัจฉริยะ ผู้เชี่ยวชาญคณิต-วิทย์ คม เฉียบ และล้ำสมัย
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1 style={{ marginBottom: "25px" }} className="border-b">
                    📡 FAQ - คำถามที่พบบ่อยเกี่ยวกับ AI
                </h1>
                <Accordion id="AIACC">
                    <Accordion.Panel>
                        <Accordion.Title>AI สามารถทำอะไรได้บ้าง?</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                AI สามารถช่วยในการเรียนรู้ แก้ปัญหาทางคณิตศาสตร์และวิทยาศาสตร์ ตอบคำถามทั่วไป ให้คำแนะนำเกี่ยวกับการเรียนอย่างมีประสิทธิภาพ และมอบคำปรึกษาที่สร้างแรงบันดาลใจ รวมถึงวิธีแก้ปัญหาแบบสร้างสรรค์
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>AI มีความแม่นยำเสมอหรือไม่?</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                แม้ AI จะถูกออกแบบมาให้ให้ข้อมูลที่แม่นยำ แต่บางครั้งอาจเกิดข้อผิดพลาดหรือให้คำตอบที่ไม่สมบูรณ์ แนะนำให้ตรวจสอบข้อมูลสำคัญจากแหล่งข้อมูลอื่นเพิ่มเติม
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>ข้อมูลส่วนตัวของฉันปลอดภัยหรือไม่?</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                ข้อมูลของคุณจะถูกเก็บรักษาเป็นความลับสูงสุด และใช้เพื่อพัฒนาประสิทธิภาพของ AI เท่านั้น โดยไม่มีการแชร์ข้อมูลให้กับบุคคลภายนอก
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>AI รองรับภาษาอื่นนอกจากภาษาไทยหรือไม่?</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                AI รองรับการใช้งานภาษาไทยและภาษาอังกฤษเป็นหลัก โดยสามารถตอบกลับตามภาษาที่ผู้ใช้เลือกใช้งานได้
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>AI ใช้งานฟรีหรือไม่?</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                ในปัจจุบัน AI เปิดให้ใช้งานฟรีในช่วงทดลอง อาจมีการเพิ่มฟีเจอร์พิเศษหรือบริการแบบเสียค่าใช้จ่ายในอนาคต
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
            <Modal
                className="animate__animated animate__fadeIn"
                show={stTOS}
                onClose={() => setStTOS(false)}
                size="md"
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            ข้อตกลงและเงื่อนไขการใช้บริการ (Terms of Service)
                        </h3>
                        <div style={{ maxHeight: '250px', overflowX: "auto" }}>
                            <h2 style={{ fontSize: "15px" }}>
                                ยินดีต้อนรับสู่การใช้งานระบบ AI ผู้ช่วยอัจฉริยะของเรา! เรามุ่งมั่นที่จะมอบประสบการณ์การใช้งานที่ดีที่สุดให้กับคุณ
                                กรุณาอ่านและทำความเข้าใจข้อตกลงและเงื่อนไขการใช้งานนี้อย่างละเอียดก่อนเริ่มใช้งาน เพื่อป้องกันความเข้าใจผิดและสร้างความมั่นใจว่าคุณได้รับประโยชน์สูงสุดจากบริการของเรา
                                หากคุณมีข้อสงสัยหรือคำถามใด ๆ อย่าลังเลที่จะติดต่อเรา
                            </h2>
                            <List style={{ marginTop: "20px", fontSize: "15px" }}>
                                <List.Item style={{ color: "black" }}>
                                    📜 <strong>การยอมรับเงื่อนไข : </strong>
                                    การใช้บริการนี้แสดงว่าคุณยอมรับข้อกำหนดและเงื่อนไขทั้งหมดของเรา โดยการดำเนินการใด ๆ
                                    ผ่านระบบถือเป็นการแสดงออกถึงความยินยอมของคุณในทุกประการ
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    💡 <strong>ขอบเขตการให้บริการ : </strong>
                                    AI ของเราได้รับการออกแบบมาเพื่อช่วยตอบคำถาม แนะนำวิธีการแก้ปัญหา และสนับสนุนการเรียนรู้ในหลากหลายด้าน
                                    เช่น คณิตศาสตร์ วิทยาศาสตร์ และการวางแผนการเรียน อย่างไรก็ตาม โปรดทราบว่าข้อมูลที่ได้รับอาจไม่ถูกต้อง
                                    หรือครบถ้วนเสมอ คุณควรตรวจสอบข้อมูลเพิ่มเติมจากแหล่งที่เชื่อถือได้
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    ⚙️ <strong>การใช้งานที่เหมาะสม : </strong>
                                    กรุณาใช้ระบบนี้อย่างมีจริยธรรม ห้ามใช้เพื่อวัตถุประสงค์ที่ผิดกฎหมาย เช่น การสร้างเนื้อหาที่ไม่เหมาะสม
                                    หรือเผยแพร่ข้อมูลที่บิดเบือนเพื่อก่อให้เกิดความเสียหายต่อผู้อื่น
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    🔒 <strong>ความเป็นส่วนตัว : </strong>
                                    เราให้ความสำคัญกับข้อมูลส่วนบุคคลของคุณ ข้อมูลที่คุณให้กับ AI จะถูกเก็บรักษาเป็นความลับ
                                    และใช้เพื่อปรับปรุงการให้บริการเท่านั้น โดยไม่มีการนำไปเผยแพร่หรือส่งต่อให้บุคคลภายนอก
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    🚀 <strong>การพัฒนา : </strong>
                                    บริการ AI นี้ยังอยู่ในช่วงการพัฒนา ซึ่งหมายความว่าอาจมีข้อผิดพลาดหรือข้อจำกัด
                                    และเราสงวนสิทธิ์ในการปรับปรุงหรือเปลี่ยนแปลงฟีเจอร์โดยไม่แจ้งให้ทราบล่วงหน้า
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    📩 <strong>การติดต่อ : </strong>
                                    หากคุณมีข้อสงสัย ข้อแนะนำ หรือคำถามใด ๆ สามารถติดต่อเราได้ที่อีเมล yorwor@siraphop.me
                                </List.Item>
                            </List>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox onChange={(e) => setCheckTOS(e.target.checked)} style={{ color: '#2d76ff' }} id="accept" />
                            <Label htmlFor="accept" className="flex">
                                ฉันยอมรับข้อกำหนดและเงื่อนไข
                            </Label>
                        </div>
                        <div style={{ marginTop: '5px' }} className="w-full">
                            <Button
                                onClick={acceptTOS}
                                style={{ backgroundColor: "#2d76ff" }}
                                color="blue"
                            >
                                <FaCheckSquare className="mr-2 h-5 w-5" />
                                ตกลง
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}