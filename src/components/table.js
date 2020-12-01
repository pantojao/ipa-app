import React from 'react';

class TableItem extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            title: this.props.title,
            value: this.props.value
        }
    }
    render(){
        return(
            <div className="table-item">
                <p>{this.props.title}</p> 
                <p>{this.props.value}</p>
            </div>
        )
    }
}

export default TableItem;