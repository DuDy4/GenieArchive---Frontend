import React, { useEffect, useState } from "react";
import { IcRoundInfo2 } from "../../icons/IcRoundInfo2";
import { Rectangle } from "../Rectangle";
import { FrameWrapper } from "../FrameWrapper";
import { NounCheck68938205 } from "../../icons/NounCheck68938205";
import { IcRoundInfo3 } from "../../../../../icons/IcRoundInfo3";
import icons_routes from "../../../../../data/icons_routes.json";
import SpiderChart from "../../../../SpiderChart/SpiderChart";
import ellipse from './Ellipse-5.svg';


const RightColumn = ({profile}) => {
    const [currentProfile, setCurrentProfile] = useState(profile);
    const [name, setName] = useState(profile ? profile.name : '');
    const firstName = name ? name.split(' ')[0] : '';
    console.log('RightColumn: profile:', profile)
    console.log('RightColumn: currentProfile:', currentProfile);
    console.log('RightColumn: Name:', name);
    console.log('RightColumn: First Name:', firstName);

    useEffect(() => {
        console.log('RightColumn: Profile:', profile);
        setCurrentProfile(profile);
        setName(profile ? profile.name : '')
    }, [profile]);

    return (
        <div className="right-column">
            <div className="spiderweb-and-good-to-know">
                <div className="small-column">
                    <div className="frame-39">
                        <div className="frame-36">
                            <div className="text-wrapper-21">Engagement Level</div>
                            <IcRoundInfo3 className="ic-round-info" color="#9F9F9F" />
                        </div>
                        <div className="group-wrapper">
                            <div className="group-4">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-23">65%</div>
                                    <img className="ellipse-6" alt="Ellipse" src={ellipse}/>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="frame-40">
                    <div className="frame-29">
                        <div className="text-wrapper-18">Top personality</div>
                    </div>
                    {console.log('HomeOverview - profile.strengths:', profile.strengths) }
                    {console.log('HomeOverview - profile:', profile)}
                    {Object.keys(profile).length > 0 && profile.strengths && <SpiderChart data={ profile.strengths.map((strength, index) => ({
                                                 name: strength.strength_name || strength.strengths_name,
                                                 image: icons_routes[strength.strength_name || strength.strengths_name],
                                                 score: strength.score
                                               }))} />}
                   </div>
                </div>
                <div className="small-column">
                    <div className="frame-39">
                        <div className="frame-36">
                            <div className="text-wrapper-21">Profile Certainty</div>
                            <IcRoundInfo3 className="ic-round-info" color="#9F9F9F" />
                        </div>
                        <div className="group-wrapper">
                            <div className="group-4">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-23">85%</div>
                                    <img className="ellipse-6" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-5-1.svg"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-40">
                          <FrameWrapper className="frame-instance" text="Linkedin post ”saving the whales”" />
                    </div>
                    <div className="frame-41">
                      <div className="frame-40">
                        <div className="text-wrapper-21">Engagement Level</div>
                        <IcRoundInfo2 className="icon-instance-node-2" color="#9F9F9F" />
                      </div>
                      <div className="group-wrapper">
                        <div className="group-4">
                          <div className="overlap-group-2">
                            <div className="text-wrapper-22">65%</div>
                            <img className="ellipse-7" alt="Ellipse" src="/img/ellipse-5-1.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div className="frame-230">
              <div className="frame-24">
                <div className="frame-25">
                  <div className="text-wrapper-14">Get to know {currentProfile ? firstName : 'Joe'}</div>
                  <div className="frame-260">
                    <img className="rectangle-4" alt="Rectangle" src={icons_routes['Analytical']} />
                    <img className="rectangle-4" alt="Rectangle" src={icons_routes['Context']} />
                    <img className="rectangle-4" alt="Rectangle" src={icons_routes['Futuristic']} />
                    <img className="rectangle-5" alt="Rectangle" src={icons_routes['Ideation']} />
                    <img className="rectangle-5" alt="Rectangle" src={icons_routes['Input']} />
                  </div>
                </div>
              </div>
              <p className="given-joe-s">
                Given {firstName ? firstName : 'Joe'}&#39;s personality traits as {Object.keys(currentProfile).length > 0 ?
                    currentProfile.strengths.map((strength, index) => strength.strength_name || strength.strengths_name).join(', ')
                    : "a person"} here are
                strategies to effectively engage with him:
              </p>
              <div className="frame-27">
                <div className="frame-28">
                  <div className="text-wrapper-150">Phrases to use</div>
                  <div className="frame-29">
                    <NounCheck68938205 className="icon-instance-node-2" color="#00C875" />
                    <p className="text-wrapper-16">
                      &#34;With our solution, you can take command of your projects more effectively, driving your team
                      towards even greater success.&#34;
                    </p>
                  </div>
                  <div className="frame-29">
                    <NounCheck68938205 className="icon-instance-node-2" color="#00C875" />
                    <p className="text-wrapper-16">
                      &#34;I understand that you&#39;re looking for solutions that not only help you achieve your goals
                      efficiently but also set you up for future”
                    </p>
                  </div>
                </div>
                <div className="frame-30">
                  <div className="text-wrapper-150">Best practices</div>
                  <div className="frame-29">
                    <NounCheck68938205 className="icon-instance-node-2" color="#00C875" />
                    <p className="text-wrapper-16">
                      Joe values clarity and specifics.
                      <br />
                      What to do: Provide detailed, concrete information about how your product works and its benefits.
                    </p>
                  </div>
                  <div className="frame-29">
                    <NounCheck68938205 className="icon-instance-node-2" color="#00C875" />
                    <p className="text-wrapper-16">
                      Joe is interested in long-term success and future possibilities.
                      <br />
                      What to do: Balance your pitch by discussing both immediate and future benefits, with a strong
                      emphasis on the latter.
                    </p>
                  </div>
                  <div className="frame-29">
                    <NounCheck68938205 className="icon-instance-node-2" color="#00C875" />
                    <p className="text-wrapper-16">
                      Joe respects and responds to confidence and decisiveness.
                      <br />
                      What to do: Be assertive and confident in your presentation, showing how your product is the best
                      choice for a leader like him.
                    </p>
                  </div>
                  <div className="frame-29">
                    <NounCheck68938205 className="icon-instance-node-2" color="#00C875" />
                    <p className="text-wrapper-16">
                      Joe appreciates professionalism and structure.
                      <br />
                      What to do: Ensure your presentation is well-organized, professional, and to the point.
                    </p>
                  </div>
                </div>
                <div className="frame-30">
                  <div className="text-wrapper-150">Avoid</div>
                  <div className="frame-29">
                    <img
                      className="oui-cross-in-circle"
                      alt="Oui cross in circle"
                      src="../../../static/img/oui-cross-in-circle-filled.svg"
                    />
                    <p className="text-wrapper-16">
                      Build Rapport: Start by discussing Joe&#39;s recent achievements and future plans.
                    </p>
                  </div>
                  <div className="frame-29">
                    <img
                      className="oui-cross-in-circle"
                      alt="Oui cross in circle"
                      src="../../../static/img/oui-cross-in-circle-filled-1.svg"
                    />
                    <p className="text-wrapper-16">
                      Use Visual Aids: Incorporate charts or projections that highlight future benefits and growth
                      potential.
                    </p>
                  </div>
                  <div className="frame-29">
                    <img
                      className="oui-cross-in-circle"
                      alt="Oui cross in circle"
                      src="../../../static/img/oui-cross-in-circle-filled-2.svg"
                    />
                    <p className="text-wrapper-16">
                      Follow-Up: Send materials that emphasize continuous improvement and future developments related to
                      your product.
                    </p>
                  </div>
                </div>
              </div>
            </div>

        </div>
        )
}

export default RightColumn;