import React from 'react';
import CarouselList from './CarouselList';

/*
    Carousel Input should be
    title: "",
    items:[
        {
            title: "",  --songName | artistName
            subtitle: "",   --artistName | null
            imgURL: ""  --url
        }
    ]
*/

class Carousel extends React.Component {
    state = {
        carouselTitle: "Your Top 50 Songs",
        items: [
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
            {
                title: "Nothing Else Matters",
                subtitle: "Metallica",
                imgURL: "https://i.scdn.co/image/ab67616d00001e0299ad1a6dd3c8b95ca4778d34"
            },
        ]
    }

    render() {
        return (
            <CarouselList items={this.state.items} />
        );
      }
}

export default Carousel;