import songWidget from "./songWidget";
import styled from 'styled-components';
import { useEffect } from "react";
import './SongDisplayComponents.css';

const url = "http://davidpots.com/jakeworry/017%20JSON%20Grouping,%20part%203/data.json"
const categories = ["70's and less", "80's", "90's", "New songs"]


const Wrapper = styled.div`
background: #FFFFFF;
width: 90%;
height: 200px;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
justify-content: Left;
align-items:Left;
margin: 20px;
`

/**
 * Wraps all the functions.
 */
async function fetchAndAppend(){
    const songsJson = await fetchSongsFromAPI();
    const songsByCategory = devideSongsByYear(songsJson);
    //console.log(songsByCategory)
    const wrapper = document.getElementById('wrapper');
    for(const [category, songsJson] of Object.entries(songsByCategory)){
        const categoryDiv = createSongCategories(category, songsJson)
        wrapper.append(categoryDiv);
    }
}
/**
 * Fetch the songs from the backend and convert them to a json.
 * @returns 
 */
async function fetchSongsFromAPI(){
    const response = await fetch(url);
    const songsJson = await response.json();
    return songsJson;
}
/**
 * Devide songs by year
 * @param {} songsJson 
 * @returns an object that maps each time period to its relevent song
 */
function devideSongsByYear(songsJson){
    const songsByCategory = {"lt70": [], "80": [], "90": [], "new": []};
    songsJson.songs.forEach((song) => {
        if(song.year < 1970){
            songsByCategory["lt70"].push(song);
        }
        else if(song.year < 1980) {
            songsByCategory["80"].push(song);
        }
        else if(song.year < 1990) {
            songsByCategory["90"].push(song);
        } else {
            songsByCategory["new"].push(song);
        }
    });
    return songsByCategory;
}
/**
 * Creates the actual HTML with the data.
 * @param {} category 
 * @param {*} songs 
 * @returns 
 */
function createSongCategories(category, songs){
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    const h2 = document.createElement('h2');
    h2.textContent = category;
    categoryDiv.append(h2);

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        const h3 = document.createElement('h3');
        h3.textContent = song.title;
        const h4 = document.createElement('h4');
        h4.textContent = song.artist;
        songDiv.append(h3);
        songDiv.append(h4);
        categoryDiv.append(songDiv);
    })
    return categoryDiv;
}

function SongDisplayComponents() {
    useEffect(() => {
        fetchAndAppend();
       }, []);
    return (
        <Wrapper id="wrapper">

        </Wrapper>
    );
  }
  
  export default SongDisplayComponents;