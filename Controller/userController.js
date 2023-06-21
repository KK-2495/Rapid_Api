import encrypt from "encryptjs";
import User from "../Model/User.js";

export const register = async (req,res) =>{
    try {
        const {name, email, password} = req.body;

        const response = await User.find({email}).exec();
        
        if(response.length) return res.send("You're already Registered.");
        let secretkey='airbnb';
        let encryptPass =encrypt.encrypt(password,secretkey,256);
        const user = new User({
            name,
            email,
            password:encryptPass
        });
        await user.save();
        return res.send("Registration Successful.!");
    } catch (error) {
        return res.send(error);
    }
}

import axios from "axios";



export const searchByLocation = async (req,res) =>{
    try {
        const{email, location} = req.body;

        const user = await User.find({email}).exec();
        if(!user.length) return res.send("User not found...");

        const options = {
            method: 'GET',
            url: 'https://airbnb13.p.rapidapi.com/search-location',
            params: {
              location: location,
              checkin: '2023-09-16',
              checkout: '2023-09-17',
              adults: '1',
              children: '0',
              infants: '0',
              pets: '0',
              page: '1',
              currency: 'USD'
            },
            headers: {
              'X-RapidAPI-Key': 'f571456fc6msh99ccc4937766211p1cb810jsn9362856f689f',
              'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
          };
          
        const response = await axios.request(options);
        console.log(response.data);
        return res.send(response.data.results);
    } catch (error) {
        console.error(error);
    }
}


export const calendar = async (req,res) =>{
    try {
        const{email, year, month} = req.body;

        const user = await User.find({email}).exec();
        if(!user.length) return res.send("User not found...");
        
        const options = {
            method: 'GET',
            url: 'https://airbnb13.p.rapidapi.com/calendar',
            params: {
              room_id: '18951965',
              currency: 'USD',
              year: year,
              month: month,
              count: '1'
            },
            headers: {
              'X-RapidAPI-Key': 'f571456fc6msh99ccc4937766211p1cb810jsn9362856f689f',
              'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
          };
          
        const response = await axios.request(options);
        console.log(response.data);
        return res.send(response.data.results);
    } catch (error) {
        console.error(error);
    }
}


export const autoComplete = async (req,res) =>{
    try {
        const{email, location} = req.body;

        const user = await User.find({email}).exec();
        if(!user.length) return res.send("User not found...");
        
        const options = {
            method: 'GET',
            url: 'https://airbnb13.p.rapidapi.com/autocomplete',
            params: {query: location},
            headers: {
              'X-RapidAPI-Key': 'f571456fc6msh99ccc4937766211p1cb810jsn9362856f689f',
              'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
          };
        const response = await axios.request(options);
        console.log(response.data);
        return res.send(response.data);
    } catch (error) {
        console.error(error);
    }
}