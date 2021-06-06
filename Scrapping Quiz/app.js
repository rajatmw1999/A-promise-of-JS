// const express = require('express');
import { resolveNaptr } from 'dns';
import express from 'express';
import puppeteer from 'puppeteer';
// import fs from 'fs';
const app = express();

app.get('/scrap', (req, res)=>{
    const scrap = async () =>{
        const browser = await puppeteer.launch({headless : false}); //browser initiate
        const page = await browser.newPage();  // opening a new blank page
        await page.goto('https://www.geeksforgeeks.org/operating-systems-set-1/', {waitUntil : 'domcontentloaded'}) // navigate to url and wait until page loads completely
    
        const recordList = await page.$$eval('div#main div#home-page article#post-1495',(trows)=>{
            let rowList = []
            let title = trows[0].getElementsByClassName("title")[0].innerHTML;
            recordList = title;
            return  title;
            // console.log("-------------"); 
            // console.log(trows);
            // console.log("-------------");
            // trows.forEach(row => {
            //         // let record = {'country' : '','cases' :'', 'death' : '', 'recovered':''}
            //         title = row.querySelectorAll('div');
            //         // record.country = ""; //row.querySelector('a').innerText; // (tr < th < a) anchor tag text contains country name
            //         // const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
            //         // record.cases = tdList[0];        
            //         // record.death = tdList[1];       
            //         // record.recovered = tdList[2];   
            //         // if(tdList.length >= 3){         
            //             // rowList.push(record)
            //         // }
            //         // rowList.push(row);
            //         rowList.push(title.innerHTML);
            //     });
            return rowList;
        })
        console.log(recordList)
        // await page.screenshot({ path: 'screenshots/wikipedia.png' }); //screenshot 
        browser.close();
    }
    res.send(scrap());
});

app.listen('3000', ()=>{
    console.log("Listening on port 3000");
});