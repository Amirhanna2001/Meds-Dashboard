import React from 'react';
import "../../css/MedsDetails.css";

const MedsDetails = () => {
    return (
        <div className='meds=details-container p-5'>
            <div className='row'>
                {/*Details Meds */}
                <div className='col-3'>
                <img  className='meds-image' alt="" 
                src="https://www.drugs.com/images/pills/custom/pill24249-1/os-cal-extra-d3.png" />
                </div>
                
                <div className='col-9'>
                    <h3>Meds Title</h3>
                    <p>
                        What is Os-Cal Extra D3 ?<br />
                        Calcium is a mineral that is necessary for many functions of the body, 
                        especially bone formation and maintenance.<br />Vitamin D helps the body absorb calcium.<br />
                        Os-Cal Extra D3 is used to treat or prevent a calcium deficiency.<br />
                        There are many brands and forms of calcium and vitamin D combination available. 
                        Not all brands are listed on this leaflet.<br />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MedsDetails;