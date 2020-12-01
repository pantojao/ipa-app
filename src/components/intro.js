import React from 'react';
import TableItem from './table'
import {withRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom"


function BeerIntro(props){
    const [query] = useState(props.location.state.id);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            const response = await fetch(
                `https://api.punkapi.com/v2/beers?ids=${query}`
            );
            const data = await response.json();
            setData(data);
            
        };
    
        fetchData();
    }, [query]);
    
    return(
        <div>
            <div className="info-nav">
                <Link to={ {pathname:'/'} }>
                    <button type="button" className="home-btn btn btn-dark ">Back</button> 
                </Link>
            </div>
            
                {   
                    data &&
                    data.map((beer,i) =>
                    <div className="info">                                 
                        <div className= "beer-info">
                            <img className="info-image" src={beer.image_url} alt="" />
                            <p className="info-name">{beer.name}</p>
                            <p className="info-description">{beer.description}</p>
                        </div> 
                        <div className="basic-table">
                            <h2>Information</h2>
                            <div className="basic-table-content">
                                <TableItem title='Volume' value={`${beer.volume.value} ${beer.volume.unit}`} />
                                <TableItem title='Boil Volume' value= {`${beer.boil_volume.value} ${beer.boil_volume.unit}`} />
                                <TableItem title='ABV' value= {`${beer.abv}`} />
                                <TableItem title='IBU' value= {`${beer.ibu}`} />
                                <TableItem title='Target FG' value= {`${beer.target_fg}`} />
                                <TableItem title='Target OG' value= {`${beer.target_og}`} />
                                <TableItem title='Target EBC' value= {`${beer.ebc}`} />
                                <TableItem title='SRM' value= {`${beer.srm}`} />
                                <TableItem title='PH' value= {`${beer.ph}`} />
                                <TableItem title='Attenuation' value= {`${beer.attenuation_level}`} />
                            </div> 
                        </div> 
                        <div className="ingredient-table">
                            <h2>Ingredients</h2>
                            <div className="ingredient-table-content">
                                <p className="ingredient-item"><img className="icon" alt ="" src="https://brewdogrecipes.com/assets/icons/icon-malt.png"/>{`Malt:${(beer.ingredients.malt).map(malt=> ` ${malt.name}`)}`}</p>
                                <p className="ingredient-item"><img className="icon" alt ="" src="https://brewdogrecipes.com/assets/icons/icon-hops.png"/>{`Hops:${(beer.ingredients.hops).map(hops=> ` ${hops.name}`)}`}</p>
                            </div>
                        </div>
                    </div>
                    
                )}                   
            </div>
    )
}


export default withRouter(BeerIntro)