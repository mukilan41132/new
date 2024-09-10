import React, { useEffect, useState } from 'react';
import "../Style/Mymoves.css"
import { FaArrowRight, FaTruck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faHome, faTruckFront, faTruckPickup, faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import { FaBoxes } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import moment from 'moment';
import { FaPencilAlt } from "react-icons/fa";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import truckImage from './../images/free_shipping_truck_image.svg';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons/faTruckLoading';

const Mymoves = () => {

  const [fetchData, setFetchData] = useState<any>(null);
  let totalQuantity = 0;

  const handleCheckChange = (event) =>{
    if(fetchData !== null){
      const newValue = event.target.checked ? event.target.value : null; // Convert checked state to "1" or "0"
      setFetchData({ ...fetchData, move_date_flexible: newValue });
    }
  }
  useEffect(() => {
    const fetchLedgerData = async () => {
      
        fetch('/api_assignment.json')
        .then(response => response.json())
        .then(data =>{
          setFetchData(data);
          console.log(JSON.stringify(
            data.items.rooms.map((k)=>{
              return (k.hasCategory === true ?           
                Object.keys(k.categories).map((category) => {
                  if(category !== null){
                    if (k.categories[category]) {
                      // Iterate through itemsList of the category
                     return k.categories[category].itemsList
                    }
                  }                 
               }):0)
            })
          ))
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchLedgerData();


  }, []);
  return (
    
    <div className='home'>
      {fetchData !== null &&
      <div className='maincontainer'>
        <h6 className='titleText'>My Moves</h6>
        
        <div className='container_div'>
          <div className='sub_container'>
            <span className='bold'>From</span>
            <span className='opacity' >{fetchData.moving_from}</span>
          </div>
          <div className='sub_containercircle'>
            <FaArrowRight />
          </div >
          <div className='sub_container'>
            <span className='bold' >To</span>
            <span className='opacity'>{fetchData.moving_to}</span>
          </div>
          <div className='sub_container'>
            <span className='bold' >Request#</span>
            <span className='color'>{fetchData.estimate_id}</span>
          </div>
        </div>
        <div className='container_div'>
          <div className='sub_container2'>
            <span className='colors'><FontAwesomeIcon icon={faHome} className='imageInside' /></span>
            <span className='fontSize'>{fetchData.property_size}</span>
          </div>
          <div className='sub_container2'>
            <span className='colors'><FontAwesomeIcon icon={faBoxes} className='imageInside' /></span>
            <span>{fetchData.boxes_count}</span>
          </div>
          <div className='sub_container2'>
            <span className='colors'><GiPathDistance className='imageInside'/></span>
            <span className='fontSize'>{fetchData.distance}</span>
          </div>
          <div className='sub_container2'>
            <span className='colors'><FontAwesomeIcon icon={faTruckFront} className='imageInside' /></span>            
            <span className='sub_container2'>
              <span className='fontSize'>{moment(fetchData.moving_on, 'YYYY-MM-DD HH:mm:ss').format('MMM DD,YYYY [at] hh:mm a')}</span>
              <FaPencilAlt className='altColors' />
            </span>
          </div>
          <div className='sub_container2'>
            <input className='colors' type='checkbox' id='move_date_flexible' name="move_date_flexible" checked={fetchData.move_date_flexible === "1"} value={fetchData.move_date_flexible} onChange={handleCheckChange}></input>
            <label id='fontSizes' className='checkbox1' htmlFor="checkbox">is flexible</label>
          </div>
          <div className='sub_container22'>
            <button className='button1 textDefaultSize'> View More details</button>
            <button className='button2 textDefaultSize'> Quotes Awaiting</button>
          </div>

        </div>
        <div className='container_divlast'>
          <BsFillExclamationTriangleFill className='colors' />
          <p className='opacity checkbox1'><b>Disclaimer: </b>please update your move date before two days of shifting</p>
        </div>

        
        <div className='container_divlast'>
          <span className='titleText'>Inventory Details</span>
          <div className='sub_container22'>
            <button className='button3 textDefaultSize'> Edit Inventory</button>
          </div>
        </div>
        {fetchData.items !== null && fetchData.items !== "" ?
        (fetchData.items.rooms !== null && fetchData.items.rooms !== undefined && fetchData.items.rooms.length>0 ? 
        fetchData.items.rooms.map((k,i)=>{return (<>
        <div style={{marginTop: i!==0 ? '-14px':'0px'}}>
          <Accordion sx={{ width: "100%", backgroundColor: "#e8e8e8" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ color: "#ef5238" }}
            >
              {k.roomName} &nbsp;&nbsp;&nbsp;<span className='ovel'>{k.hasCategory === true ?           
             k.categories.forEach(category => {
              if (category.itemsList) {
                // Iterate through itemsList of the category
                Object.values(category.itemsList).forEach((items:any) => {
                  items.forEach(item => {
                    if (item.qty && !isNaN(item.qty)) {
                      totalQuantity += parseInt(item.qty, 10);
                    }
                  });
                });
              }
            }):<></>}</span>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "white" }}>
              <div className='acdive' >
                <div className='container_div'>
                  <div className='sub_container3'>
                    <span className='boldness'>Furnitures</span>
                  </div>
                  <div className='sub_container3'>
                    <span className='boldness'>Electricals</span>
                  </div>
                  <div className='sub_container3'>
                    <span className='boldness'>Fragile</span>
                  </div>
                </div>

                <div className='container_div'>
                  <div className='sub_container3'>
                    <span className='sub_container223'>
                      <span>1 Seater sofa</span>
                      <span>2</span>
                    </span>
                    <span className='bold'>Wooden</span>
                  </div>
                  <div className='sub_container3'>
                    <span className='sub_container223'>
                      <span>1 Seater sofa</span>
                      <span>2</span>
                    </span>
                    <span className='bold'>Wooden</span>
                  </div>
                  <div className='sub_container3'>
                    <span className='sub_container223'>
                      <span>1 Seater sofa</span>
                      <span>2</span>
                    </span>
                    <span className='bold'>Wooden</span>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
         
        </div>
       </>)}):<></> 
      ):<></>}
        <div className='container_divlast'>
          <span className='titleText'>House Details</span>
          <div className='sub_container22'>
            <button className='button3 textDefaultSize'> Edit House details</button>
          </div>

        </div>
        <div className='maincontainer'>
          <div className='boldcolor'>Existing House Details</div>
          <div className='container_div'>
            <div className='sub_container'>
              <span className='bold'>Flat No.</span>
              <span>0</span>
            </div>
            <div className='sub_container'>
              <span className='bold'>Elevator Available</span>
              <span>No</span>
            </div>
            <div className='sub_container'>
              <span className='bold'>Packing Required</span>
              <span>Yes</span>
            </div>
            <div className='sub_container'>
              <span className='bold'>Distance from truck to door</span>
              <span>1 meter</span>
            </div>
          </div>
          <div className='sub_container'>
            <span className='bold'> Additional Information</span>
            <span>No Additional Information</span>
          </div>
        </div>
        <div className='maincontainer'>
          <div className='boldcolor'>Existing House Details</div>
          <div className='container_div'>
            <div className='sub_container'>
              <span className='bold'>Flat No.</span>
              <span>0</span>
            </div>
            <div className='sub_container'>
              <span className='bold'>Elevator Available</span>
              <span>No</span>
            </div>
            <div className='sub_container'>
              <span className='bold'>Packing Required</span>
              <span>Yes</span>
            </div>
            <div className='sub_container'>
              <span className='bold'>Distance from truck to door</span>
              <span>1 meter</span>
            </div>
          </div>
          <div className='sub_container'>
            <span className='bold'> Additional Information</span>
            <span>No Additional Information</span>
          </div>
        </div>
      </div>
}
    </div>
  );
}

export default Mymoves;
