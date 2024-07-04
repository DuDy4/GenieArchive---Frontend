import {useState, useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import RandomProfilePicture from "../../../../../RandomProfilePictureGenerator/RandomProfilePictureGenerator";
import "./PictureCard.css";

export const PictureCard = ({profile}) => {
    const navigate = useNavigate();
    const [currentProfile, setCurrentProfile] = useState(profile); // Set current profile
    const [backgroundPicture, setBackgroundPicture] = useState(
        {backgroundImage: 'url(${profile.image})'});

    const links = currentProfile ? currentProfile.links : {};

    const navigateToProfiles = () => {
        console.log('Navigating to profiles');
        cleanProfile();
        navigate('/profiles');
    };

    useEffect(() => {
        setCurrentProfile(profile);
        }, [profile]);


    console.log('PictureCard - currentProfile:', currentProfile);
    console.log('PictureCard - profile:', profile);
    return (
        <div className="frame-22">
            <div className="group-3" style={backgroundPicture}
             alt={currentProfile ? currentProfile.name : profile.name} title="Change Profile">
                <RandomProfilePicture style="profile-image" profileImage={profile ? profile.picture_url : null} onClick={() => cleanProfile()} alt={currentProfile.name} />
            </div>
            <div className="frame-23">
                <div className="frame-24">
                    <div className="text-wrapper-14">{currentProfile.name}</div>
                    <div className="frame-25">
                        {links && links.linkedin ?
                            <Link to={links.linkedin} target="_blank" rel="noopener noreferrer">
                                <img className="ellipse-4" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-6-1@2x.png" />
                            </Link>
                             : null
                             }

                        {links && links.twitter ?
                            <Link to={links.twitter} target="_blank" rel="noopener noreferrer">
                                <img className="ellipse-5" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-7@2x.png" />
                            </Link>
                            : null
                            }
                        {links && links.facebook ?
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
{/*                     <img className="line vertical" alt="Line" src="../../../static/img/line-2.svg" /> */}
                    <div className="frame-27">
                        <div className="text-wrapper-15">Position</div>
                        <div className="text-wrapper-17">{currentProfile.position}</div>
                    </div>
                </div>
            </div>
            <img className="line" alt="Line" src="https://c.animaapp.com/zzQb4IEW/img/line-1.svg" />
            <div className="frame-23">
                <div className="text-wrapper-15">Data Source</div>
                <div className="frame-29">
                    <img className="image" alt="Zoom" title="Zoom" src="https://img.icons8.com/color/48/zoom.png" />
                    <img className="image-2" alt="Google" title="Google" src="https://img.icons8.com/color/48/google-logo.png" />
                    <img className="image-3" alt="Salesforce" title="Salesforce" src="https://img.icons8.com/color/48/salesforce.png" />
{/*                     <img className="image-4" alt="Image" src="https://c.animaapp.com/zzQb4IEW/img/image-12.png" /> */}
                    <img className="image-5" alt="Github" title="Github" src="https://img.icons8.com/fluency/48/github.png" />
                </div>
            </div>
        </div>
    )
}