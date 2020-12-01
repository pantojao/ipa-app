import React from 'react';

class Filter extends React.Component{
    constructor(){
        super()
        this.state={
            filterType: null
        }
    }

    sendData = (type) => {
        this.props.parentCallback(type)
    }

    filter = (event) => {
        let type = event.target.value
        this.setState({
            filterType: type
        });
        this.sendData(type)
      }

   

    render(){
        return(
            <div className= "filter">
                <label className="mr-sm-2 select-label" htmlFor="inlineFormCustomSelect">Filter By</label>
                <select className="custom-select mr-sm-2 " id="inlineFormCustomSelect"  onChange={this.filter}>
                <option defaultValue>Choose...</option>
                <option value="ibu">IBU</option>
                <option value="abv">ABV</option>
                <option value="ph">PH</option>
                </select>
            </div> 
        )
    }
}

export default Filter;