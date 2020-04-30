import React from 'react';
import axios from 'axios';
import Location from '../Location/Location.js';
import './styles/Interest.css'
import Cars from '../../assets/InterestItems/car.png';
import Fashion from '../../assets/InterestItems/birthday-and-party.png';
import Books from '../../assets/InterestItems/book.png';
import Travel from '../../assets/InterestItems/plane.png';
import Sports from '../../assets/InterestItems/volleyball.png';
import Gaming from '../../assets/InterestItems/gamepad.png';
import Cooking from '../../assets/InterestItems/chef.png';
import Photography from '../../assets/InterestItems/camera.png';
import History from '../../assets/InterestItems/history.png';
import Singing from '../../assets/InterestItems/singer.png';
import Movies from '../../assets/InterestItems/cinema.png';
import Nature from '../../assets/InterestItems/plant.png';
import Makeup from '../../assets/InterestItems/makeup.png';
import Animation from '../../assets/InterestItems/people.png';
import Art from '../../assets/InterestItems/artist.png';
import Humor from '../../assets/InterestItems/funny.png';
import Science from '../../assets/InterestItems/scientist.png';
import SciFi from '../../assets/InterestItems/alien.png';
import Coding from '../../assets/InterestItems/programmer.png';
import News from '../../assets/InterestItems/live-streaming.png';
import Culture from '../../assets/InterestItems/poem.png';
import Item from 'antd/lib/list/Item';

