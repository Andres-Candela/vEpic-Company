import React from 'react'
import '../animations/Cards.css';

export default function Card(props) {

  return (
      <div className="bg-dark h-72 w-64 flex-column cursor-pointer" id="cartas">
        <div className="bg-black h-48 rounded">
          <a href={props.url}><img src={props.imagen} alt="" className="w-full h-full"></img></a>
        </div>

        <div className="bg-black h-24 box-border p-3">
            <strong className="text-white"><a href={props.url} className="hover:text-violet-400">{props.name} ⭐</a></strong>
            <p className="text-white">{props.year}</p>
        </div>
      </div>
  )
}
