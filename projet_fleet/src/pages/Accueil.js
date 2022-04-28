import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const Accueil=()=>{
    const[data, setData]=useState([]);
    const[image, setImage]=useState();
    const[title, setTitle] = useState();
    const[note, setNote] = useState();
    const[overview, setOverview] = useState();
    useEffect(()=>{
        axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d65c3fafe2e46113478c6e83f7afce6")
        .then((res)=>setData(res.data.results));
    },[]);

    function filtreRecherche(valeur, valeurRetour){
        let ressemblanceMots=0;
        let resultat=0;
        valeur=valeur.toLowerCase();
        valeur=valeur.replace(":","");
        valeur=valeur.replace("-"," ");

        valeurRetour=valeurRetour.toLowerCase();
        valeurRetour=valeurRetour.replace(":","");
        valeurRetour=valeurRetour.replace("-"," ");
        valeur=valeur.split(" ");
        valeurRetour=valeurRetour.split(" ");
        for(let i=0; i<=valeur.length-1; i++){
            for(let j=0; j<=valeurRetour.length-1; j++){
                if(valeur[i] === valeurRetour[j]){
                    ressemblanceMots=1;
                }
            }
            if(ressemblanceMots===1){
                resultat=resultat+1;
            }
            ressemblanceMots=0;
        };if(resultat===valeur.length){resultat=1}else{resultat=0}
        return resultat;
    };
    return(
        <div className="page">
                    <div className="pageRecherche">
        <div className="recherche">
            <form>
            <button className="icon"
                onClick={event=>{
                        event.preventDefault();
                        axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d65c3fafe2e46113478c6e83f7afce6")
                        .then((res)=>setData(res.data.results));
                }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input type="search"></input>
            </form>
        </div>
        <div className="map">
                {data.map((resultat)=>{
                    let input=document.querySelector("input").value;
                    if(filtreRecherche(input, resultat.title)===1 || input===""){
                        return(
                            <div data-id={resultat.id} className="mapFilm" 
                            onClick={event=>{
                                event.preventDefault();
                                let lien="https://image.tmdb.org/t/p/original/"+resultat.backdrop_path;
                                let noteTotal=resultat.vote_average+"/10";
                                setImage(<img src={lien}/>);
                                setTitle(<h1>{resultat.title}</h1>);
                                setOverview(<p className="description">{resultat.overview}</p>);
                                setNote(<p>{noteTotal}</p>);
                        }}>
                            <p>{resultat.title}</p>
                        </div>
                        )
                    }
                })}
        </div>
    </div>
            <div className="film">
                <div className="titreImage">
                    {image}
                    <div className="titreNote">
                        {title}
                        {note}
                    </div>
                </div>
                {overview}
            </div>
        </div>
    );
};

export default Accueil;
