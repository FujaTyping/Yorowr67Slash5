"use client";
import { useRouter } from "next/navigation";
import SideNavbar from "../components/navbar";
import Tognav from "../components/togglenav"
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function About() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
      setIsVisible((prev) => !prev); 
  };

  return (
    <div className="container">
      { isVisible && <SideNavbar /> }
      <h1>About M.4/5</h1>
      <h2>Powered by NEXT.JS with NEXTUI</h2>
      <Button onClick={() => router.push("/")}>Home</Button>
      <Tognav isVisible={isVisible} toggleVisibility={toggleVisibility} />
    </div>
  );
}
