import {useState, useContext} from "react";
import {ProfilesContext} from "../../../providers/ProfilesProvider";
import {Link} from "react-router-dom";
import "./PictureCard.css";

export const PictureCard = ({profile}) => {

    const [currentProfile, setCurrentProfile] = useState(profile); // Set current profile
    const [backgroundPicture, setBackgroundPicture] = useState(
        // {backgroundImage: 'url(../../data/images/${profile.name}.png)'});
        {backgroundImage: 'url(${profile.image})'});
    const {cleanProfile} = useContext(ProfilesContext);
    const links = currentProfile.links || {};

    console.log('PictureCard - currentProfile:', currentProfile);
    return (
        <div className="frame-22">
            <div className="group-3" style={backgroundPicture}
             onClick={() => cleanProfile()} alt={currentProfile.name} title="Change Profile">
                <img className="profile-image" onClick={() => cleanProfile()} alt={currentProfile.name} src={profile.picture_url} />
            </div>
            <div className="frame-23">
                <div className="frame-24">
                    <div className="text-wrapper-14">{currentProfile.name}</div>
                    <div className="frame-25">
                        {links.linkedin ?
                            <Link to={links.linkedin} target="_blank" rel="noopener noreferrer">
                                <img className="ellipse-4" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-6-1@2x.png" />
                            </Link>
                             : null
                             }

                        {links.twitter ?
                            <Link to={links.twitter} target="_blank" rel="noopener noreferrer">
                                <img className="ellipse-5" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-7@2x.png" />
                            </Link>
                            : null
                            }
                        {links.facebook ?
                            <Link to={links.facebook} target="_blank" rel="noopener noreferrer">
                                <img className="ellipse-7" alt="Ellipse" src="https://iconape.com/wp-content/files/wg/353362/png/facebook-icon-circle-logo.png" />
                            </Link>
                            : null
                            }
                    </div>
                </div>
                <img className="line" alt="Line" src="https://c.animaapp.com/zzQb4IEW/img/line-1.svg" />
                <div className="frame-24">
                    <div className="frame-26">
                        <div className="text-wrapper-15">Company Name</div>
                        <div className="text-wrapper-16">{currentProfile.company}</div>
                    </div>
                <div className="frame-27">
                    <div className="text-wrapper-15">Position</div>
                    <div className="text-wrapper-17">{currentProfile.position}</div>
                </div>
            </div>
            </div>
        </div>
    )
}