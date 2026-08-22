// data/names.js — Rastgele isim üretimi
const { useState, useEffect, useRef } = React
const MALE_NAMES = ["Mehmet", "Ahmet", "Mustafa", "Ali", "Hüseyin", "Hasan", "İbrahim", "Yusuf", "Emre", "Burak", "Can", "Kerem", "Onur", "Serkan", "Murat"];

const FEMALE_NAMES = ["Ayşe", "Fatma", "Emine", "Hatice", "Zeynep", "Elif", "Merve", "Aylin", "Seda", "Gizem", "Buse", "Derya", "Yasemin", "Ebru", "Nur"];

const randomName = (isFemale) => (isFemale ? FEMALE_NAMES : MALE_NAMES)[Math.floor(Math.random() * (isFemale ? FEMALE_NAMES.length : MALE_NAMES.length))];
