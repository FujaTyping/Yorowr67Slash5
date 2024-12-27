const express = require('express');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
const { collection, getDocs, query, orderBy, setDoc, doc } = require('firebase/firestore');
let ComRealData = { Completion: [] };
let ComlastFetchTime = 0;
const fetchInterval = 5 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - ComlastFetchTime > fetchInterval) {
            const querySnapshot = await getDocs(query(collection(db, "Completion"), orderBy("timestamp", "desc")));
            ComRealData.Completion = [];
            querySnapshot.forEach((doc) => {
                ComRealData.Completion.push(doc.data());
            });
            ComlastFetchTime = Date.now();
        }
        res.send(ComRealData);
    });

    router.post('/', Authenticate(db), async (req, res) => {
        const Title = req.body.title;
        const Decs = req.body.decs;
        const Url = req.body.url;
        const Time = req.body.time;
        if (!Title || !Decs || !Url || !Time) {
            res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        } else {
            const UID = generateID();
            await setDoc(doc(db, "Completion", `${UID}`), {
                Title: `${Title}`,
                Decs: `${Decs}`,
                Url: `${Url}`,
                Time: `${Time}`,
                timestamp: serverTimestamp(),
            });
            res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
        }
    });

    return {
        baseRoute: '/completion',
        router,
    };
};