class Interest extends React.Component {
    state = {
        name:this.props.name,
        choises:[],
        gotoLocation:false,
        Item1:false,
        Item2:false,
        Item3:false,
        Item4:false,
        Item5:false,
        Item6:false,
        Item7:false,
        Item8:false,
        Item9:false,
        Item10:false,
        Item11:false,
        Item12:false,
        Item13:false,
        Item14:false,
        Item15:false,
        Item16:false,
        Item17:false,
        Item18:false,
        Item19:false,
        Item20:false,
        Item21:false
        //Item:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    };
    
    render() {
        if (this.state.gotoLocation) {
            console.log(this.state.name)
            return <Location name={this.state.name} />
        }
        return (
            <div className="Interest">
                <h1 className="ui header">We know you like music! :) besides that, let's get to know you more:</h1>
                <div className="Interest_item-container">
                    <div className="Interest_item" onClick={this.onItem1Click}>
                        <img className="Interest_item-img" src={Cars} alt="" />
                        <label className="ui label" style={(this.state.Item1===true)?SelectedStyle:{}}>#Cars</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem2Click}>
                        <img className="Interest_item-img" src={Fashion} alt="" />
                        <label className="ui label" style={(this.state.Item2===true)?SelectedStyle:{}}>#Fashion</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem3Click}>
                        <img className="Interest_item-img" src={Books} alt=""/>
                        <label className="ui label" style={(this.state.Item3===true)?SelectedStyle:{}}>#Books</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem4Click}>
                        <img className="Interest_item-img" src={Travel} alt="" />
                        <label className="ui label" style={(this.state.Item4===true)?SelectedStyle:{}}>#Travel</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem5Click}>
                        <img className="Interest_item-img" src={Sports} alt=""/>
                        <label className="ui label" style={(this.state.Item5===true)?SelectedStyle:{}}>#Sports</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem6Click}>
                        <img className="Interest_item-img" src={Gaming} alt="" />
                        <label className="ui label" style={(this.state.Item6===true)?SelectedStyle:{}}>#Gaming</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem7Click}>
                        <img className="Interest_item-img" src={Cooking} alt=""/>
                        <label className="ui label" style={(this.state.Item7===true)?SelectedStyle:{}}>#Cooking</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem8Click}>
                        <img className="Interest_item-img" src={Photography} alt=""/>
                        <label className="ui label" style={(this.state.Item8===true)?SelectedStyle:{}}>#Photography</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem9Click}>
                        <img className="Interest_item-img" src={History} alt=""/>
                        <label className="ui label" style={(this.state.Item9===true)?SelectedStyle:{}}>#History</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem10Click}>
                        <img className="Interest_item-img" src={Singing} alt=""/>
                        <label className="ui label" style={(this.state.Item10===true)?SelectedStyle:{}}>#Singing</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem11Click}>
                        <img className="Interest_item-img" src={Movies} alt=""/>
                        <label className="ui label" style={(this.state.Item11===true)?SelectedStyle:{}}>#Movies</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem12Click}>
                        <img className="Interest_item-img" src={Nature} alt=""/>
                        <label className="ui label" style={(this.state.Item12===true)?SelectedStyle:{}}>#Nature</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem13Click}>
                        <img className="Interest_item-img" src={Makeup} alt=""/>
                        <label className="ui label" style={(this.state.Item13===true)?SelectedStyle:{}}>#Makeup</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem14Click}>
                        <img className="Interest_item-img" src={Animation} alt=""/>
                        <label className="ui label" style={(this.state.Item14===true)?SelectedStyle:{}}>#Animation</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem15Click}>
                        <img className="Interest_item-img" src={Art} alt=""/>
                        <label className="ui label" style={(this.state.Item15===true)?SelectedStyle:{}}>#Art</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem16Click}>
                        <img className="Interest_item-img" src={Humor} alt=""/>
                        <label className="ui label" style={(this.state.Item16===true)?SelectedStyle:{}}>#Humor</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem17Click}>
                        <img className="Interest_item-img" src={Science} alt=""/>
                        <label className="ui label" style={(this.state.Item17===true)?SelectedStyle:{}}>#Science</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem18Click}>
                        <img className="Interest_item-img" src={SciFi} alt=""/>
                        <label className="ui label" style={(this.state.Item18===true)?SelectedStyle:{}}>#Sci-fi</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem19Click}>
                        <img className="Interest_item-img" src={Coding} alt=""/>
                        <label className="ui label" style={(this.state.Item19===true)?SelectedStyle:{}}>#Coding</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem20Click}>
                        <img className="Interest_item-img" src={News} alt=""/>
                        <label className="ui label" style={(this.state.Item20===true)?SelectedStyle:{}}>#News</label>
                    </div>
                    <div className="Interest_item" onClick={this.onItem21Click}>
                        <img className="Interest_item-img" src={Culture} alt=""/>
                        <label className="ui label" style={(this.state.Item21===true)?SelectedStyle:{}}>#Culture</label>
                    </div>
                </div>
                <button className="ui right labeled icon button" type="submit" onClick={this.onNextClick}><i className="right arrow icon"></i>Next</button>
            </div>
        );
    };

