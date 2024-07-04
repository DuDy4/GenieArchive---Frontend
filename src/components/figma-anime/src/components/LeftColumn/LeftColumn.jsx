import { PictureCard } from './PictureCard/PictureCard';
import React, { useState, useEffect } from 'react';


const LeftColumn = ({profile}) => {

    const [currentProfile, setCurrentProfile] = useState({profile});
    const name = currentProfile ? currentProfile.name : '';
    const firstName = name ? name.split(' ')[0] : '';
    console.log('LeftColumn: Name:', name);
    console.log('LeftColumn: First Name:', firstName);

    useEffect(() => {
        console.log('LeftColumn: Profile:', profile);
        setCurrentProfile(profile);
    }, [profile]);


    return (
        <div className="left-column">
            <PictureCard profile={profile} />
            <div className="frame-43">
              {currentProfile && <div className="text-wrapper-14">{firstName}’s Playbook</div>}
              <div className="overlap-wrapper">
                <div className="overlap">
                  <img className="line-3" alt="Line" src="/img/line-10.svg" />
                  <img className="line-4" alt="Line" src="/img/line-12.svg" />
                  <img className="line-5" alt="Line" src="/img/line-11.svg" />
                  <div className="frame-44">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-8" />
                        <img className="line-6" alt="Line" src="/img/line-11-3.svg" />
                      </div>
                    </div>
                    <div className="text-wrapper-28">Mail intro - 06/14/24</div>
                  </div>
                  <div className="frame-45">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-8" />
                        <img className="line-6" alt="Line" src="/img/line-11-3.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">Invite Joe to the next Hackathon and use your software-08/17/24</p>
                  </div>
                  <div className="frame-46">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-8" />
                        <img className="line-6" alt="Line" src="/img/line-11-3.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">
                      Invite Joe to interact with fellow de
                      <br />
                       @the company community -08/22/24
                    </p>
                  </div>
                  <div className="frame-47">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-9" />
                        <img className="line-6" alt="Line" src="/img/line-11-4.svg" />
                      </div>
                    </div>
                    <div className="text-wrapper-29">First meeting -08/22/24</div>
                  </div>
                  <div className="frame-48">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">Joe approve the invitation - 08/22/24</p>
                  </div>
                  <div className="frame-49">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">Connect on LinkedIn - 08/23/24</p>
                  </div>
                  <div className="frame-50">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <div className="text-wrapper-28">Meeting follow up  -08/25/24</div>
                  </div>
                  <div className="frame-51">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">Set up a free demo account - 08/27/24</p>
                  </div>
                  <div className="frame-52">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">
                      Give Joe the Data and let him build the use case and convince his manager - 08/27/24
                    </p>
                  </div>
                  <div className="frame-53">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">Send an update on hackathon participation - 08/30/24</p>
                  </div>
                  <div className="frame-54">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-28">Define a limited POC to Joe group 08/30/24</p>
                  </div>
                  <div className="frame-55">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-30">Present POC metrics - 08/30/24</p>
                  </div>
                  <div className="frame-56">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <p className="text-wrapper-30">
                      Ask for a meeting with Jim the CRO to present metrics and talk about enterprise deal-08/31/24
                    </p>
                  </div>
                  <div className="frame-57">
                    <div className="group-6">
                      <div className="overlap-group-4">
                        <div className="ellipse-10" />
                        <img className="line-6" alt="Line" src="/img/line-11-14.svg" />
                      </div>
                    </div>
                    <div className="text-wrapper-30">Close the deal- 09/01/24</div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        )


    }

export default LeftColumn;