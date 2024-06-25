import { FluentIosArrow24Filled2 } from "../../icons/FluentIosArrow24Filled2";
import { FluentIosArrow24Filled5 } from "../../icons/FluentIosArrow24Filled5";
import { IcRoundInfo3 } from "../../icons/IcRoundInfo3";
import { MdiIdea5 } from "../../icons/MdiIdea5";
import { Frame } from "../Frame";
import { FrameWrapper } from "../FrameWrapper";
import { Rectangle } from "../../components/Rectangle";
import SpiderChart from "../SpiderChart/SpiderChart";
import icons_routes from "../../data/icons_routes.json";
import icon from "../../data/strength_icons/rectangle-26-1@2x.png";
import './right-column-styles.css';

export const RightColumn = ({ profile }) => {
    return (

        <div className="right-column">
            <div className="frame-38">
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
                <div className="frame-39">
                    <div className="frame-36">
                        <div className="text-wrapper-21">Engagement Level</div>
                        <IcRoundInfo3 className="ic-round-info" color="#9F9F9F" />
                    </div>
                    <div className="group-wrapper">
                        <div className="group-4">
                            <div className="overlap-group-2">
                                <div className="text-wrapper-24">82%</div>
                                <img className="ellipse-6" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-5-2.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="frame-40">
                <div className="frame-29">
                    <div className="text-wrapper-18">Top personality</div>
                </div>
                {console.log('HomeOverview - profile.strengths:', profile.strengths) }
                <SpiderChart data={ profile.strengths.map((strength, index) => ({
                                             name: strength.strength,
                                             image: icons_routes[strength.strength],
                                             score: strength.score
                                           }))} />
            </div>
            <div className="frame-22-wrapper">
                <Frame className="frame-instance" profile={profile} />
            </div>
        </div>
    )
};