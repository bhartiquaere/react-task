import React from 'react';
import { Link } from 'react-router-dom';
import { LiaDashcube } from "react-icons/lia";
const Sidenav = ({ data, ...props }) => {
    return (
        <div className='sidebar'>
                <div className="sidebar-menu" >
                    <ul className="sidebar-vertical mt-5">
                        {data.map((item, index) => (
                            <li key={index}>
                                <Link to={item.link}
                                ><LiaDashcube  size={30} />{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
          
        </div>
    );
}

export default Sidenav;
