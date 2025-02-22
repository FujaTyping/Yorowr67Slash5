"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Button, Label, Dropdown, Tooltip } from "flowbite-react";
import { FaHistory, FaHandPointer, FaFilter } from "react-icons/fa";
import smtConfig from "../smt-config.mjs";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import buddhistEra from "dayjs/plugin/buddhistEra";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/th";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("th");

interface Homework {
  Subject: string;
  Time: string;
  Decs: string;
  Due: string;
  isDue: boolean;
}

type ThaiMonth =
  | "มกราคม"
  | "กุมภาพันธ์"
  | "มีนาคม"
  | "เมษายน"
  | "พฤษภาคม"
  | "มิถุนายน"
  | "กรกฎาคม"
  | "สิงหาคม"
  | "กันยายน"
  | "ตุลาคม"
  | "พฤศจิกายน"
  | "ธันวาคม";

const monthMap: Record<ThaiMonth, string> = {
  มกราคม: "01",
  กุมภาพันธ์: "02",
  มีนาคม: "03",
  เมษายน: "04",
  พฤษภาคม: "05",
  มิถุนายน: "06",
  กรกฎาคม: "07",
  สิงหาคม: "08",
  กันยายน: "09",
  ตุลาคม: "10",
  พฤศจิกายน: "11",
  ธันวาคม: "12",
};

const localizer = momentLocalizer(moment);

dayjs.extend(customParseFormat);
dayjs.extend(buddhistEra);

