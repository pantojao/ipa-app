import React from 'react';
import Fade from 'react-reveal/Fade';
import Filter from './filter'
import {Link} from "react-router-dom"
const fetch = require('node-fetch');

class Data extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: null,
            filterType: null
        }
    }

    
    fetchData = () => {
        fetch('https://api.punkapi.com/v2/beers?page=2&per_page=80')
            .then(response => response.json())
            .then(data => this.setState({data: data}))
            .catch(error => this.setState({ 
            error: "Not able to retrieve data"
            }));
    }

    componentDidMount(){
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.filterType !== prevState.filterType) {
            let sortedArray = [];
            let data = [...this.state.data]
            let filterType = this.state.filterType
            sortedArray = data.sort(function(a, b){
                 return a[`${filterType}`] - b[`${filterType}`]
            })
            this.setState({data: sortedArray})
        }
        
    }

    callbackFunction = (filterType) =>{
        this.setState({filterType: filterType})
    }

    render(){
    
        return(
                <div className="beer-display">
                    <Filter parentCallback={this.callbackFunction}/> 
                    <ul className="all-beer-cards" >
                        
                        {   
                            this.state.data &&
                            this.state.data.map((beer,i) =>    
                                <div className= "beer-card">
                                    <Fade left > 
                                        <div className= "image-container"> 
                                            <img src ={beer.image_url} alt="" className="img-rounded img-responsive img-fluid"  />
                                            <div className="after">
                                                <div className="dark-text">
                                                    <p>ABV: {beer.abv}</p>
                                                    <p>IBU:{beer.ibu}</p>
                                                    <p>PH:{beer.ph}</p>
                                                </div>
                                                <div className="about-beer">
                                                <Link to={ {pathname:`/${beer.id}`, state:{id: beer.id}} }>
                                                        <p style={{color: "black", textDecoration: "none"}} className="learn-more">learn more</p>
                                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                    <Link to={{pathname:`/${beer.id}`, state:{id: beer.id}} }>
                                        <p style={{color: "black", textDecoration: "none"}} className="beer-name">{beer.name}</p> 
                                    </Link>
                                </div> 
                        )}                   
                    </ul>
                </div>
            

        )
    }
}

export default Data;

