import { useState } from 'react'
import './CardPage.css'



export function CardPage(){

    const [persons, setPersons] = useState([
      {
        Name: "User 1",
        Description: "A Software Developer at Microsoft",
        Interests: ["Gaming", "Chaess", "Watching Cricket"],
        Social: {
          Linkedin: "https://www.linkedin.com/feed/",
          Twitter: "https://twitter.com/home",
        }
      },
      {
        Name: "User 2",
        Description: "A Software Developer at Google",
        Interests: ["Gaming", "Chaess", "Watching Cricket"],
        Social: {
          Linkedin: "https://www.linkedin.com/feed/",
          Twitter: "https://twitter.com/home",
        }
      },
      {
        Name: "User 3",
        Description: "A Software Developer at MMT",
        Interests: ["Gaming", "Chaess", "Watching Cricket"],
        Social: {
          Linkedin: "https://www.linkedin.com/feed/",
          Twitter: "https://twitter.com/home",
        }
      },
      {
        Name: "User 4",
        Description: "A Software Developer at Meta",
        Interests: ["Gaming", "Chaess", "Watching Cricket"],
        Social: {
          Linkedin: "https://www.linkedin.com/feed/",
          Twitter: "https://twitter.com/home",
        }
      },

      ])
  
  
    return (
      
      <div id='main'>
      {persons.map((person)=>{ return <Card person = {person}></Card>})}
      
      </div>
    )
  
  }
  
  function Card({person}){
        
    return <div id='card'>
  
          <h1 id='name'>{person.Name}</h1>
          <div id='description'>{person.Description}</div>
          <h3 id='interestHeading'>Interests</h3>
          <div id='interestMain'>
              {person.Interests.map((Interest)=>{ return <div class = 'interest'>{Interest}</div>})}
          </div>
          <div id='socialMain'>
            { Object.keys(person.Social).map((socio)=>{return <div class = 'socialButton'><a href={person.Social[socio]} target='_blank'>{socio}</a></div>})}
          </div>
    </div>
  }
  