export default function Homework() {
  const [data, setData] = useState<Homework[]>([
    {
      Due: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Time: "กำลังดึงข้อมูล",
      Subject: "กำลังดึงข้อมูล",
      isDue: false,
    },
  ]);
  const [duedData, setDuedData] = useState<Homework[]>([
    {
      Due: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Time: "กำลังดึงข้อมูล",
      Subject: "กำลังดึงข้อมูล",
      isDue: true,
    },
  ]);
  const [allData, setAllData] = useState<Homework[]>([
    {
      Due: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Time: "กำลังดึงข้อมูล",
      Subject: "กำลังดึงข้อมูล",
      isDue: false,
    },
  ]);
  const [title] = useState("Hatyaiwit - ภาระงาน");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState(moment());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hwTitle, setHwTitle] = useState("ไม่มีข้อมูล");
  const [hwDetail, setHwDetail] = useState("ไม่มีข้อมูล");
  const [hwDue, setHwDue] = useState("ไม่มีข้อมูล");
  const [hwTime, setHwTime] = useState("ไม่มีข้อมูล");
  const [hwisDue, setHwisDue] = useState(false);
  const itemsPerPage = 15;
  const currentMonthText = currentDate.format("MMMM");
  const currentYearText = currentDate.format("YYYY");
  const [tableMode, setTableMode] = useState(0);

  const convertThaiDateToISO = (thaiDate: string): string => {
    try {
      const [day, monthThai, yearThai] = thaiDate.split(" ");

      if (!day || !monthThai || !yearThai) {
        throw new Error(`Invalid Field s: ${thaiDate}`);
      }

      const month = monthMap[monthThai as ThaiMonth];
      if (!month) {
        throw new Error(`Invalid month in Thai date : ${monthThai}`);
      }

      const year = parseInt(yearThai) - 543;

      const formattedDate = `${year}-${month}-${day.padStart(2, "0")}`;
      const isoDate = dayjs(formattedDate, "YYYY-MM-DD", true).toISOString();

      if (!isoDate) {
        throw new Error(`Failed to parse date : ${formattedDate}`);
      }

      return isoDate;
    } catch (error) {
      console.log("Error in convertThaiDateToISO :", error);
      return "";
    }
  };

  useEffect(() => {
    axios
      .get(`${smtConfig.apiMain}assignment`)
      .then((response) => {
        const homeworkData = response.data.Homework;
        const notDuedhomework = homeworkData.filter((item: any) => !item.isDue);
        const duedhomework = homeworkData.filter((item: any) => item.isDue);

        setData(notDuedhomework);
        setDuedData(duedhomework);
        setAllData(homeworkData);
      })
      .catch((error) => {
        setData([
          {
            Due: "ไม่สามารถ",
            Decs: "ดึงข้อมูล",
            Time: "ได้",
            Subject: `${error}`,
            isDue: false,
          },
        ]);
      });
    try {
      const storedMode = localStorage.getItem("HwTableMode");
      if (storedMode) {
        setTableMode(parseInt(storedMode));
      }
    } catch (error) {
      console.error("Error reading data from localStorage:", error);
    }
  }, []);

  const events = allData
    .map((hw) => {
      const dueDate =
        hw.Due === "กำลังดึงข้อมูล" ? "" : convertThaiDateToISO(hw.Due);

      if (!dueDate) {
        return null;
      }

      return {
        title: `${hw.Subject} : ${hw.Decs}`,
        start: new Date(dueDate),
        end: new Date(dueDate),
        hwTitle: hw.Subject,
        hwDecs: hw.Decs,
        hwDue: hw.Due,
        hwTime: hw.Time,
        hwisDue: hw.isDue,
      };
    })
    .filter((event) => event !== null);

  const onSelectCalendarEvent = (event: any) => {
    if (!event) {
      return;
    }

    setHwTitle(event.hwTitle);
    setHwDetail(event.hwDecs);
    setHwDue(event.hwDue);
    setHwTime(event.hwTime);
    setHwisDue(event.hwisDue);
    setIsModalOpen(true);
  };

  const goToToday = () => {
    setCurrentDate(moment());
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const totalPages = Math.ceil(
    (tableMode === 0 ? allData : tableMode === 1 ? data : duedData).length / itemsPerPage
  );

  const currentData = (tableMode === 0 ? allData : tableMode === 1 ? data : duedData).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(
    currentPage * itemsPerPage,
    tableMode === 0 ? allData.length : tableMode === 1 ? data.length : duedData.length
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleTableMode = (numMode: number) => {
    setCurrentPage(1);
    setTableMode(numMode);
    try {
      localStorage.setItem("HwTableMode", numMode.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <section className="container">
        <div>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl md:text-4xl mb-2">ภาระงาน</h1>
              <div className="flex">
                <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
              </div>
              <p className="mt-4 text-base md:text-lg">
                ข้อมูลอาจจะไม่เป็นปัจจุบัน (🔴 สีแดงคือ เลยกำหนดส่ง)
                <br />
                <span className="flex" style={{ alignItems: "center" }}>
                  <FaHistory style={{ marginRight: "6px" }} /> ข้อมูลอัพเดททุกๆ 5 นาที
                </span>
              </p>
            </div>
          </div>
          <div
            id="DataFrame"
            style={{ marginTop: "20px" }}
            className="overflow-x-auto"
          >
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>วันที่</Table.HeadCell>
                <Table.HeadCell>วิชา</Table.HeadCell>
                <Table.HeadCell>รายละเอียดงาน</Table.HeadCell>
                <Table.HeadCell>กำหมดส่ง</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentData.map((Homework, index) => (
                  <Table.Row
                    className="bg-white"
                    style={{ color: Homework.isDue ? "red" : "black" }}
                    key={index}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                      {Homework.Time}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium">
                      {Homework.Subject}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium">
                      {Homework.Decs}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium">
                      {Homework.Due}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: "17px",
              }}
              className="flex justify-center"
            >
              <p>
                แสดง {startItem}-{endItem} รายการ ทั้งหมด{" "}
                {tableMode === 0 ? allData.length : tableMode === 1 ? data.length : duedData.length} รายการ
              </p>
              <Pagination
                style={{ marginTop: "-20px" }}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                previousLabel="ก่อนหน้า"
                nextLabel="ถัดไป"
              />
              <div className="flex items-center">
                <Tooltip content={`${tableMode === 0 ? ("ภาระงานทั้งหมด") : tableMode === 1 ? ("ภาระงานที่ยังไม่ถึงกำหนดส่ง") : ("ภาระงานที่ครบกำหนดส่งแล้ว")}`} style="light">
                  <FaFilter className="w-5 h-5 mr-3" />
                </Tooltip>
                <Dropdown style={{ marginTop: "12px", marginBottom: "7px" }} color="gray" label="เปลี่ยนตารางภาระงาน">
                  <Dropdown.Item onClick={() => toggleTableMode(0)}>ภาระงานทั้งหมด</Dropdown.Item>
                  <Dropdown.Item onClick={() => toggleTableMode(1)}>ภาระงานที่ยังไม่ถึงกำหนดส่ง</Dropdown.Item>
                  <Dropdown.Item onClick={() => toggleTableMode(2)}>ภาระงานที่ครบกำหนดส่งแล้ว</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl md:text-4xl mb-2">ปฏิทินภาระงาน {currentMonthText}{" "}{parseInt(currentYearText) + 543}</h1>
              <div className="flex">
                <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
              </div>
              <p className="mt-4 text-base md:text-lg flex items-center">
                <FaHandPointer style={{ marginRight: "6px" }} /> คลิกที่งาน
                เพื่อดูรายละเอียด
              </p>
            </div>
          </div>
          <div style={{ marginTop: "20px" }} className="overflow-x-auto">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "80vh" }}
              className="tailwind-calendar text-sm sm:text-base"
              toolbar={false}
              showAllEvents={true}
              popup={true}
              date={currentDate.toDate()}
              onSelectEvent={onSelectCalendarEvent}
              eventPropGetter={(event) => {
                const backgroundColor = event.hwisDue ? '#ff6767' : '#6b9fff';
                return { style: { backgroundColor } }
              }}
            />
            <div
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
              className="flex justify-center"
            >
              <Button.Group>
                <Button onClick={goToPrevMonth} color="gray">
                  ก่อนหน้า
                </Button>
                <Button onClick={goToToday} color="gray">
                  วันนี้
                </Button>
                <Button onClick={goToNextMonth} color="gray">
                  ถัดไป
                </Button>
              </Button.Group>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          display: isModalOpen ? "flex" : "none",
          backgroundColor: "#3030308c",
        }}
        id="popup-modal"
        className="animate__animated animate__fadeIn hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div style={{ paddingTop: "3rem" }} className="space-y-6 p-5">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white flex">
                ข้อมูลภาระงาน{" "}
                <span
                  className="ml-2 font-bold"
                  style={{
                    color: hwisDue ? "red" : "black",
                    display: hwisDue ? "flex" : "none",
                  }}
                >
                  (เลยกำหนด)
                </span>
              </h3>
              <div style={{ marginTop: "10px" }}>
                <div className="flex-col mb-2">
                  <div className="mb-1">
                    <h3 className="font-bold">ชื่อวิชา</h3>
                    <Label htmlFor="text" value={hwTitle} />
                  </div>
                  <div className="mb-1">
                    <h3 className="font-bold">รายละเอียด</h3>
                    <Label htmlFor="text" value={hwDetail} />
                  </div>
                  <div className="flex gap-5">
                    <div className="mb-1">
                      <h3 className="font-bold">วันที่สั่ง</h3>
                      <Label htmlFor="text" value={hwTime} />
                    </div>
                    <div
                      style={{ color: hwisDue ? "red" : "black" }}
                      className="mb-1"
                    >
                      <h3 className="font-bold">วันที่ครบกำหนดส่ง</h3>
                      <Label
                        style={{ color: hwisDue ? "red" : "black" }}
                        htmlFor="text"
                        value={hwDue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