    onNextClick = () => {
        var interests=""
        var i=0
        for (i in this.state.choises){
            interests = interests.concat("#",this.state.choises[i]," ")
        }
        const objInt={interests}
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        const JsonToBackInerest = JSON.stringify(objInt);
        axios.put('http://tunepal.pythonanywhere.com/account/sign_up/',JsonToBackInerest, config)
        .then((response)=>{
            console.log(response)
            this.setState(() => {
                return {
                    gotoLocation: true
                }
            });
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(a)
    }
    
    onItem1Click = (e) => {
        this.setState(() => {
            return {
                Item1:!this.state.Item1,
            };
        })
        if(!this.state.Item1){
            this.state.choises.push("Cars")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Cars") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem2Click = (e) => {
        this.setState(() => {
            return {
                Item2:!this.state.Item2,
            };
        })
        if(!this.state.Item2){
            this.state.choises.push("Fashion")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Fashion") { 
                    this.state.choises.splice(i, 1);
                }
            }
        }
    }
    onItem3Click = (e) => {
        this.setState(() => {
            return {
                Item3:!this.state.Item3,
            };
        })
        if(!this.state.Item3){
            this.state.choises.push("Books")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Books") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem4Click = (e) => {
        this.setState(() => {
            return {
                Item4:!this.state.Item4,
            };
        })
        if(!this.state.Item4){
            this.state.choises.push("Travel")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Travel") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem5Click = (e) => {
        this.setState(() => {
            return {
                Item5:!this.state.Item5,
            };
        })
        if(!this.state.Item5){
            this.state.choises.push("Sports")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Sports") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem6Click = (e) => {
        this.setState(() => {
            return {
                Item6:!this.state.Item6,
            };
        })
        if(!this.state.Item6){
            this.state.choises.push("Gaming")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Gaming") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem7Click = (e) => {
        this.setState(() => {
            return {
                Item7:!this.state.Item7,
            };
        })
        if(!this.state.Item7){
            this.state.choises.push("Cooking")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Cooking") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem8Click = (e) => {
        const newValue=e.target.value
        this.setState(() => {
            return {
                Item8:!this.state.Item8,
            };
        })
        if(!this.state.Item8){
            this.state.choises.push("Photography")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Photography") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem9Click = (e) => {
        this.setState(() => {
            return {
                Item9:!this.state.Item9,
            };
        })
        if(!this.state.Item9){
            this.state.choises.push("History")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "History") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem10Click = (e) => {
        this.setState(() => {
            return {
                Item10:!this.state.Item10,
            };
        })
        if(!this.state.Item10){
            this.state.choises.push("Singing")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Singing") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem11Click = (e) => {
        this.setState(() => {
            return {
                Item11:!this.state.Item11,
            };
        })
        if(!this.state.Item11){
            this.state.choises.push("Movies")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Movies") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem12Click = (e) => {
        this.setState(() => {
            return {
                Item12:!this.state.Item12,
            };
        })
        if(!this.state.Item12){
            this.state.choises.push("Nature")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Nature") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem13Click = (e) => {
        this.setState(() => {
            return {
                Item13:!this.state.Item13,
            };
        })
        if(!this.state.Item13){
            this.state.choises.push("Makeup")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Makceup") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem14Click = (e) => {
        this.setState(() => {
            return {
                Item14:!this.state.Item14,
            };
        })
        if(!this.state.Item14){
            this.state.choises.push("Animation")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Animation") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem15Click = (e) => {
        this.setState(() => {
            return {
                Item15:!this.state.Item15,
            };
        })
        if(!this.state.Item15){
            this.state.choises.push("Art")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Art") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem16Click = (e) => {
        this.setState(() => {
            return {
                Item16:!this.state.Item16,
            };
        })
        if(!this.state.Item16){
            this.state.choises.push("Humor")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Humor") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem17Click = (e) => {
        this.setState(() => {
            return {
                Item17:!this.state.Item17,
            };
        })
        if(!this.state.Item17){
            this.state.choises.push("Science")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Science") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem18Click = (e) => {
        this.setState(() => {
            return {
                Item18:!this.state.Item18,

            };
        })
        if(!this.state.Item18){
            this.state.choises.push("Sci-fi")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Sci-fi") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem19Click = (e) => {
        this.setState(() => {
            return {
                Item19:!this.state.Item19,
            };
        })
        if(!this.state.Item19){
            this.state.choises.push("Coding")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Coding") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem20Click = (e) => {
        this.setState(() => {
            return {
                Item20:!this.state.Item20,
            };
        })
        if(!this.state.Item20){
            this.state.choises.push("News")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "News") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }
    onItem21Click = (e) => {
        this.setState(() => {
            return {
                Item21:!this.state.Item21,
            };
        })
        if(!this.state.Item21){
            this.state.choises.push("Culture")
        }
        else{
            for( var i = 0; i < this.state.choises.length; i++){ 
                if ( this.state.choises[i] === "Culture") { 
                    this.state.choises.splice(i, 1); 
                }
            }
        }
    }

}

const SelectedStyle={
    backgroundColor: "#f79071",
    color: "white"
}
export default Interest;