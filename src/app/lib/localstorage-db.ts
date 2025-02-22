import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { openDB } from "idb";

const useLocalStorge = (IsAdminpage: boolean) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [photourl, setPhotourl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBID1Qv2l9GtFuT6X24KagJ10o4IbL1zuebg&s"
  );
  const [showAlert, setShowAlert] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const db = await openDB("firebaseLocalStorageDb");
      const store = db
        .transaction("firebaseLocalStorage")
        .objectStore("firebaseLocalStorage");
      const value = await store.getAll();
      if (value.length == 1) {
        if (value[0]?.fbase_key !== "__sak") {
          const user = value[0]?.value;
          if (user) {
            setPhotourl(user.photoURL);
            setIsLogin(true);
            setUsername(user.displayName);
            setEmail(user.email);
            if (!user.email.includes("@hatyaiwit.ac.th")) {
              setShowAlert(true);
            } else {
              setShowAlert(false);
            }
          }
          if (IsAdminpage) {
            if (!user) {
              return router.push("/");
            }
            setEmail(user.email);
            setUsername(user.displayName);
          }
        }
      } else {
        if (value[1]?.fbase_key !== "__sak") {
          const user = value[1]?.value;
          if (user) {
            setPhotourl(user.photoURL);
            setIsLogin(true);
            setUsername(user.displayName);
            setEmail(user.email);
            if (!user.email.includes("@hatyaiwit.ac.th")) {
              setShowAlert(true);
            } else {
              setShowAlert(false);
            }
          }
          if (IsAdminpage) {
            if (!user) {
              return router.push("/");
            }
            setEmail(user.email);
            setUsername(user.displayName);
          }
        }
      }
    }
    getData();
  }, []);

  return { email, username, photourl, showAlert, isLogin };
};

export default useLocalStorge;
