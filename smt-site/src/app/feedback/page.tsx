"use client";

import { useEffect, useState } from "react";
import { Button, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import useLocalStorge from "../lib/localstorage-db";
import Turnstile, { useTurnstile } from "react-turnstile";
import { IoSend } from "react-icons/io5";
import smtConfig from "../smt-config.mjs";
import { ToastContainer, toast } from 'react-toastify';

export default function Feedback() {
  const turnstile = useTurnstile();
  const [title] = useState("Hatyaiwit - ข้อเสนอแนะ");
  const { email } = useLocalStorge(false);
  const [name, setName] = useState("");
  const [realEmail, setRealEmail] = useState("");
  const [decs, setDecs] = useState("");
  const [isVerify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitFeedback = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    if (isVerify) {
      setIsLoading(true);
      axios
        .post(`${smtConfig.apiMain}feedback`, {
          name: name,
          email: realEmail,
          decs: decs,
        })
        .then((response) => {
          toast.update(id, { render: `ส่งข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 8000 });
          setVerify(false);
          turnstile.reset();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
          setIsLoading(false);
        });
    } else {
      toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ กรุณายืนยันตัวตนผ่าน CAPTCHA`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
    }
  };

  useEffect(() => {
    if (email) {
      setRealEmail(email);
    }
  }, [email]);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <ToastContainer position="bottom-right" newestOnTop draggable hideProgressBar={false} />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 style={{ marginBottom: "15px" }} className="border-b">
            📥 ส่งความคิดเห็น - Feedback
          </h1>
          <h2 style={{ fontSize: "18px" }}>
            กรุณาแบ่งปันความคิดเห็นหรือข้อเสนอแนะของคุณเพื่อช่วยให้เราปรับปรุงบริการ เราจะพยามพัฒนาเว็บของเราตามความคิดเห็นทุกๆท่าน
          </h2>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm"
                >
                  ชื่อผู้ส่ง
                </label>
                <TextInput
                  placeholder="ชื่อ-สกุล"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm"
                >
                  อีเมล
                </label>
                <TextInput
                  placeholder="อีเมล"
                  value={realEmail}
                  onChange={(event) => setRealEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  สิ่งที่ต้องการจะให้ปรับปรุง
                </label>
                <Textarea
                  placeholder="ข้อความของคุณ"
                  onChange={(event) => setDecs(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-2 w-full">
              <Turnstile
                sitekey="0x4AAAAAAAwmJyPRGMPSMEvC"
                theme="light"
                language={"th"}
                onVerify={() => {
                  setVerify(true);
                }}
              />
            </div>
            <div className="flex justify-center items-center p-2 w-full">
              {isLoading ? (
                <>
                  <Button isProcessing style={{ backgroundColor: "#2d76ff" }}
                    color="blue" onClick={submitFeedback}>
                    ส่งคำขอ
                  </Button>
                </>
              ) : (
                <>
                  <Button style={{ backgroundColor: "#2d76ff" }}
                    color="blue" onClick={submitFeedback}>
                    ส่งคำขอ
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
